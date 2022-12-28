import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const data = [
  {id: 1, value: 'sdfksd'},
  {id: 2, value: 'sdfksd'},
  {id: 3, value: 'sdfksd'},
  {id: 4, value: 'sdfksd'},
  {id: 5, value: 'sdfksd'}
]


const Testing = () => {
  return (
    <View>
      <FlatList data={data}
        renderItem={item => {
          return(
            <ShimmerPlaceHolder
              style={{
                width: 80,
                height: 100,
                borderRadius: 50
              }}
              shimmerColors={['#fff', '#000']}
            />
          )
        }}
      />
      


    </View>
  )
}

export default Testing

const styles = StyleSheet.create({})

