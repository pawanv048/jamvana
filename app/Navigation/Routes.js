import * as React from 'react';
import { Text, Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home, Detail } from '../Screens';
import navigationStrings from '../Constants/navigationStrings';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function Agreements({ navigation }) {
            return (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Agreements Screen</Text>
              </View>
            );
          }


function Root() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Agreements" component={Agreements} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;