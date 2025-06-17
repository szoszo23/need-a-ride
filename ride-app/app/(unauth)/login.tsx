import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

const handleLogin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Role lekérés
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const role = docSnap.data().role;
      if (role === 'driver') router.replace('/(driver)');
      else if (role === 'passenger') router.replace('/(rider)');
      else router.replace('/');
    } else {
      alert('Nincs jogosultság információ!');
      router.replace('/');
    }
  } catch (error: any) {
    alert(error.message);
  }
};

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Bejelentkezés</Text>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Jelszó"
        secureTextEntry
        onChangeText={setPassword}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Bejelentkezés" onPress={handleLogin} />
      <Text
        onPress={() => router.push('/register')}
        style={{ marginTop: 10, color: 'blue' }}
      >
        Nincs fiókod? Regisztrálj!
      </Text>
    </View>
  );
}
