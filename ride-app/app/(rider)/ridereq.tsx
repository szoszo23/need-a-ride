import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';
export default function RideRequest() {
return (
    <View style={styles.container}>
      <Text style={styles.title}>Kérj egy fuvart</Text>
      <Button title="Fuvarkérés indítása" onPress={() => alert('Fuvar kérve!')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});