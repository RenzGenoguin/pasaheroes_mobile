import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Scan from '../private/Scan';
import History from '../private/History';
import Account from '../private/Account';
import { Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyTabBar from './components/TabBar';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator  initialRouteName='Scan' tabBar={props => <MyTabBar {...props} />} >
      <Tab.Screen name="Rides" component={History} />
      <Tab.Screen name="Scan" component={Scan} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}