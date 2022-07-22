import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useDetailsData from '../context/useDetailsData';

const ShopScreen = () => {
    const {data, setData} = useDetailsData();
  return (
    <View style={{ margin: 15 }}>
      <Text>{data[0]?.ChooseShops?.ChooseShops_Retailers}</Text>
    </View>
  )
}

export default ShopScreen

const styles = StyleSheet.create({})