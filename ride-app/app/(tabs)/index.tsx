import { Text, View, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import { auth } from '@/firebase';

export default function Index() {
  const router = useRouter();
   const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe(); // fontos a memória szivárgás elkerülésére
  }, []);

return (
    <View style={styles.container}>
      <Text style={styles.title}>Üdvözöllek az appban!</Text>

      {user ? (
        <Button title="Profile" onPress={() => router.push('/profile')} />
      ) : (
        <>
          <Button title="Login" onPress={() => router.push('/login')} />
        </>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
});
