

import LoginPage from '../LoginPage';
import SignUpForm from '../SignUpForm';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
const PublicPages = () => {
    return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Signup" component={SignUpForm} />
    </Stack.Navigator>
     );
}
 
export default PublicPages;