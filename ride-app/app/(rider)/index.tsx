import { Text, View, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import { auth } from '@/firebase';
import { useAuth } from '@/hooks/useAuth';

export default function Index() {
  const router = useRouter();
   const { user } = useAuth();

return (
    <View style={styles.container}>
      <Text>Utas oldal</Text>
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
