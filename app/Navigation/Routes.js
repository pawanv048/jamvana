import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { 
  Home, 
  Detail, 
  Agreements, 
  ReleaseForm, 
  AudioTracks, 
  SelectTerritories,DigitalProvider,
  AdditionalOption,
  Testing,
  AddNewArtist,
  ArtistDetails
} from '../Screens';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function Root() {
  return (
    
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} options={{title: 'Releases'}}/>
      <Drawer.Screen name="Agreements" component={Agreements} />
      {/* <Drawer.Screen name="releaseForm" component={ReleaseForm} options={{title: ''}} /> */}
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
        <Stack.Screen name='SelectTerritories' component={SelectTerritories} options={{title: 'country'}}/>
        <Stack.Screen name='DigitalProvider' component={DigitalProvider} options={{title: 'Provider'}}/>
        <Stack.Screen name='AdditionalOption' component={AdditionalOption} options={{title: 'Add Options'}}/>
        <Stack.Screen name='testing' component={Testing} />
        <Stack.Screen name='AddNewArtist' component={AddNewArtist} options={{title: 'New Artist'}}/>
        <Stack.Screen name='artistDetails' component={ArtistDetails} options={{title: 'Artist Detail'}}/>
        <Stack.Screen name="releaseForm" component={ReleaseForm} options={{title: 'Release Form'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;


