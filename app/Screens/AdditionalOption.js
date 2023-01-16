import React, { useState, useEffect } from 'react'
import { SIZES, COLORS } from '../Constants/theme';
import * as Strings from '../Constants/strings';
import SelectList from 'react-native-dropdown-select-list';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { API } from '../apis/API';
import { DropdownPicker } from '../Custom/CustomComponent';


{/* Main Genre: */ }
{/* <DropdownPicker
label="Main Genre:"
data={newMainGenre}
setSelected={setSelected}
defaultOption={{ key: formData.mainGener, value: formData.mainGener }}
/> */}

//http://84.16.239.66/api/Release/Exlusiveshop



const data = [
  { key: '1', value: 'item_1' },
  { key: '2', value: 'item_2' },
];


const AdditionalOption = ({ navigation }) => {

  const [selected, setSelected] = useState('');
  const [selectExclusiveShopData, setSelectExclusiveShopData] = useState([])
  const [selectExclusiveForData, setSelectExclusiveForData] = useState([])

  const getExclusiveShopData = () => {
    API({
      url: `http://84.16.239.66/api/Release/Exlusiveshop`,
      headers: { 'Content-Type': 'application/json' },

      onSuccess: val => {
        //alert('maingeneredata =>',val?.Data)
        ///let testlang = 
        // console.log('Exclusiveshopdata => ', val?.Data);
        setSelectExclusiveShopData(val?.Data)
      },
      onError: val => console.log('Error:', val)
    })
  };

  const getExclusiveForData = () => {
    API({
      url: `http://84.16.239.66/api/Release/ExlusiveshopFor`,
      headers: { 'Content-Type': 'application/json' },

      onSuccess: val => {
        //alert('maingeneredata =>',val?.Data)
        ///let testlang = 
        // console.log('Exclusiveshopdata => ', val?.Data);
        setSelectExclusiveForData(val?.Data);
      },
      onError: val => console.log('Error:', val)
    })
  };

  useEffect(() => {
    getExclusiveShopData();
    getExclusiveForData();
  }, [])



  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          marginLeft: SIZES.padding,
          marginVertical: SIZES.padding
        }}>
        <Text style={{
          fontSize: 18,
          fontWeight: '400',
          //marginBottom: 24
        }}>
          SET ADDITIONAL OPTIONS
        </Text>
      </View>

      {/* Exclusives */}

      <View>
        <View style={{
          marginBottom: SIZES.padding
        }}>
          {/* <Text style={styles.exclusivesTxt}>
            {Strings.EOS}
          </Text> */}
          <DropdownPicker
            label="Exclusive on Shop:"
            labelContainer={{color: COLORS.black}}
            data={selectExclusiveShopData}
            setSelected={setSelected}
          // defaultOption={{ key: formData.mainGener, value: formData.mainGener }}
          />
        </View>

        <View>
          {/* <Text style={styles.exclusivesTxt}>
            {Strings.EF}
          </Text> */}
          <DropdownPicker
            label="Exclusive for:"
            data={selectExclusiveForData}
            setSelected={setSelected}
            labelContainer={{color: COLORS.black}}
          //defaultOption={{ key: formData.mainGener, value: formData.mainGener }}
          />
        </View>
      </View>

      {/* Terms and Conditions */}

      <View style={{
        marginHorizontal: SIZES.padding,
        marginVertical: SIZES.padding * 2,
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <CheckBox
          style={{
            height: 15,
            width: 15,
          }}
          boxType='square'
          onCheckColor='white'
          onFillColor='#006CF6'
        />
        <Text style={styles.preorderTxt}>{Strings.preorder}</Text>
      </View>

      <View
        style={{
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.padding * 2,

        }}>
        <CheckBox
          style={{
            height: 15,
            width: 15,
          }}
          boxType='square'
          onCheckColor='white'
          onFillColor='#006CF6'
        />
        <Text style={{
          marginVertical: 10,
          fontWeight: 'bold',
          fontSize: 16
        }}>
          {Strings.ReviewAll}
        </Text>
      </View>

      {/* UPLOADS OF RELEASES */}

      <View style={{
        marginHorizontal: SIZES.padding,
        //width: SIZES.width - 20,
        //backgroundColor: 'red'
      }}>
        <Text>{Strings.ReleaseArtwork}</Text>
        <Text style={{ marginVertical: SIZES.padding * 2 }}>{Strings.AudioSize}</Text>
        <Text>{Strings.Releasedetails}</Text>
        <Text style={styles.policyTxt}>{Strings.Policy}</Text>
      </View>

      <View style={{
        flexDirection: 'row',
        margin: SIZES.padding * 2,
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <TouchableOpacity
          style={styles.selectUnselectBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.selectUnselectTxt}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.selectUnselectBtn}>
          <Text style={styles.selectUnselectTxt}>Finish</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  )
}

export default AdditionalOption

const styles = StyleSheet.create({

  exclusivesTxt: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  exclusiveDropDown: {
    backgroundColor: COLORS.white
  },
  preorderTxt: {
    marginLeft: 25,
    fontSize: 15,
    fontWeight: 'bold'
  },
  policyTxt: {
    fontSize: 14,
    fontWeight: 'bold'
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