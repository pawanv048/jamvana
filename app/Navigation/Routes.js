import * as React from 'react';
import { Text, Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home, Detail, Agreements, ReleaseForm, AudioTracks } from '../Screens';
import navigationStrings from '../Constants/navigationStrings';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function Root() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} options={{title: 'Releases'}}/>
      <Drawer.Screen name="Agreements" component={Agreements} />
      <Drawer.Screen name="releaseForm" component={ReleaseForm} options={{title: 'ReleaseForm'}}/>
    </Drawer.Navigator>
  );
}

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="audioTracks" component={AudioTracks} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;


