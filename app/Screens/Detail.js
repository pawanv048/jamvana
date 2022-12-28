import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import useDetailsData from '../context/useDetailsData.js';
 import 'react-native-gesture-handler';
import {
  ReleaseScreen,
  TrackScreen,
  ShopScreen,
  ExclusiveScreen
} from '../Screens/index.js';

const Tabs = createMaterialTopTabNavigator();

const Detail = ({route}) => {

  const detailsData = route.params.data;
  
  const { data, setData } = useDetailsData();
  const [isLoading, setLoading] = useState(true);

  const getRelease = async () => {
    try {
      const resp = await fetch(
        `http://84.16.239.66/api/Release/GetReleasesDetails?ReleaseId=${detailsData?.Release_Id}`,
      );

      //console.log('ReleaseId123=', detailsData?.Release_Id);

      const json = await resp.json();
      setData(json.Data);
      //console.log('fetchDetailsUsingReleaseId12=', JSON.stringify(json.Data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRelease();
    //postUser();
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Tabs.Navigator
      initialRouteName={'Release'}
      screenOptions={{
        tabBarLabelStyle: {fontSize: 12, fontWeight: 'bold'}, // {textTransform: 'none'} use this props for smallCase Title
        tabBarIndicatorStyle: {backgroundColor: 'powderblue'},
      }}
    >
      <Tabs.Screen name="Release" component={ReleaseScreen} />
      <Tabs.Screen name="Track" component={TrackScreen} />
      <Tabs.Screen name="Shop" component={ShopScreen} />
      <Tabs.Screen name="Exclusive" component={ExclusiveScreen} />
    </Tabs.Navigator>
  );
}

export default Detail

const styles = StyleSheet.create({})