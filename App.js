import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import PublicPages from './navigations/PublicPages';
import PrivatePages from './navigations/PrivatePages';
import { Text, View} from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './context/AuthContext';
import {  AlertNotificationRoot } from 'react-native-alert-notification';



export default App = ()=> {
  const [username, setUsername] = useState(null)

  const _isLoggedIn = async() => {
  const data =  await AsyncStorage.getItem('username')
  return data
  }

  useEffect(()=>{
    _isLoggedIn().then(data=>setUsername(data))
  },[])

  return (
    <AlertNotificationRoot>
      <AuthContext.Provider value={{ username, setUsername }}>
        <NavigationContainer>
          {username? 
          <PrivatePages/>:
          <PublicPages/>}
          <StatusBar style='auto' />
        </NavigationContainer>
      </AuthContext.Provider>
    </AlertNotificationRoot>
  );

}
