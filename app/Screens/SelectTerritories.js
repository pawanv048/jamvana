import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback
} from 'react-native';
// import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import CheckBox from '@react-native-community/checkbox';
import { COLORS, SIZES } from '../Constants/theme';
import { API } from '../apis/API';

// http://84.16.239.66/api/Release/GetAllCountry


const SelectTerritories = ({ navigation }) => {

  const [territoriesList, setTerritoriesList] = useState([])
  // console.log('LIst=>', territoriesList);
  const [isLoading, setLoading] = useState(true);
 // const [toggle, setoggle] = useState(true)
  const [checkboxStates, setCheckboxStates] = useState({});



  const getTerritoriesData = () => {
    //console.log('calling api')
    API({
      url: `http://84.16.239.66/api/Release/GetAllCountry`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

      onSuccess: val => {
        setTerritoriesList(val?.Data)
        //  console.log('Terri data ==>', val?.Data)
        setLoading(false)
      },
      onError: val => console.log('ERROR:', val),
    });
    setLoading(true);
  }

  // NEXT BUTTON
  const handleNext = () => {
    //console.log('button click');
    navigation.navigate('DigitalProvider')
  }

  // SELECT INDIVIDUAL COUNTRIES
  const handleCheckboxPress = (itemName) => {
    setCheckboxStates({
      ...checkboxStates,
      [itemName]: !checkboxStates[itemName],
    });
    //console.log(checkboxStates[itemName] ? `Unchecked: ${itemName}` : `Checked: ${itemName}`);
  };

  // SELECT ALL COUNTRIES
  const handleSelectAll = () => {
    const newStates = {};
    territoriesList.forEach((item) => {
      newStates[item.Country_Name] = true;
    });
    setCheckboxStates(newStates);
  };
  

  // UNSELECT ALL COUNTRIES
  const handleUnselectAll = () => {
    setCheckboxStates({});
  };

  useEffect(() => {
    getTerritoriesData();
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size='large'/> 
      </View>
    );
  }

  const Item = React.memo(({ item, index }) => {
    return (
      <View style={styles.countryItem}>
        <CheckBox
        value={checkboxStates[item.Country_Name] || false}
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
        // onValueChange={() => {
        //   setoggle(true);
        //   //console.log(toggle ? `Unchecked: ${item.Country_Name}` : `Checked: ${item.Country_Name}`);
        // }}
        onValueChange={() => handleCheckboxPress(item.Country_Name)}
      />
      <Text style={styles.countryTxt} >{item.Country_Name}</Text>
    </View>

    );
  });



  function renderItem({ item, index }) {
    return <Item item={item} index={index} />;
  }

  // Particular country
  // function renderItem({ item, index }) {
  //   return (
  //     <View style={styles.countryItem}>
  //       <CheckBox
  //         value={checkboxStates[item.Country_Name] || false}
  //         style={{
  //           height: 15,
  //           width: 15,
  //           borderWidth: 0.3,
  //           borderColor: '#006CF6'
  //         }}
  //         boxType='square'
  //         onFillColor='#006CF6'
  //         onTintColor='#006CF6'
  //         onCheckColor='white'
  //         onAnimationType='fade'
  //         animationDuration={0.3}
  //         // onValueChange={() => {
  //         //   setoggle(true);
  //         //   //console.log(toggle ? `Unchecked: ${item.Country_Name}` : `Checked: ${item.Country_Name}`);
  //         // }}
  //         onValueChange={() => handleCheckboxPress(item.Country_Name)}
  //       />
  //       <Text style={styles.countryTxt} >{item.Country_Name}</Text>
  //     </View>
  //   )
  // }

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
          onPress={handleSelectAll}
        >
          <Text style={styles.selectUnselectTxt}>Select All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.selectUnselectBtn}
          onPress={handleUnselectAll}
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
          // onPress={() => navigation.navigate('DigitalProvider')}
          onPress={handleNext}
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