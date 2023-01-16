import React, { useCallback, useEffect, useState } from 'react';
// import ReleaseInput from '../Custom/ReleaseInput';
import { COLORS, SIZES } from '../Constants/theme';
import icons from '../Constants/icons';
import { Picker } from '@react-native-picker/picker';
// import RadioButton from '../Custom/RadioButton';
import ModalPicker from '../Custom/ModalPicker';
// import LabelModalPicker from '../Custom/LabelModalPicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Strings from '../Constants/strings';
import SelectList from 'react-native-dropdown-select-list';
import DatePicker from 'react-native-datepicker';
import { LogBox } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
// import useDetailsData from '../context/useDetailsData';
import { API } from '../apis/API';
import moment from 'moment-timezone';
import Toast from 'react-native-simple-toast';

import { TextButton, ReleaseInput, RadioButton } from '../Custom/CustomComponent';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';


import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
  ScrollView,
  Alert,
  Keyboard
} from 'react-native';

LogBox.ignoreAllLogs();                                                     //Ignore all log notifications
//Import Image Picker

// URLs
const baseURL = 'http://84.16.239.66/api/';

const ReleaseForm = ({ route, navigation }) => {

  //passing data from ReleaseScreen
  const releaseData = route?.params?.data;


  // dropdown data
  const [languageData, setLanguageData] = useState([]);
  const [mainGenreData, setmainGenreData] = useState([]);
  const [subGenreData, setSubGenreData] = useState([]);
  const [priceTierData, setpriceTierData] = useState([]);

  const [loadingLabel, setLoadingLabel] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selected, setSelected] = useState('');
  // console.log('selected dropdown value=>',selected)


  const [primaryArtist, setprimaryArtist] = useState(
    `${releaseData?.Release?.Release_PrimaryArtist || ''}`
  );


  // Release Date
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);


  // storing image path
  const [filePath, setFilePath] = useState({});
  // console.log('FilePath', filePath)

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

  const [lableData, setLableData] = useState([]);

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

  //console.log('releasetype response =>',userReleasetype );

  //console.log('userid=>>',userReleaseId)

  const getUserLableData = async () => {
    //console.log('calling api')
    //GET request
    await fetch(`${baseURL}GetLableByUserId?UserId=${userReleaseId}`, {
      method: 'GET',
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
      maxWidth: SIZES.width / 3.9,
      maxHeight: SIZES.height / 8.44,
      quality: 1,
    };
    //console.log('height=>', options.maxHeight);
    let isStoragePermitted = await requestExternalWritePermission();
    if (isStoragePermitted) {
      try {
        launchImageLibrary(options, (response) => {
          // console.log('Response = ', response);

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

          //console.log(response.assets[0].height);

          // const desiredWidth = '3000px';
          // const desiredHeight = '3000px';
          //console.log(response.assets[0]);
          if (response.assets[0].width >= options.maxWidth && response.assets[0].height >= options.maxHeight) {
            // image has the correct dimensions, proceed with processing the image
            setFilePath(response.assets[0]);

          } else {
            // image does not have the correct dimensions, display an error message or prompt the user to select a different image
            alert("Size of the file should not be less than 3000*3000. Please select a different image.");
          }
          //setFilePath(response.assets[0]);
          // console.log('printresponce=>', response.assets[0]);
        });
      } catch (error) {
        console.log(error)
      }
    }
  };



  // console.log('Calculating size of screen:', SIZES.height);


  // radio button category
  const [onClickYes, setOnClickYes] = useState(false);
  const [choose, setchoose] = useState([
    { id: 1, value: false, name: 'Yes', selected: false },
    { id: 2, value: false, name: 'No', selected: false },
  ]);

  // Parental warning data
  const data = [
    { key: '1', value: 'NotExplicit' },
    { key: '2', value: 'Explicit' },
    { key: '3', value: 'ExplicitContentEdited' },
  ];

  const [isLiked, setIsLiked] = useState([
    { id: 1, value: true, name: 'Release', selected: false },
    { id: 2, value: false, name: 'Album', selected: false },
    { id: 3, value: false, name: 'Mix', selected: false },
  ]);
  let userReleasetype = releaseData?.Release?.Release_ReleaseType;
  const [updateReleaseType, setUpdateReleaseType] = useState(userReleasetype)
  useEffect(() => {
    if (userReleasetype) {
      let updatedState = isLiked.map((isLikedItem) =>
        isLikedItem.name === userReleasetype
          ? { ...isLikedItem, selected: true }
          : { ...isLikedItem, selected: false },
      );
      setIsLiked(updatedState);
      setUpdateReleaseType(userReleasetype);
    }
  }, [userReleasetype]);

  const onRadioBtnClick = (item) => {
    let updatedState = isLiked.map((isLikedItem) =>
      isLikedItem.id === item.id
        ? { ...isLikedItem, selected: true }
        : { ...isLikedItem, selected: false },
    );
    setIsLiked(updatedState);
    setUpdateReleaseType(item.name);
    //console.log('name =>', item.name);
  };

  // radion button items
  const onRadioBtnPress = (item) => {
    let updatedState = choose.map((isLikedItem) =>
      isLikedItem.id === item.id
        ? { ...isLikedItem, selected: true }
        : { ...isLikedItem, selected: false },
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
  //const [newLabel, setNewLabel] = useState([])

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


  const [selectedArtistList, setSelectedArtistList] = useState([]);
  const [dummyData, setDummyData] = useState([]);
  //console.log(dummyData)
  const [prdata, setPrdata] = useState([])

  useEffect(() => {
    if (primaryArtist.length !== 0) {
      var artistNames = primaryArtist;
      var artistList = artistNames.split(',');
      let data12 = [
        ...selectedArtistList,
        ...artistList.map(element => ({ id: element, item: element }))
      ];
      data12 = data12.filter((item, index) => {
        return data12.findIndex(i => i.id === item.id && i.item === item.item) === index;
      });
      setDummyData([...data12, ...prdata.map(items => ({ id: items.Id, item: items.ArtistName }))
      ]);
      setSelectedArtistList(data12);
    } else {
      console.log('ArtistList Else');
    }
  }, [prdata, primaryArtist]);


  // Multiselection Primary Artist List
  function onMultiChange() {
    return item =>
      setSelectedArtistList(xorBy(selectedArtistList, [item], 'id'));
  }

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

  //http://84.16.239.66/api/Release/GetAllPriceTires?UserId=a691efb4-04bc-4349-9ba4-0103abc0de70

  const getAllPriceTires = () => {
    API({
      url: `http://84.16.239.66/api/Release/GetAllPriceTires?UserId=${userReleaseId}`,
      headers: { 'Content-Type': 'application/json' },
      onSuccess: val => {
        // console.log('price tites=>', val.Data)
        //setpriceTierData(val.Data)
      },
      onError: val => console.log('Something went wrong:', val)
    })
  }


  useEffect(() => {
    getLanguageData();
    getMainGenreData();
    getSubGenreData();
    getAllPrimaryArtist();
    getAllPriceTires();
  }, []);


  const newLanguage = languageData.map(item => {
    return { key: item.Id, value: item.Language };
  });
  const newMainGenre = mainGenreData.map(item => {
    return { key: item.MainGenre_Name, value: item.MainGenre_Name };
  });
  //console.log('main data =>',newMainGenre);
  const newSubGenre = subGenreData.map(item => {
    return { key: item.Id, value: item.SubGenre_Name };
  });
  const newpriceTiers = priceTierData.map(item => {
    return { key: item.Release_Id, value: item.Price_Tier };
  });

  //validation hooks
  const [editInput, setEditInput] = useState({
    displayArtist: `${releaseData?.Release?.Release_DisplayArtist}`,
    remixer: `${releaseData?.Release?.Remixer || ''}`,
    orchestra: `${releaseData?.Release?.Orchestra || ''}`,
    actor: `${releaseData?.Release?.Actor || ''}`,
    lyricist: `${releaseData?.Release?.Lyricist || ''}`,
    releasedes: 'Distributed by Jamvana - www.Jamvana.com',
    releasetitle: `${releaseData?.Release?.Release_ReleaseTitle || ''}`,
    releasedate: `${moment(new Date(releaseData?.Release?.Date)).format('DD-MM-YYYY')}`,
    copyright: `${releaseData?.Release?.Copyrights}`,
    featureArtist: `${releaseData?.Release?.Release_FeaturedArtist || ''}`,
    composer: `${releaseData?.Release?.Composer || ''}`,
    arranger: `${releaseData?.Release?.Arranger || ''}`,
    conductor: `${releaseData?.Release?.Conductor || ''}`,
    mainGener: `${releaseData?.Release?.Release_MainGenre || ''}`,
    priceTiers: `${releaseData?.Release?.Price_Tiers || ''}`,
    subGener: `${releaseData?.Release?.Release_SubGenre || ''}`,
    ParentalWarning: `${releaseData?.Release?.ParentalWarning}`,
    catNum: `${releaseData?.Release?.Release_CatNumber}`,
    artwork: `${releaseData?.Release?.Release_Artwork}`,
    upc_ean: `${releaseData?.Release?.Release_UPC}`,
  })

  //console.log('newdate =>',editInput?.releasedate);
  //const newDate = editInput?.releasedate
  //console.log('newDate =>', editInput?.releasedate)

  // FORM VALIDATION
  const [errors, setErrors] = useState({});


  const validatedForm = () => {
    //console.log('validation Button Clicked')
    let isValid = true;
    if (!editInput.displayArtist) {
      handleError('Please Enter Display Artist', 'displayArtist')
      isValid = false;
    }
    if (!editInput.remixer) {
      handleError('Please Enter Remixer', 'remixer')
      isValid = false;
    }
    if (!editInput.orchestra) {
      handleError('Please Enter Orchestra', 'orchestra')
      isValid = false;
    }
    if (!editInput.actor) {
      handleError('Please Enter Actor', 'actor')
      isValid = false;
    }
    if (!editInput.lyricist) {
      handleError('Please Enter Lyricist', 'lyricist')
      isValid = false;
    }
    if (!editInput.catNum) {
      handleError('Please Enter Catnum', 'catnum')
      isValid = false;
    }
    if (!editInput.composer) {
      handleError('Please Enter Composer', 'composer')
      isValid = false;
    }
    if (!editInput.arranger) {
      handleError('Please Enter Arranger', 'arranger')
      isValid = false;
    }
    if (!editInput.conductor) {
      handleError('Please Enter Conductor', 'conductor')
      isValid = false;
    }
    if (!editInput.copyright) {
      handleError('Please Enter Copyright', 'copyright')
      isValid = false;
    }
    if (!editInput.featureArtist) {
      handleError('Please Enter FeatureArtist', 'featureArtist')
      isValid = false;
    }
    if (!editInput.releasetitle) {
      handleError('Please Enter Releasetitle', 'releasetitle')
      isValid = false;
    }
    if (!editInput.releasedes) {
      handleError('Please Enter Release Description', 'releasedes')
      isValid = false;
    }
    if (!editInput.upc_ean) {
      handleError('Please Enter Release UPC/EAN', 'upc_ean')
      isValid = false;
    }
    if (isValid) {
      navigation.navigate('audioTracks', { formData: editInput })
      //navigation.navigate('audioTracks')
      //console.log('check dropdown=>',editInput)
      //console.log(handleSelect())
    }
  }


  //  console.log('dfgfdg =>',editInput)

  //handle user change inputs
  const handleOnChange = (text, editInput) => {
    setEditInput(prevState => ({ ...prevState, [editInput]: text }));
  }

  const handleMainGenerSelect = (selected) => {
    setEditInput({ ...editInput, mainGener: selected });
  }

  const handleSubGenerSelect = (selected) => {
    setEditInput({ ...editInput, subGener: selected });
  }

  // Error Messages
  const handleError = (errorMessage, editInput) => {
    setErrors(prevState => ({ ...prevState, [editInput]: errorMessage }));
  }

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
            defaultOption={{ key: 'English', value: 'English' }}
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
          value={editInput.displayArtist}
          //error='this is the errror'
          error={errors.displayArtist}
          onFocus={() => handleError(null, 'displayArtist')}
          onChangeText={text => handleOnChange(text, 'displayArtist')}
        //onChangeText={text => handleOnChange(text)}
        />

        {/* Remixer */}

        <ReleaseInput
          text='Remixer:'
          value={editInput.remixer}
          error={errors.remixer}
          onFocus={() => handleError(null, 'remixer')}
          onChangeText={text => handleOnChange(text, 'remixer')}
        />
        {/* Orchestra */}

        <ReleaseInput
          text='Orchestra:'
          value={editInput.orchestra}
          error={errors.orchestra}
          onFocus={() => handleError(null, 'orchestra')}
          onChangeText={text => handleOnChange(text, 'orchestra')}
        />

        {/* Actor */}

        <ReleaseInput
          text='Actor:'
          value={editInput.actor}
          error={errors.actor}
          onFocus={() => handleError(null, 'actor')}
          onChangeText={text => handleOnChange(text, 'actor')}
        />

        {/* Lyricist */}

        <ReleaseInput
          value={editInput.lyricist}
          text='Lyricist:'
          error={errors.lyricist}
          onFocus={() => handleError(null, 'lyricist')}
          onChangeText={text => handleOnChange(text, 'lyricist')}
        //errorMessage={Toast.show('This is a long toast.', Toast.LONG)}
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
                  //defaultOption={list[]}
                  //placeholder={releaseData?.Release?.Release_Label}
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
            setSelected={handleMainGenerSelect}
            boxStyles={styles.artistDropDown}
            //arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
            data={newMainGenre}
            save="value"
            //defaultOption={}
            defaultOption={{ key: editInput.mainGener, value: editInput.mainGener }}
            //placeholder="Select Maingenre"
            //onSelect={handleSelect}
            //search={false}
            dropdownStyles={{
              backgroundColor: COLORS.gray,
              margin: SIZES.padding * 2,
            }}
          />
        </View>

        {/* Sub Genre */}

        <View style={styles.langView}>
          <Text style={styles.langTxt}>Sub Genre:</Text>
          <SelectList
            setSelected={handleSubGenerSelect}
            boxStyles={[styles.artistDropDown, { marginHorizontal: 0, marginVertical: 0 }]}
            //arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
            data={newSubGenre}
            maxHeight={400}
            defaultOption={{ key: editInput.subGener, value: editInput.subGener }}
            //search={false}
            //placeholder="Select subgenre"
            //onSelect={() => console.log(selected)}
            dropdownStyles={{
              backgroundColor: COLORS.gray,
              marginHorizontal: 0,
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
              data={newpriceTiers}
              //defaultOption={}
              defaultOption={{ key: editInput.priceTiers, value: editInput.priceTiers }}
              //placeholder="Select Maingenre"
              onSelect={() => console.log(selected)}

              //search={false}
              dropdownStyles={{
                backgroundColor: COLORS.gray,
                margin: SIZES.padding * 2,

              }}
            />

            <View style={{ position: 'absolute', right: 30, top: 22 }}>
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
          value={editInput.releasedes}
          error={errors.releasedes}
          onFocus={() => handleError(null, 'releasedes')}
          onChangeText={text => handleOnChange(text, 'releasedes')}
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
              //options={selectedArtistList}
              options={dummyData}
              selectedValues={selectedArtistList}
              //options={choosePriArtist}
              //selectedValues={chooseArt}
              onMultiSelect={onMultiChange()}
              onTapClose={onMultiChange()}
              //onChange={onChange()}
              //value={["Juventus","Real Madrid"]}
              isMulti
              hideInputFilter={true}
              //sdefaultValue={choosePriArtist}
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
          value={editInput.featureArtist}
          error={errors.featureArtist}
          onFocus={() => handleError(null, 'featureArtist')}
          onChangeText={text => handleOnChange(text, 'featureArtist')}
        />

        {/* Composer */}

        <ReleaseInput
          value={editInput.composer}
          text='Composer:'
          error={errors.composer}
          onFocus={() => handleError(null, 'composer')}
          onChangeText={text => handleOnChange(text, 'composer')}
        />

        {/* Arranger */}

        <ReleaseInput
          text='Arranger:'
          value={editInput.arranger}
          error={errors.arranger}
          onFocus={() => handleError(null, 'arranger')}
          onChangeText={text => handleOnChange(text, 'arranger')}
        />
        {/* Conductor */}

        <ReleaseInput
          value={editInput.conductor}
          text='Conductor:'
          error={errors.conductor}
          onFocus={() => handleError(null, 'conductor')}
          onChangeText={text => handleOnChange(text, 'conductor')}
        />

        {/* Release Title */}

        <ReleaseInput
          value={editInput.releasetitle}
          text='Release Title:'
          error={errors.releasetitle}
          onFocus={() => handleError(null, 'releasetitle')}
          onChangeText={text => handleOnChange(text, 'releasetitle')}
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
            {/* {filePath.fileName === null ? <Text>No file choose</Text> : <Text>{filePath.fileName}</Text>} */}
            <Text style={{ marginRight: 60 }}>
              {
                filePath.fileName == null
                  ? (
                    <Text
                      ellipsizeMode='middle'
                      numberOfLines={1}
                    >
                      
                      {editInput.artwork.length > 20 ? `${editInput.artwork.substring(0, 20)}...` : editInput.artwork}
                    </Text>
                  )
                  : filePath.fileName
              }
            </Text>
          </View>
        </View>

        {/* Cat number */}

        <ReleaseInput
          value={editInput.catNum}
          onFocus={() => handleError(null, 'catNum')}
          error={errors.catNum}
          onChangeText={text => handleOnChange(text, 'catNum')}
          text='Cat Number:'
        />



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
          <ReleaseInput text='UPC/EAN:'
            value={editInput.upc_ean}
            //error='this is the errror'
            error={errors.upc_ean}
            onFocus={() => handleError(null, 'upc_ean')}
            onChangeText={text => handleOnChange(text, 'upc_ean')}
          />

        </View>}

        {/* Copyrights */}
        <View style={{ marginTop: 10 }}>
          <ReleaseInput
            value={editInput.copyright}
            text='Copyrights:'
            error={errors.copyright}
            onFocus={() => handleError(null, 'copyright')}
            onChangeText={(text) => handleOnChange(text, 'copyright')}
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
              //marginVertical: SIZES.padding,
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
              date={editInput.releasedate}
              placeholder='Select date'
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              format='DD-MM-YYYY'
              customStyles={{
                dateIcon: {
                  display: 'none'
                },
                dateInput: {
                  height: 100,
                  //marginTop: 10,
                  borderWidth: 0,
                }
              }}
              onDateChange={(date) => {
                setEditInput({
                  ...editInput,
                  releasedate : date
                });
              }}
              onConfirm={(date) => {
                setOpen(false)
                setEditInput({
                  ...editInput,
                  releasedate : date
                });
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
            defaultOption={{ key: editInput.ParentalWarning, value: editInput.ParentalWarning }}
            placeholder="Select"
            onSelect={() => console.log(selected)}
            dropdownStyles={{
              backgroundColor: COLORS.gray,
              marginHorizontal: SIZES.padding * 1.5,
            }}
          />
        </View>
        <TextButton
          //onPress={() => navigation.navigate('testing')}
          onPress={validatedForm}
          //onPress={showAlert}
          //onPress={() => navigation.navigate('audioTracks')}
          label='Next'
        // contentContainerStyle={styles.nextBtn}
        // labelStyle={styles.nextTxt}
        />
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

              {/* {newLabel.map((item, index) => (
                <ListLabelItem key={index} newLabel={item} />
              ))} */}
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