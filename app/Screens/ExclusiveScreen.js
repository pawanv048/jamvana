import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useDetailsData from '../context/useDetailsData';

const ExclusiveScreen = () => {
    const {data, setData} = useDetailsData();
    
  return (
    <View>
      <Text>ExclusiveOn: "{data[0]?.Mice?.Misc_ExclusiveOnShop}"</Text>
      <Text>ExclusiveFor: "{data[0]?.Mice?.Misc_ExclusiveFor}"</Text>
      <Text>PreOrders: "{data[0]?.Mice?.Misc_AllowPreOrdersOnITunes}"</Text>
    </View>
  )
}

export default ExclusiveScreen;

const styles = StyleSheet.create({})
