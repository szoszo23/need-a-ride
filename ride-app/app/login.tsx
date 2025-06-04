import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const [role, setRole] = useState('driver');
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      if (mode === 'login') {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;

          alert('Sikeres belépés!')

          router.push('./profile');
          
        } catch (error) {
          alert(error);
        }

      } else {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;

          await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            role: role
          });

          alert('Sikeres regisztráció!');
        } catch (error) {
          alert(error);
        }

      }

    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>{mode === 'login' ? 'Log in' : 'Registration'}</Text>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Jelszó"
        secureTextEntry
        onChangeText={setPassword}
        style={{ borderBottomWidth: 1, marginTop: 10 }}
      />
      {mode === 'signup' && (
        <View style={{ marginVertical: 10 }}>
          <Text style={{ marginBottom: 5 }}>Válassz szerepet:</Text>
          <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
            style={{ height: 20, width: '100%' }}
          >
            <Picker.Item label="Driver" value="driver" />
            <Picker.Item label="Passenger" value="passenger" />
          </Picker>
        </View>
      )}

      <Button title={mode === 'login' ? 'Login' : 'Registration'} onPress={handleSubmit} />
      <Text
        onPress={() => setMode(mode === 'login' ? 'signup' : 'login')}
        style={{ marginTop: 10, color: 'blue' }}
      >
        {mode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Log in"}
      </Text>
    </View>
  );
}
