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
import { getDriverData } from './server/api/driver';
import { AppContext } from './context/AppContext';



export default App = ()=> {
  const [activeUsername, setActiveUsername] = useState(null)
  const [userData, setUserData] = useState(null)
  const [selectedDriverId, setSelectedDriverId] = useState(null)
  const [driver, setDriver] = useState(null)
  const [driverLoading, setDriverLoading] = useState(false)

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

  const _getDriverData = async(id) => {
      setDriverLoading(true)
      const driver = await getDriverData({id}).then((data)=>{
        setDriverLoading(false)
        return data
      })
      console.log(driver, "appDriver")
      setDriver(driver)
  }

  useEffect(()=> {
    if(selectedDriverId){
      _getDriverData(selectedDriverId)
    }
  },[selectedDriverId])

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
  setActiveUsername,
}
const appValue = {
  selectedDriverId, 
  setSelectedDriverId,
  driver, 
  setDriver
}
  return (
    <AlertNotificationRoot>
      <AuthContext.Provider value={{...value}}>
        <AppContext.Provider value={{...appValue}}>
          <NavigationContainer>
              {activeUsername? 
              <PrivatePages/>:
              <PublicPages/>}
              <StatusBar style='auto' />
          </NavigationContainer>
        </AppContext.Provider>
      </AuthContext.Provider>
    </AlertNotificationRoot>
  );

}
