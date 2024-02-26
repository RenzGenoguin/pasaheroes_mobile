// import { StatusBar } from 'expo-status-bar';
import { Text, View, StatusBar } from 'react-native';
import LoginPage from './pages/LoginPage';
import { LinearGradient } from 'expo-linear-gradient';
import SignUpForm from './pages/SignUpForm';

export default function App() {
  return (
    <View className="flex-1 flex justify-center items-center bg-white">
      {/* <LoginPage/> */}

      <SignUpForm/>
      <StatusBar style='auto' />
    </View>
  );
}
