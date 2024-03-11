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
import { getCommentByDriver } from './server/api/comment';

export const defaultDriverData = {data:null, isLoading:false, error:false}

export default App = ()=> {
  const [activeUsername, setActiveUsername] = useState(null)
  const [userData, setUserData] = useState(null)
  const [selectedDriverId, setSelectedDriverId] = useState(null)
  const [driver, setDriver] = useState(defaultDriverData)
  const [commentByDriver, setCommentByDriver] = useState(defaultDriverData)
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
    setDriver(prev=>{
      return {
        ...prev,
        isLoading:true
      }
    })
      await getDriverData({id}).then((driver)=>{
        if(driver){
        setDriver({
          isLoading:false,
          data:driver.data,
          error:driver.error
        })
        }
      })
  }

  const _getCommentByDriver = async(driverId) => {
    setCommentByDriver(prev=>{
      return {
        ...prev,
        isLoading:true
      }
    })
    await getCommentByDriver({driverId}).then((comments)=>{
      if(comments){
        setCommentByDriver({
          isLoading:false,
          data:comments.data,
          error:comments.error
        })
      }
    }).finally(()=>{
      setCommentByDriver(prev=>{
        return {
          ...prev,
          isLoading:false
        }
      })
    })
  }

  useEffect(()=> {
    if(selectedDriverId){
      _getDriverData(selectedDriverId);
      _getCommentByDriver(selectedDriverId)
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
  setDriver,
  commentByDriver,
  setCommentByDriver
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
