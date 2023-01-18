import React, { useEffect, useState } from 'react';
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
import { API } from '../apis/API';

// http://84.16.239.66/api/Release/GetAllCountry


const SelectTerritories = ({ navigation }) => {

  const [territoriesList, setTerritoriesList] = useState([])
  // console.log('LIst=>', territoriesList);

  const [toggle, setoggle] = useState(true)


  const getTerritoriesData = () => {
    //console.log('calling api')
    API({
      url: `http://84.16.239.66/api/Release/GetAllCountry`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

      onSuccess: val => {
        setTerritoriesList(val?.Data)
        //  console.log('Terri data ==>', val?.Data)
        //setLoading(false)
      },
      onError: val => console.log('ERROR:', val),
    });
    //setLoading(true);
  }

  useEffect(() => {
    getTerritoriesData();
  }, []);

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
        <Text style={styles.countryTxt} onPress={() => setoggle(true)}>{item.Country_Name}</Text>
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
      <React.Fragment>
        <FlatList
          data={territoriesList}
          keyExtractor={(item) => `${item.Country_Id}`}
          renderItem={renderItem}
          style={{ paddingLeft: SIZES.padding * 2 }}
          //ListFooterComponent={renderFooter()}
          contentContainerStyle={{ paddingBottom: SIZES.padding }}
        />
        {renderFooter()}
      </React.Fragment>
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