import { Text, View, StyleSheet } from 'react-native';
import LoginScreen from './login';

export default function Index() {
  return (
    <LoginScreen></LoginScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
});
