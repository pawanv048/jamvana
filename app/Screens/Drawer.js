import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Home, Detail, Agreements } from './index';

import Routes from '../Navigation/Routes';

const Drawer = createDrawerNavigator();

const HomeMenu = () => {

  function Agreements({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <Button onPress={() => navigation.goBack()} title="Go back home" /> */}
      </View>
    );
  }


  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen name="Home" component={Home} options={{ title: 'Release'}} />
        <Drawer.Screen name="Agreements" component={Agreements} />
        <Drawer.Screen name="Detail" component={Detail} options={{drawerLabel: 'Detail'}}/>
      </Drawer.Navigator>
    </NavigationContainer>
  )



  // const SettingsStack = createNativeStackNavigator();
  // const HomeStack = createNativeStackNavigator();

  // return (
  //   <NavigationContainer>
  //     <Tab.Navigator screenOptions={{ headerShown: false }}>
  //       <Tab.Screen name="First">
  //         {() => (
  //           <SettingsStack.Navigator>
  //             <SettingsStack.Screen
  //               name="Settings"
  //               component={SettingsScreen}
  //             />
  //             <SettingsStack.Screen name="Profile" component={ProfileScreen} />
  //           </SettingsStack.Navigator>
  //         )}
  //       </Tab.Screen>
  //       <Tab.Screen name="Second">
  //         {() => (
  //           <HomeStack.Navigator>
  //             <HomeStack.Screen name="Home" component={HomeScreen} />
  //             <HomeStack.Screen name="Details" component={DetailsScreen} />
  //           </HomeStack.Navigator>
  //         )}
  //       </Tab.Screen>
  //     </Tab.Navigator>
  //   </NavigationContainer>
  // );


}

export default HomeMenu;

const styles = StyleSheet.create({})