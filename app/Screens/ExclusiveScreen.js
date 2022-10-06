import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useDetailsData from '../context/useDetailsData';
import * as Strings from '../Constants/strings';

const ExclusiveScreen = () => {
    const {data, setData} = useDetailsData();
    
  return (
    <View style={{ margin: 15}}>
      <Text>{Strings.t43} "{data[0]?.Mice?.Misc_ExclusiveOnShop}"</Text>
      <Text>{Strings.t44} "{data[0]?.Mice?.Misc_ExclusiveFor}"</Text>
      <Text>{Strings.t45} "{data[0]?.Mice?.Misc_AllowPreOrdersOnITunes}"</Text>
    </View>
  )
}

export default ExclusiveScreen;

const styles = StyleSheet.create({})
