import React, { useCallback, useEffect, useState } from 'react';
import ReleaseInput from '../Custom/ReleaseInput';
import { COLORS, SIZES } from '../Constants/theme';
import icons from '../Constants/icons';
import { Picker } from '@react-native-picker/picker';
import RadioButton from '../Custom/RadioButton';
import ModalPicker from '../Custom/ModalPicker';
import LabelModalPicker from '../Custom/LabelModalPicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Strings from '../Constants/strings';
import SelectList from 'react-native-dropdown-select-list';
import DatePicker from 'react-native-datepicker';
import { LogBox } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import useDetailsData from '../context/useDetailsData';
import { API } from '../apis/API';

import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';



import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Button,
  useWindowDimensions,
  TextInput,
  ScrollView,
  Alert,
  Keyboard
} from 'react-native';

LogBox.ignoreAllLogs();                                                     //Ignore all log notifications
//Import Image Picker

// URLs
const baseURL = 'http://84.16.239.66/api/'


const ReleaseForm = ({ route, navigation }) => {

  //passing data from ReleaseScreen
  const releaseData = route?.params?.data

  // dropdown data
  const [languageData, setLanguageData] = useState([])
  const [mainGenreData, setmainGenreData] = useState([])
  const [subGenreData, setSubGenreData] = useState([])

  // const [value, setValue] = useState(getDetails("Release_ReleaseTitle"));
  const [description, setdescription] = useState('Distributed by Jamvana - www.Jamvana.com')
  const [loadingLabel, setLoadingLabel] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [selected, setSelected] = useState('');

  //Get Particular Data
  const [displayArtist, setDisplayArtist] = useState(
    `${releaseData?.Release?.Release_DisplayArtist || ''}`,
  );
  const [remixer, setRemixer] = useState(
    `${releaseData?.Release?.Remixer || ''}`,
  );
  const [orchestra, setOrchestra] = useState(
    `${releaseData?.Release?.Orchestra || ''}`,
  );
  const [actor, setActor] = useState(
    `${releaseData?.Release?.Actor || ''}`
  );
  const [lyricist, setLyricist] = useState(
    `${releaseData?.Release?.Lyricist || ''}`,
  );

  const [mainGener, setMainGenre] = useState(
    `${releaseData?.Release?.Release_MainGenre || ''}`
  );

  const [primaryArtist, setprimaryArtist] = useState(
    `${releaseData?.Release?.Release_PrimaryArtist || ''}`
  );

  const [priceTiers, setpriceTiers] = useState(
    `${releaseData?.Release?.Price_Tiers || ''}`
  );
  console.log('price artist =>',priceTiers)

  const [subGener, setsubGener] = useState(
    `${releaseData?.Release?.Release_SubGenre || ''}`
  );

  const [featureArtist, setFeatureArtist] = useState(
    `${releaseData?.Release?.Release_FeaturedArtist || ''}`,
  );

  const [composer, setComposer] = useState(
    `${releaseData?.Release?.Composer || ''}`,
  );
  const [arranger, setArranger] = useState(
    `${releaseData?.Release?.Arranger || ''}`,
  );
  const [conductor, setConductor] = useState(
    `${releaseData?.Release?.Conductor || ''}`,
  );
  const [cat, setCat] = useState('');

  const [releaseTitle, setReleaseTitle] = useState(
    `${releaseData?.Release?.Release_ReleaseTitle || ''}`,
  );
  const [copyRights, setCopyRights] = useState(
    `${releaseData?.Release?.Copyrights || ''}`,
  );


  // Release Date
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  // storing image path
  const [filePath, setFilePath] = useState({});


  // Permission for gallery
  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const [lableData, setLableData] = useState([])

  //console.log('labelid', lableData.map((userid) => userid))
  //console.log('test =>', lableData)
  let test1;
  //const key = lableList?.Label_Id
  let list = [];

  if (lableData.length > 0) {
    const dataLbl = JSON.parse(lableData);
     test1 = dataLbl.map((lableList) => lableList);
     list = [
      ...list,
      ...test1.map((element) => ({ key: element.Label_Id, value: element.Label_Name }))
    ];
  } else {
    console.log('No data found');
  }

  
  const userReleaseId = releaseData?.Release?.User_Id
  //console.log('userid=>>',userReleaseId)

  const getUserLableData = async () => {
    //console.log('calling api')
    //GET request
    await fetch(`${baseURL}GetLableByUserId?UserId=${userReleaseId}`, {
      method: 'GET',
      // headers: {
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json'
      // },
      //Request Type
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })

      //If response is in json then in success
      .then((responseJson) => {
        //Success
        setLableData(JSON.stringify(responseJson.Data));
        //console.log(JSON.stringify(responseJson));
        ///console.log('base64 -> ', JSON.stringify(responseJson.Data[0].Label_Name));
      })
      //If response is not in json then in error
      .catch((error) => {
        //Error
        Alert.alert(error);
        //console.log(error);
      })
  };



  useEffect(() => {
    getUserLableData()
  }, [])


  // Select File from gallery
  const chooseFile = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    let isStoragePermitted = await requestExternalWritePermission();
    if (isStoragePermitted) {
      try {
        launchImageLibrary(options, (response) => {
          console.log('Response = ', response);

          if (response.didCancel) {
            alert('cancelled camera picker');
            return;
          } else if (response.errorCode == 'camera_unavailable') {
            alert('Camera not available on device');
            return;
          } else if (response.errorCode == 'permission') {
            alert('Permission not satisfied');
            return;
          } else if (response.errorCode == 'others') {
            alert(response.errorMessage);
            return;
          }
          // console.log('base64 -> ', response.base64);
          // console.log('uri -> ', response.uri);
          // console.log('width -> ', response.width);
          // console.log('height -> ', response.height);
          // console.log('fileSize -> ', response.fileSize);
          // console.log('type -> ', response.type);
          // console.log('fileName -> ', response.fileName);
          setFilePath(response.assets[0]);
        });
      } catch (error) {
        console.log(error)
      }
    }
  };


  // const { width, height } = useWindowDimensions();

  // radion button liked category
  const [isLiked, setIsLiked] = useState([
    { id: 1, value: true, name: "Release", selected: false },
    { id: 2, value: false, name: "Album", selected: false },
    { id: 3, value: false, name: "Mix", selected: false }
  ]);

  // radio button category
  const [onClickYes, setOnClickYes] = useState(false)
  const [choose, setchoose] = useState([
    { id: 1, value: false, name: "Yes", selected: false },
    { id: 2, value: false, name: "No", selected: false },
  ]);

  // Parental warning data
  const data = [
    { key: '1', value: 'NotExplicit' },
    { key: '2', value: 'Explicit' },
    { key: '3', value: 'ExplicitContentEdited' },
  ];


  //Creating handle click function
  const onRadioBtnClick = (item) => {
    let updatedState = isLiked.map((isLikedItem) =>
      isLikedItem.id === item.id
        ? { ...isLikedItem, selected: true }
        : { ...isLikedItem, selected: false }
    );
    setIsLiked(updatedState);
  };

  // radion button items
  const onRadioBtnPress = (item) => {
    let updatedState = choose.map((isLikedItem) =>
      isLikedItem.id === item.id
        ? { ...isLikedItem, selected: true }
        : { ...isLikedItem, selected: false }
    );
    setchoose(updatedState);
    if (item.id === 1) {
      setOnClickYes(true)
    } else {
      setOnClickYes(false)
    }
  };


  // seperator
  const Separator = () => <View style={styles.separator} />

  // label
  const [label, setLabel] = useState('')
  const [newLabel, setNewLabel] = useState([])


  // user adding label
  const addLabel = () => {
    if (label == '') {
      Alert.alert('Error', 'Please input Label');
    } else {
      const newLabelList = {
        id: Math.random(), // generate new id
        task: label,
        completed: false,
      };
      // console.log(id)
      setNewLabel([...newLabel, newLabelList]);
      setLabel('');
    }
    //console.log(label)
  };

  // adding new label
  const ListLabelItem = ({ newLabel }) => {
    return (
      <View style={{
        marginHorizontal: SIZES.padding * 2,
        marginVertical: SIZES.padding * 0.6
      }}>
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: 'white'
        }}>{newLabel?.task}</Text>
      </View>
    );
  };

  // GET Language data
  const getLanguageData = () => {
    //console.log('calling api')
    API({
      url: `${baseURL}/GetLanguage`,
      // method: 'POST',
      headers: { 'Content-Type': 'application/json' },

      onSuccess: val => {
        // let newArray = val?.data.map((item) => {
        //   return {key: item.Id, value: item.Language}
        // })
        setLanguageData(val?.Data)
        //console.log('Agreement data ==>', val?.Data)
        //setLoading(false)
      },
      onError: val => console.log('ERROR:', val),
    })
  };


  // Get mainGenre data
  const getMainGenreData = () => {
    API({
      url: `${baseURL}/GetmainGenre`,
      headers: { 'Content-Type': 'application/json' },

      onSuccess: val => {
        //alert('maingeneredata =>',val?.Data)
        ///let testlang = 
        setmainGenreData(val?.Data)
      },
      onError: val => console.log('Error:', val)
    })
  };


  const getSubGenreData = () => {
    API({
      url: `${baseURL}/Getsubgenre`,
      headers: { 'Content-Type': 'application/json' },

      onSuccess: val => {
        setSubGenreData(val?.Data)
      },
      onError: val => console.log('Error:', val)
    })
  };



  let selectedArtistList=[];
  //const [seledArtistList, setSelectedArtistList]=useState(selectedArtistList);
  //NEWPRI
  //a691efb4-04bc-4349-9ba4-0103abc0de70
  //const newLanguage = languageData.map((item) => { return { key: item.Id, value: item.Language } })
  
  const [prdata, setPrdata] = useState([])
  
  const choosePriArtist = prdata.map((items) => { return {id: items.ArtistName, item: items.ArtistName } })
  const [chooseArt, setChoosePriArt ] = useState(choosePriArtist)
   console.log('choose_primary =>',chooseArt)
   //choose_primary => [{"id": "MadRay", "item": "MadRay"}] -- when adding data on input field

  if (primaryArtist.length !== 0) {
    var artistNames = primaryArtist;
    var artistList = artistNames.split(',');
    console.log('atList', artistList);
    //atList ["LeRome Swiss", "MadRay", "SAKRA."]
   let selectedArtistList = [
      ...selectedArtistList,
      ...artistList.map((element) => ({ id: element , item: element }))  
    ];
    
    //console.log('artist_list', selectedArtistList);
    //artist_list [{"id": "LeRome Swiss", "item": "LeRome Swiss"}, {"id": "MadRay", "item": "MadRay"}, {"id": "SAKRA.", "item": "SAKRA."}]
  } else {
    console.log('ArtistList Else');
  }

   // select items from
   function onMultiChange() {
    //return (item) => setSelectedTeams(xorBy(selectedTeams, [item]))
    return (item) => setChoosePriArt(xorBy(chooseArt, [item], 'id'))
    
   // return (item) => setSelectedArtistList(xorBy(seledArtistList, [item], 'id'))
  }
  //console.log('show primery=>', choosePriArtist)
  //console.log(selectedTeams)
  const getAllPrimaryArtist = () => {
    API({
      url: `http://84.16.239.66/api/GetAllArtistByUserId?userId=${userReleaseId}`,
      headers: { 'Content-Type': 'application/json' },

      onSuccess: val => {
        //console.log('primary artistdata=>',val.Data)
        setPrdata(val.Data)
      },
      onError: val => console.log('Error:', val)
    })
  }



  useEffect(() => {
    getLanguageData();
    getMainGenreData();
    getSubGenreData();
    getAllPrimaryArtist();
  }, []);


  const newLanguage = languageData.map((item) => { return { key: item.Id, value: item.Language } })
  const newMainGenre = mainGenreData.map((item) => { return { key: item.MainGenre_Name, value: item.MainGenre_Name } })
  const newSubGenre = subGenreData.map((item) => { return { key: item.Id, value: item.SubGenre_Name } })
  //const newpriceTiers = priceTiers.map((item) => item )
  //console.log(newMainGenre)

  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Language */}

        <View>
          <Text style={[styles.langTxt, { marginLeft: SIZES.padding2, marginTop: 20 }]}>Language:</Text>
          {/* <Button title='submit' onPress={getDataUsingAsyncAwaitGetCall}/> */}
          <SelectList
            //key={languageData.map((item) => item.Id)}
            setSelected={setSelected}
            boxStyles={styles.artistDropDown}
            //arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
            //search={false}
            defaultOption={{ key: '1', value: 'English' }}
            data={newLanguage}
            //data={data}
            maxHeight={300}
            //placeholder="Select Language"
            notFoundText="NO Language found"
            //onSelect={() => console.log(selected)}
            //onSelect={() => alert(selected)}
            //search={false}
            dropdownStyles={{
              backgroundColor: COLORS.gray,
              margin: SIZES.padding * 2,
            }}
          />

        </View >

        {/* Display Artists */}
        <ReleaseInput
          text='Display Artists (optional):'
          value={displayArtist}
          onChangeText={text => setDisplayArtist(text)}
        />

        {/* Remixer */}

        <ReleaseInput
          text='Remixer:'
          value={remixer}
          onChangeText={text => setRemixer(text)}
        />
        {/* Orchestra */}

        <ReleaseInput
          text='Orchestra:'
          value={orchestra}
          onChangeText={text => setOrchestra(text)}
        />

        {/* Actor */}

        <ReleaseInput
          text='Actor:'
          value={actor}
          onChangeText={text => setActor(text)}
        />

        {/* Lyricist */}

        <ReleaseInput
          value={lyricist}
          onChangeText={text => setLyricist(text)}
          text='Lyricist:'
        />

        {/* LABLE INPUT */}

        <View style={styles.langView}>
          <Text style={styles.langTxt}>Lable:</Text>
          <View style={{
            flexDirection: 'row',
            //justifyContent: 'space-between',
            //paddingHorizontal: 40,
            alignItems: 'center',
            //backgroundColor: 'red'
          }}>
            <View>
              {/* <Button title='labeldata' onPress={getUserLableData}/> */}

              {list.length != 0 && (
                <SelectList
                  setSelected={setSelected}

                  boxStyles={[
                    styles.artistDropDown,
                    {
                      marginHorizontal: 0,
                      marginVertical: 0,
                      width: SIZES.width / 1.08,
                    },
                  ]}
                  //arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
                  data={list}
                  //data={labelData.map((item) => console.log(''))}
                  defaultOption={list.filter(
                    (item, index) =>
                      //item?.key == console.log('show lab=>>',releaseData?.Release?.Release_Label) ,
                      item?.key == releaseData?.Release?.Release_Label,
                  )[0]}
                  //defaultOption={{ key: releaseData?.Release?.Release_Label, value: console.log('label value:',list[list.findIndex(x=>x.key==releaseData?.Release?.Release_Label)])  }}
                  // defaultOption={list[] }

                  // placeholder={releaseData?.Release?.Release_Label}
                  //onSelect={() => }
                  dropdownStyles={{
                    backgroundColor: COLORS.gray,
                    marginHorizontal: 0,
                  }}
                />
              )}

              {list.length == 0 && (
                <SelectList data={list}
                  setSelected={setSelected}
                  boxStyles={[
                    styles.artistDropDown,
                    {
                      marginHorizontal: 0,
                      marginVertical: 0,
                      width: SIZES.width / 1.08,
                    },
                  ]}
                />
              )}
            </View>


            {/* Add New Label Button */}

            {/* <TouchableOpacity
              onPress={() => setLoadingLabel(true)}
              style={[styles.addnewBtn, { justifyContent: 'center', alignItems: 'center' }]}
            >
              <Text style={styles.addnewTxt}>Add New</Text>
            </TouchableOpacity> */}
          </View>

        </View>



        {/* Main Genre */}

        <View>
          <Text style={[styles.langTxt, { marginLeft: SIZES.padding2 }]}>Main Genre:</Text>
          <SelectList
            setSelected={setSelected}
            boxStyles={styles.artistDropDown}
            //arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
            data={newMainGenre}
            //defaultOption={}
            defaultOption={{ "key": mainGener, "value": mainGener }}
            //placeholder="Select Maingenre"
            onSelect={() => console.log(selected)}
            //search={false}
            dropdownStyles={{
              backgroundColor: COLORS.gray,
              margin: SIZES.padding * 2,
            }}
          />
        </View>

        {/* Release Type */}

        <View style={{
          paddingLeft: 15
        }}>
          <Text style={styles.langTxt}>Release Type:</Text>
          {isLiked.map((item) => (
            <RadioButton
              onPress={() => onRadioBtnClick(item)}
              selected={item.selected}
              key={item.id}
            >
              {item.name}
            </RadioButton>
          ))}
        </View>



        {/* Price Tiers */}

        <View style={{ marginTop: SIZES.padding }}>
          <Text style={[styles.langTxt, { marginLeft: SIZES.padding2 }]}>Price Tiers:</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SelectList
              setSelected={setSelected}
              boxStyles={[styles.artistDropDown, { width: SIZES.width / 1.3 }]}
              //arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
              data={newMainGenre}
              //defaultOption={}
              defaultOption={{ "key": mainGener, "value": mainGener }}
              //placeholder="Select Maingenre"
              onSelect={() => console.log(selected)}
              //search={false}
              dropdownStyles={{
                backgroundColor: COLORS.gray,
                margin: SIZES.padding * 2,
              }}
            />
            <View>
              <TouchableOpacity
                onPress={() => setShowInfo(true)}
                style={{
                  marginHorizontal: 5
                }}>
                <Image source={icons.infobutton}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: COLORS.primary,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Release Description */}

        <ReleaseInput
          text='Release Description:'
          value={description}
          onChangeText={text => setdescription(text)}
          multiline={false}
          numberOfLines={2}
          maxLength={200}
        />

        {/* Choose Primary Artist  */}

        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                marginHorizontal: SIZES.padding * 1.2,
                marginTop: SIZES.padding * 0.8,
                fontWeight: 'bold',
                fontSize: 16
              }}>
              Choose Primary Artist:
            </Text>
            {/* <TouchableOpacity onPress={() => navigation.navigate('AddNewArtist')}>
              <Text
                style={{
                  marginHorizontal: SIZES.padding * 1.2,
                  marginTop: SIZES.padding * 0.8,
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: COLORS.primary,
                  textDecorationLine: 'underline',
                }}>Add New Artist
              </Text>
            </TouchableOpacity> */}
          </View>
          <View style={{ marginHorizontal: SIZES.padding * 0.5 }}>
            <SelectBox
              label=" "
              options={choosePriArtist}
              //selectedValues={selectedArtistList}
              selectedValues={chooseArt}
              //selectedValues={selectedArtistList}
              onMultiSelect={onMultiChange()}
              onTapClose={onMultiChange()}
              //onChange={onChange()}
              //value={["Juventus","Real Madrid"]}
              isMulti
              hideInputFilter={true}
              //defaultValue={console.log("sfValueArt",selectedArtistList) }
              containerStyle={{
                backgroundColor: COLORS.white,
                //alignItems: 'center',
                width: '95%',
                borderWidth: 1,
                marginLeft: SIZES.padding,
                height: 55,
                borderRadius: 5,
                paddingHorizontal: 10,
                paddingVertical: 30,
              }}

              //inputFilterContainerStyle={{backgroundColor: '#000'}}
              //inputFilterStyle={{fontSize: 21}}
              labelStyle={{
                fontSize: 10,
                // margin: 20
              }}
              optionsLabelStyle={{
                fontSize: 17,
                paddingHorizontal: SIZES.padding * 2
              }}
              optionContainerStyle={{
                backgroundColor: '#fff',
                width: '94%',
                //borderWidth: 1,
                marginLeft: SIZES.padding,
              }}
              multiOptionContainerStyle={{
                backgroundColor: COLORS.primary,
                //marginHorizontal: 0
                //borderWidth: 1,
                //borderColor: 'red'
              }}
              multiOptionsLabelStyle={{
                fontSize: 15,
                fontWeight: 'bold',
              }}
              multiListEmptyLabelStyle={{ fontSize: 15 }}
              listEmptyLabelStyle={{ color: 'red' }}
              //selectedItemStyle={{ color: 'red' }}
              arrowIconColor={COLORS.primary}
              searchIconColor={COLORS.primary}
              toggleIconColor={COLORS.primary}
              listEmptyText='NO ARTIST FOUND'
            />
          </View>

        </View>


        {/* Feature Artist */}

        <ReleaseInput
          text='Feature Artist:'
          value={featureArtist}
          onChangeText={text => setFeatureArtist(text)}
        />

        {/* Composer */}

        <ReleaseInput
          value={composer}
          onChangeText={text => setComposer(text)}
          text='Composer:'
        />

        {/* Arranger */}

        <ReleaseInput
          value={arranger}
          onChangeText={text => setArranger(text)}
          text='Arranger:'
        />
        {/* Conductor */}

        <ReleaseInput
          value={conductor}
          onChangeText={text => setConductor(text)}
          text='Conductor:'
        />

        {/* Release Title */}

        <ReleaseInput
          value={releaseTitle}
          onChangeText={text => setReleaseTitle(text)}
          text='Release Title:'
        />

        {/* ArtWork */}

        <View style={{
          marginHorizontal: SIZES.padding * 1.5,
          marginVertical: SIZES.padding * 1.5
        }}>
          <Text style={styles.langTxt}>Artwork:</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity
              onPress={() => chooseFile('photo')}
              activeOpacity={0.5}
              style={{
                backgroundColor: '#EDEDED',
                padding: 10,
                marginRight: 10,
                borderColor: 'grey',
                borderWidth: 1
              }}>
              <Text>Choose File </Text>
            </TouchableOpacity>
            {/* {chooseFile === null ? <Text>No file choose</Text> : <Text>{filePath.fileName}</Text>} */}
            <Text style={{ marginRight: 60 }}>
              {filePath.fileName == null ? <Text>No file Chosen</Text> : filePath.fileName}
            </Text>
          </View>
        </View>

        {/* Cat number */}

        <ReleaseInput
          value={cat}
          onChangeText={text => setCat(text)}
          text='Cat Number:'
        />

        {/* Sub Genre */}

        <View style={styles.langView}>
          <Text style={styles.langTxt}>Sub Genre:</Text>
          <SelectList
            setSelected={setSelected}
            boxStyles={[styles.artistDropDown, { marginHorizontal: 0, marginVertical: 0 }]}
            //arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
            data={newSubGenre}
            maxHeight={400}
            defaultOption={{ "key": subGener, "value": subGener }}
            //search={false}
            //placeholder="Select subgenre"
            //onSelect={() => console.log(selected)}
            dropdownStyles={{
              backgroundColor: COLORS.gray,
              marginHorizontal: 0,
            }}
          />
        </View>

        {/* Do you Want UPC */}

        <View style={{
          paddingLeft: 15
        }}>
          <Text style={styles.langTxt}>Do you Want UPC:</Text>
          {choose.map((item) => (
            <RadioButton
              onPress={() => onRadioBtnPress(item)}
              selected={item.selected}
              key={item.id}
            >
              {item.name}
            </RadioButton>
          ))}
        </View>

        {onClickYes && <View>
          <ReleaseInput text='UPC/EAN:' />

        </View>}

        {/* Copyrights */}
        <View style={{ marginTop: 10 }}>
          <ReleaseInput
            text='Copyrights:'
            value={copyRights}
            onChangeText={(text) => setCopyRights(text)}
          />
        </View>

        {/* Release Date */}

        <TouchableOpacity
          activeOpacity={1}
          style={styles.langView}
        >
          <Text style={styles.langTxt}>Release Date:</Text>
          <View
            style={{
              // marginVertical: SIZES.padding,
              //paddingLeft: 15,
              borderWidth: 0.4,
              borderColor: 'grey',
              height: 50,
              borderRadius: 5,
              backgroundColor: '#EBEBEB',
              justifyContent: 'center'
            }}
          >

            <DatePicker
              modal
              mode='date'
              open={open}
              date={date}
              placeholder='Select date'
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'

              format='MM/DD/YYYY'
              customStyles={{
                dateIcon: {
                  display: 'none'
                },
                dateInput: {
                  height: 50,
                  //marginTop: 10,
                  borderWidth: 0,
                }
              }}
              onDateChange={(date) => {
                setDate(date);
              }}
              onConfirm={(date) => {
                setOpen(false)
                setDate(date)
              }}
              onCancel={() => {
                setOpen(false)
              }}
            />
          </View>
        </TouchableOpacity>

        <View>
          <Text style={[styles.langTxt, { marginLeft: SIZES.padding * 1.5 }]}>Parental Warning Types:</Text>
          <SelectList
            setSelected={setSelected}
            boxStyles={styles.artistDropDown}
            //arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
            data={data}
            //search={false}
            placeholder="Select"
            onSelect={() => console.log(selected)}
            dropdownStyles={{
              backgroundColor: COLORS.gray,
              marginHorizontal: SIZES.padding * 1.5,
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.nextBtn}
          //onPress={updateDetails}
        onPress={() => navigation.navigate('testing')}
        >
          <Text style={styles.nextTxt}>Next</Text>
        </TouchableOpacity>
      </ScrollView>

      {loadingLabel && (
        <View style={[styles.container, { width: width, height: height }]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: height / 6 }}
            scrollsToTop={false}
            bounces={false}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: SIZES.padding * 1.5,
                justifyContent: 'space-between',
              }}>
              <Text style={styles.newLabel}>Add New Label</Text>
              <TouchableOpacity onPress={() => setLoadingLabel(false)}>
                <Image
                  source={icons.cross}
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: COLORS.white,
                  }}
                />
              </TouchableOpacity>
            </View>
            <Separator />

            <View style={{
              marginVertical: SIZES.padding * 2
            }}>
              <View style={{ paddingLeft: SIZES.padding * 2, marginBottom: 10 }}>
                <Text style={styles.labelTxt}>Label*:</Text>
              </View>
              <View style={{
                marginHorizontal: SIZES.padding * 2,
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <View style={{
                  width: "80%",
                  height: 48,
                  backgroundColor: 'white',
                  borderRadius: 5
                }}>
                  <TextInput
                    style={{
                      width: "100%",
                      height: 50,
                      paddingLeft: 10
                    }}
                    value={label}
                    onChangeText={(text) => setLabel(text)}
                  // onFocus={() => borderColor ? 'black' : 'red'}
                  />
                </View>
                <TouchableOpacity
                  onPress={addLabel}
                  style={styles.addnewBtn}
                >
                  <Text style={styles.addnewTxt}>Save</Text>
                </TouchableOpacity>
              </View>
              <View style={{
                padding: SIZES.padding * 2
              }}>
                <Text style={styles.labelTxt}>Label:</Text>
              </View>
              <Separator />

              {/* Listing New Label */}

              {newLabel.map((item, index) => (
                <ListLabelItem key={index} newLabel={item} />
              ))}
            </View>
          </ScrollView>

        </View>
      )}

      {/* INFO BUTTON */}

      {showInfo && (
        <View style={[styles.container, { width: SIZES.width, height: SIZES.height }]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              padding: SIZES.padding * 4,
              paddingBottom: SIZES.height / 5,
            }}
          >
            <View style={{
              backgroundColor: '#fff',
              borderRadius: 5,
              //margin: 20
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.iTunesTxt}>iTunes Price Tiers</Text>
                <TouchableOpacity onPress={() => setShowInfo(false)}>
                  <Image
                    source={icons.cross}
                    style={{
                      height: 20,
                      width: 20,
                      marginRight: 20,
                    }}

                  />
                </TouchableOpacity>
              </View>
              <View style={{ width: '100%', height: 0.4, backgroundColor: COLORS.gray, marginVertical: 10 }} />
              <View style={{ margin: SIZES.padding * 2 }}>
                <Text>
                  <Text style={{ color: COLORS.primary, fontSize: 18, fontWeight: 'bold' }}>Note: </Text>
                  <Text style={{ color: COLORS.red, fontSize: 15, fontWeight: '500' }}> We recommend leaving the price tier on iTunes either{' '}
                    <Text style={{ color: '#000', textDecorationLine: 'underline', fontWeight: 'bold' }}>blank</Text> and let them auto-select like previously or select the{' '}
                    <Text style={{ color: '#000', textDecorationLine: 'underline', fontWeight: 'bold' }}>back</Text> option.Below you’ll find information regarding price tiers and more about them.
                  </Text>
                </Text>
                <Text style={styles.quesTxt}>{Strings.ques_1}</Text>
                <Text>{Strings.ans_1}</Text>
                <Text style={styles.quesTxt}>{Strings.ques_2}</Text>
                <Text>{Strings.ans_2}</Text>
                <Text style={styles.quesTxt}>{Strings.ques_3}</Text>
                <Text>{Strings.ans_3}</Text>
                <Text style={[styles.quesTxt, { fontStyle: 'italic' }]}>{Strings.ques_4}</Text>
                <Text>{Strings.ans_41}</Text>
                <Text>{Strings.ans_42}</Text>
                <Text>{Strings.ans_43}</Text>
                <Text style={styles.quesTxt}>{Strings.ques_5}</Text>
                <Text>{Strings.ans_5}</Text>
                <Text style={styles.quesTxt}>{Strings.ques_6}</Text>
                <Text>{Strings.ans_6}</Text>
                <Text style={styles.quesTxt}>{Strings.ques_7}</Text>
                <Text>{Strings.ans_71}</Text>
                <Text>{Strings.ans_72}</Text>
                <Text>{Strings.ans_73}</Text>
              </View>
              <View style={{ width: '100%', height: 0.4, backgroundColor: COLORS.gray, marginVertical: 10 }} />
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <TouchableOpacity
                  onPress={() => setShowInfo(false)}

                  //onFocus={console.log('click')}
                  style={{
                    margin: SIZES.padding * 2,
                    width: 70,
                    height: 40,
                    borderColor: 'grey',
                    borderWidth: 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,

                  }}>
                  <Text style={{ color: COLORS.gray }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  )
}

export default ReleaseForm

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  langView: {
    paddingHorizontal: SIZES.padding * 1.5,
    paddingVertical: SIZES.padding * 1.5,
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    //justifyContent: 'center',
    borderWidth: 0.3,
    borderColor: 'grey',
    borderRadius: 5,
    paddingVertical: SIZES.padding * 0.4,
  },
  text: {
    marginVertical: 10,
    fontSize: 17,
  },
  touchableOpacity: {
    //backgroundColor: 'orange',
    alignSelf: 'stretch',
    paddingHorizontal: 10,
    width: '100%'
  },
  langTxt: {
    marginBottom: 9,
    fontSize: 16,
    fontWeight: '600'
  },
  addnewBtn: {
    backgroundColor: COLORS.primary,
    padding: 14,
    marginHorizontal: 8,
    borderRadius: 3,
  },
  addnewTxt: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600'
  },
  nextBtn: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: SIZES.padding * 1.5,
    marginTop: SIZES.padding,
    borderRadius: 7
  },
  nextTxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  separator: {
    marginHorizontal: SIZES.padding2,
    borderBottomColor: '#fff',
    borderBottomWidth: 1.5,
  },
  newLabel: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 25
  },
  iTunesTxt: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: 'bold',
    margin: 20
  },
  quesTxt: {
    marginVertical: SIZES.padding,
    fontSize: 15,
    fontWeight: 'bold'
  },
  artistDropDown: {
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.padding2 * 1.2,
    //marginVertical: SIZES.padding * 0.8,
    paddingVertical: SIZES.padding * 1.5,
    marginVertical: SIZES.padding,
    borderRadius: 5,
    borderColor: COLORS.gray,
    borderWidth: 1
  },
  labelTxt: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold'
  }
})