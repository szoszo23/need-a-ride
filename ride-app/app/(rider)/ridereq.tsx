import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { db } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useAuth } from '@/hooks/useAuth';

async function createRideRequest(email: string, fromAddress: string, toAddress: string) {
  try {
    const docRef = await addDoc(collection(db, 'rideRequests'), {
      email,
      fromAddress,
      toAddress,
      createdAt: new Date()
    });
    console.log('Új menetkérés ID:', docRef.id);
    Alert.alert('Sikeres mentés', 'A fuvarkérelem el lett küldve.');
  } catch (e) {
    console.error('Hiba a mentés során:', e);
    Alert.alert('Hiba', 'Nem sikerült elküldeni a menetkérést.');
  }
}

export default function Rides() {
  const { user } = useAuth();
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fuvar igénylés</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Honnan indulnál?"
        value={fromAddress}
        onChangeText={setFromAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Hová mennél?"
        value={toAddress}
        onChangeText={setToAddress}
      />

      <Button
        title="Küldés"
        onPress={() => {
          if (user && fromAddress && toAddress) {
            createRideRequest(user.email ?? '', fromAddress, toAddress);
            setFromAddress('');
            setToAddress('');
          } else {
            Alert.alert('Hiányzó adat', 'Tölts ki minden mezőt!');
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
  },
});
