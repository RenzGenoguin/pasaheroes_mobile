

import LoginPage from '../pages/LoginPage';
import SignUpForm from '../pages/SignUpForm';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
const PublicPages = () => {
    return (
    <Stack.Navigator initialRouteName='Signup' screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Signup" component={SignUpForm} />
    </Stack.Navigator>
     );
}
 
export default PublicPages;