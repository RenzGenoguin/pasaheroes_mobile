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
import { getPasaheroData } from './server/api/pasahero';



export default App = ()=> {
  const [activeUsername, setActiveUsername] = useState(null)
  const [userData, setUserData] = useState(null)

  const _isLoggedIn = async() => {
  const data =  await AsyncStorage.getItem('activeUsername')
  return data
  }

  const _getPasaheroData = async(username) => {
    if(username){
      const pasahero = await getPasaheroData({username})
      setUserData(pasahero)
    }
  }

  useEffect(()=>{
    _isLoggedIn()
    .then(async(username)=>{
    console.log(username, "usernameee")
      setActiveUsername(username)
      _getPasaheroData(username)
    })
  },[activeUsername])

  useEffect(()=>{
    console.log(userData, "userData")
  },[userData])

const value = {
  userData, 
  setUserData, 
  activeUsername, 
  setActiveUsername
}
  return (
    <AlertNotificationRoot>
      <AuthContext.Provider value={{...value}}>
        <NavigationContainer>
          {activeUsername? 
          <PrivatePages/>:
          <PublicPages/>}
          <StatusBar style='auto' />
        </NavigationContainer>
      </AuthContext.Provider>
    </AlertNotificationRoot>
  );

}
