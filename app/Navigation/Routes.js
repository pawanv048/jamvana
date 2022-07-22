import * as React from 'react';
import { Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Detail } from '../Screens';
import navigationStrings from '../Constants/navigationStrings';
import Drawer from '../Screens/Drawer'


const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <Stack.Navigator initialRouteName={navigationStrings.HOME} screenOptions={{ headerShown: true }}>
      <Stack.Screen name={navigationStrings.HOME} component={Home}/>
      <Stack.Screen name={navigationStrings.DETAIL} component={Detail} />
    </Stack.Navigator>
  );
}

export default Routes;