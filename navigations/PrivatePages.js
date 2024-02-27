import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Scan from '../pages/private/Scan';
import History from '../pages/private/History';
import Account from '../pages/private/Account';
import { Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyTabBar from './components/TabBar';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator  initialRouteName='Account' tabBar={props => <MyTabBar {...props} />} >
    <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Scan" component={Scan} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}