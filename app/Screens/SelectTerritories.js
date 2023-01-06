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

const country_list = [
  { id: 1, name: 'India' },
  { id: 2, name: 'china' },
  { id: 3, name: 'sri Lanka' },
  { id: 4, name: 'Australia' },
  { id: 5, name: 'New York' },
  { id: 6, name: 'Gabon' },
  { id: 7, name: 'Gambia' },
  { id: 8, name: 'Guadeloupe' },
  { id: 9, name: 'Equatorial Guinea' },
  { id: 10, name: 'Guatemala' },
  { id: 11, name: 'Niger' },
  { id: 12, name: 'Norfolk Island' },
  { id: 13, name: 'Guadeloupe' },
  { id: 14, name: 'Equatorial Guinea' },
  { id: 1, name: 'India' },
  { id: 2, name: 'china' },
  { id: 3, name: 'sri Lanka' },
  { id: 4, name: 'Australia' },
  { id: 5, name: 'New York' },
  { id: 6, name: 'Gabon' },
  { id: 7, name: 'Gambia' },
  { id: 8, name: 'Guadeloupe' },
  { id: 9, name: 'Equatorial Guinea' },
  { id: 10, name: 'Guatemala' },
  { id: 11, name: 'Niger' },
  { id: 12, name: 'Norfolk Island' },
  { id: 13, name: 'Guadeloupe' },
  { id: 14, name: 'Equatorial Guinea' },
]

const SelectTerritories = ({ navigation }) => {

  const [countryList, setCountryList] = useState(country_list)
  const [toggle, setoggle] = useState(true)

  // Particular country
  function renderItem({ item, index }) {
    return (
      <View style={styles.countryItem}>
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
        <Text style={styles.countryTxt} onPress={() => setoggle(true)}>{item.name}</Text>
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

  // Country list
  function renderTerritoriesList() {
    return (
      <>
        <FlatList
          data={countryList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          style={{ paddingLeft: SIZES.padding * 2 }}
          //ListFooterComponent={renderFooter()}

          contentContainerStyle={{ paddingBottom: SIZES.padding }}
        />
        {renderFooter()}
      </>
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
          onPress={() => navigation.navigate('DigitalProvider')}
          style={styles.selectUnselectBtn}
        >
          <Text style={[styles.selectUnselectTxt, { marginHorizontal: 12 }]}>Next</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.headerTxt}>Select Territories</Text>
      {renderHeader()}
      {renderTerritoriesList()}

    </View>
  )
}

export default SelectTerritories

const styles = StyleSheet.create({
  container: {
    flex: 1

  },
  headerTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: SIZES.padding * 2,
    marginTop: 10
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  countryTxt: {
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