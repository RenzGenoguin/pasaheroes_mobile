import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import LoginPage from './pages/LoginPage';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <View className="flex-1 flex justify-center items-center">
    <LinearGradient
    className="flex-1 flex justify-center items-center w-full"
      colors={[ '#00E5FF','#4285F4']}>
        <LoginPage/>
    </LinearGradient>
    </View>
  );
}
