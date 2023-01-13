import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  keyboardType
} from 'react-native';
import { COLORS, SIZES } from '../Constants/theme';
import icons from '../Constants/icons';


//****************This module is not in use */
const fullArrayData = [
  {
    id: 1,
    'ArtistName': 'pawan',
    'Email': 'item1@gmail.com',
  },
  {
    id: 2,
    'ArtistName': 'rahul',
    'Email': 'item2@gmail.com',
  },
  {
    id: 3,
    'ArtistName': 'sourav',
    'Email': 'item3@gmail.com',
  },
  {
    id: 4,
    'ArtistName': 'delhi',
    'Email': 'item4@gmail.com',
  },
  {
    id: 5,
    'ArtistName': 'pawan',
    'Email': 'item1@gmail.com',
  },
  {
    id: 6,
    'ArtistName': 'rahul',
    'Email': 'item2@gmail.com',
  },
  {
    id: 7,
    'ArtistName': 'sourav',
    'Email': 'item3@gmail.com',
  },
  {
    id: 8,
    'ArtistName': 'delhi',
    'Email': 'item4@gmail.com',
  },
  
]

const ArtistDetails = ({ navigation }) => {

  const [search, setSearch] = useState('');
  const [fullData, setFullData] = useState(fullArrayData);

  function renderArtistHeader() {
    return (
      <View style={{ marginVertical: SIZES.padding * 2 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddNewArtist')}
          style={styles.newArtistBtn}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Add New Artist</Text>
        </TouchableOpacity>
      </View>
    )
  }
  

  const handleSearchInput = e => {
    let text = e.toLowerCase();
    let fullList = fullData;
    let filteredList = fullList.filter(item => {
       //search from a full list, and not from a previous search results
       if (item.ArtistName.toLowerCase().includes(text)) return item;
    });
    if (!text || text === '') {
      setFullData(fullArrayData);
     // console.log(fullList)
    } else if (!filteredList.length) {
      setFullData([]);
    } else if (Array.isArray(filteredList)) {
      setFullData(filteredList);
    }
 };

  function renderArtistEntries() {

    return (
      <View style={{ marginHorizontal: SIZES.padding * 2 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.entriesTxt, { marginRight: 5 }]}>Show All entries</Text>
          {/* <View style={{
            width: 40,
            height: 20,
            borderWidth: 1,
            borderColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Text>All</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Image source={icons.downarrow}
                style={{ width: 10, height: 10, marginHorizontal: 4 }}
              />
            </TouchableOpacity>
          </View>
          <Text style={[styles.entriesTxt, { marginLeft: 5 }]}>entries</Text> */}
        </View>

        {/* search */}

        <View style={{ flexDirection: 'row', marginVertical: SIZES.padding, alignItems: 'center' }}>
          <Text style={styles.entriesTxt}>Search: </Text>
          <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='name-phone-pad'
            value={search}
            placeholder='search'
            onChangeText={text => {
              //let text = val.replace(/[^0-9a-zA-Z+ ]/g, '');
              handleSearchInput(text);
              setSearch(text);
           }}
            style={styles.searchInputs} 
            />
        </View>
      </View>
    )
  }

  function renderListing() {

    function renderHeaderList() {
      return (
        <View style={{
          flexDirection: 'row',
          backgroundColor: '#4C19A4',
          padding: 5,
          height: 50,
          //paddingHorizontal: SIZES.padding,
          marginHorizontal: SIZES.padding * 2,
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 1,
          borderColor: 'black'
        }}>
          <View style={{ width: '30%' }}>
            <Text style={styles.listTxt}>Artist Name</Text>
          </View>
          <View style={{ width: '25%' }}>
            <Text style={[styles.listTxt]}>Email</Text>
          </View>
          <View style={{ width: '25%' }}>
            <Text style={styles.listTxt}>Action</Text>
          </View>
        </View>
      )
    }

    // function onDeletePress(id){
    //   let fullList = fullArrayData;
    //   fullList.filter((val, i) => {
    //     if(val.id !== id){
    //       return val
    //     }
    //   })
    //   console.log('filterarray list', fullList)
    //   //setFullData(fullList)
    // }

    const renderArtistItems = ({ item, index }) => {
      
      return (
        <View style={{
          //width: '100%',
          flexDirection: 'row',
          height: 50,
          alignItems: 'center',
          padding: 5,
          marginHorizontal: SIZES.padding * 2,
          justifyContent: 'space-between',
          //borderRadius: 1,
          borderWidth: 0.5,
          borderColor: 'black',

        }}>
          <View style={{ width: '30%', padding: 10 }}>
            <Text>{item.ArtistName}</Text>
          </View>
          <View style={{ width: '40%', padding: 10 }}>
            <Text ellipsizeMode="tail" numberOfLines={1}>{item.Email}</Text>
          </View>
          <View style={{ flexDirection: 'row', width: '30%', padding: 10 }}>
            <TouchableOpacity
              style={[styles.actionBtn,{backgroundColor: '#4C19A4'}]}
            >
              <Text style={styles.actionTxt}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, {backgroundColor: '#FF5419'}]}
              onPress={() => onDeletePress(item.id)}
            >
              <Text style={styles.actionTxt}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    // FlatListItemSeparator = () => {
    //   return (
    //     <View
    //       style={{
    //         height: 0.5,
    //         width: "100%",
    //         backgroundColor: "#000",

    //       }}
    //     />
    //   );
    // }

    return (
      <FlatList
        data={fullData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderArtistItems}
        ListHeaderComponent={renderHeaderList}
        style={{ marginTop: SIZES.padding }}
        bounces={false}
        contentContainerStyle={{paddingVertical: SIZES.padding}}
        showsVerticalScrollIndicator={false}
        //ItemSeparatorComponent={FlatListItemSeparator}
      />
    )
  }

  function renderFooter() {
    return (
      <View
        style={{
          margin: SIZES.padding * 2
        }}>
        <Text> showing {fullData.length} entries</Text>
      </View>
    )
  }

  return (
    <View style={{flex: 1}}>
      {renderArtistHeader()}
      {renderArtistEntries()}
      {renderListing()}
      {renderFooter()}
    </View>
  )
};

export default ArtistDetails

const styles = StyleSheet.create({

  newArtistBtn: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SIZES.padding * 2,
    padding: SIZES.padding * 2,
    borderRadius: 10
  },
  entriesTxt: {
    fontSize: 15,
    fontWeight: '700'
  },
  listTxt: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: 'bold'
  },
  actionBtn: {
    //backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    padding: 5,
    height: 30,
    borderRadius: 3
  },
  searchInputs: {
    width: '60%',
    height: 35,
    borderWidth: 1.5,
    borderColor: '#000',
    paddingLeft: 10,
    borderRadius: 5
  },
  actionTxt: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600'
  }

})