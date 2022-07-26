import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { COLORS, SIZES } from '../Constants/theme';

const provider_list = [
  { id: 1, name: 'Beatport' },
  { id: 2, name: 'iTunes' },
  { id: 3, name: 'Spotify' },
  { id: 4, name: 'Juno' },
  { id: 5, name: 'Deezer' },
  { id: 6, name: 'Amazon' },
  { id: 7, name: '7Digital' },
  { id: 8, name: 'Aspiro' },
  { id: 9, name: 'Anghami' },
  { id: 10, name: 'Beats Music' },
  { id: 11, name: 'BloomFM' },
  { id: 12, name: 'Djshop.de' },
  { id: 13, name: 'eMusic' },
  { id: 14, name: 'Rdio' },
]

const DigitalProvider = ({navigation}) => {

  const [providerList, setProviderList] = useState(provider_list)
  const [toggle, setoggle] = useState(true)

  // Particular provider
  function renderItem({ item, index }) {
    return (
      <View style={styles.providerItem}>
        <CheckBox
          value={toggle}
          style={{
            height: 15,
            width: 15,
            borderWidth: 0.3,
            borderColor: '#006CF6'
          }}
          boxType='square'
          onFillColor='#006CF6'
          onTintColor='#006CF6'
          onCheckColor='white'
          onAnimationType='fade'
          animationDuration={0.3}
        />
        <Text style={styles.providerTxt} onPress={() => setoggle(true)}>{item.name}</Text>
      </View>
    )
  }

  // 
  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: SIZES.padding * 2,
          justifyContent: 'space-between',
          paddingHorizontal: SIZES.padding * 2
        }}>
        <TouchableOpacity
          style={styles.selectUnselectBtn}
          onPress={() => setoggle(true)}
        >
          <Text style={styles.selectUnselectTxt}>Select All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.selectUnselectBtn}
          onPress={() => setoggle(false)}
        >
          <Text style={styles.selectUnselectTxt}>Unselect All</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // provider list
  function renderTerritoriesList() {
    return (
      <FlatList data={providerList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        style={{ paddingLeft: SIZES.padding * 2 }}
        //ListFooterComponent={renderFooter()}
        contentContainerStyle={{ marginBottom: 20 }}
      />

    )
  };


  function renderFooter() {
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SIZES.padding * 2,
        marginVertical: 10,

      }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.selectUnselectBtn}
        >
          <Text style={styles.selectUnselectTxt}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('AdditionalOption')}
          style={styles.selectUnselectBtn}
        >
          <Text style={[styles.selectUnselectTxt, { marginHorizontal: 12 }]}>Next</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View>
      <Text style={styles.headerTxt}>CHOOSE DIGITAL SERVICE PROVIDERS</Text>
      {renderHeader()}
      {renderTerritoriesList()}
      {renderFooter()}
    </View>
  )
}

export default DigitalProvider

const styles = StyleSheet.create({
  container: {
    flex: 1

  },
  headerTxt: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: SIZES.padding * 2,
    marginTop: 10
  },
  providerItem: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  providerTxt: {
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3C4048'
  },
  selectUnselectBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 3
  },
  selectUnselectTxt: {
    color: '#fff',
    padding: 10,
    fontWeight: 'bold'
  }
})