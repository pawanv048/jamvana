import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { COLORS, SIZES } from '../Constants/theme';
import { API } from '../apis/API';

const DigitalProvider = ({ navigation }) => {

  const [providerList, setProviderList] = useState([])
  const [toggle, setoggle] = useState(true)
  const [isLoading, setLoading] = useState(false)





  const getDigitalServiesData = () => {
    //console.log('calling api')
    API({
      url: `http://84.16.239.66/api/Release/getdigitalservices`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

      onSuccess: val => {
        setProviderList(val?.Data)
        //  console.log('Terri data ==>', val?.Data)
        setLoading(false)
      },
      onError: val => console.log('ERROR:', val),
    });
    setLoading(true);
  };

  useEffect(() => {
    getDigitalServiesData();
  }, []);


  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size='large'/> 
      </View>
    );
  }

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
        <Text style={styles.providerTxt} onPress={() => setoggle(true)}>{item.ExclusiveOnShop_Name}</Text>
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
      <>
        <FlatList data={providerList}
          keyExtractor={(item) => `${item.ExclusiveOnShop_Id}`}
          renderItem={renderItem}
          style={{ paddingLeft: SIZES.padding * 2 }}
          //ListFooterComponent={renderFooter()}
          contentContainerStyle={{ marginBottom: 20 }}
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
          onPress={() => navigation.navigate('AdditionalOption')}
          style={styles.selectUnselectBtn}
        >
          <Text style={[styles.selectUnselectTxt, { marginHorizontal: 12 }]}>Next</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.headerTxt}>CHOOSE DIGITAL SERVICE PROVIDERS</Text>
      {renderHeader()}
      {renderTerritoriesList()}

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