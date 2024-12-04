import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Start from '../components/Start';
import Login from '../components/Login';
import Register from '../components/Register';
import Introduce from '../components/Introduce';
import Home from '../components/Home';
import Detail from '../components/Detail';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
      <Stack.Screen name="Introduce" component={Introduce} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;