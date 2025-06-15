import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useColorScheme } from '@/hooks/useColorScheme';
import { db } from '../firebase';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [role, setRole] = useState('');

  const { user, isLoading } = useAuth();
  const [loadingRole, setLoadingRole] = useState(true);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          console.log(docSnap.data());
          if (docSnap.exists()) {
            setRole(docSnap.data().role);
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoadingRole(false);
      }

    };
    fetchUserData();
  }, [role])


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!loaded) {
    return null;
  }







  let initialRoute = '(unauth)';
  if (user) {
    initialRoute = role === 'passenger' ? '(rider)' : '(driver)';
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack initialRouteName={initialRoute}>
        <Stack.Screen name="(rider)" options={{ headerShown: false }} />
        <Stack.Screen name="(driver)" options={{ headerShown: false }} />
        <Stack.Screen name="(unauth)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );

}