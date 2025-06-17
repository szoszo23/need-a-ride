import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('passenger');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: role
      });

      alert('Sikeres regisztráció!');
      router.push('/(rider)/profile');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Regisztráció</Text>
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
      <Button title="Regisztráció" onPress={handleLogin} />
      <Text
        onPress={() => router.push('/login')}
        style={{ marginTop: 10, color: 'blue' }}
      >
        Van már fiókod? Jelentkezz be!
      </Text>
    </View>
  );
}
