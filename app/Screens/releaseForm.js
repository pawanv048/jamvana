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



import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
const PRIMARY_ARTIST = [
  {
    item: 'Juventus',
    id: 'JUVE',
  },
  {
    item: 'Real Madrid',
    id: 'RM',
  },
  {
    item: 'Barcelona',
    id: 'BR',
  },
  {
    item: 'PSG',
    id: 'PSG',
  },
  {
    item: 'FC Bayern Munich',
    id: 'FBM',
  },
  {
    item: 'Manchester United FC',
    id: 'MUN',
  },
  {
    item: 'Manchester City FC',
    id: 'MCI',
  },
  {
    item: 'Everton FC',
    id: 'EVE',
  },
  {
    item: 'Tottenham Hotspur FC',
    id: 'TOT',
  },
  {
    item: 'Chelsea FC',
    id: 'CHE',
  },
  {
    item: 'Liverpool FC',
    id: 'LIV',
  },
  {
    item: 'Arsenal FC',
    id: 'ARS',
  },

  {
    item: 'Leicester City FC',
    id: 'LEI',
  },
]


//import DatePicker from 'react-native-date-picker';  // Need to use this further


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
  Alert
} from 'react-native';

LogBox.ignoreAllLogs();//Ignore all log notifications
//Import Image Picker

const ReleaseForm = ({ navigation }) => {

  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectLabel, setSelectLabel] = useState('ITEM_1')
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isModalLabelVisible, setisModalLabelVisible] = useState(false);
  const [value, onChangeText] = useState('');
  const [description, setdescription] = useState('Distributed by Jamvana - www.Jamvana.com')
  const [loadingLabel, setLoadingLabel] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [selected, setSelected] = useState('');
  const [selectedSubGenre, setSelectedSubGenre] = useState('');

  //choose primary artist
  const [selectedTeams, setSelectedTeams] = useState([])
  function onMultiChange() {
    return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
  }

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
          console.log('base64 -> ', response.base64);
          console.log('uri -> ', response.uri);
          console.log('width -> ', response.width);
          console.log('height -> ', response.height);
          console.log('fileSize -> ', response.fileSize);
          console.log('type -> ', response.type);
          console.log('fileName -> ', response.fileName);
          setFilePath(response.assets[0]);
        });
      } catch (error) {
        console.log(error)
      }
    }
  };


  const { width, height } = useWindowDimensions();

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

  // SubGene data
  const subGenedata = [
    { key: '1', value: 'Acapellas' },
    { key: '2', value: '2 Step' },
    { key: '3', value: 'Acid' },
  ];

  // Parental warning data
  const data = [
    { key: '1', value: 'NotExplicit' },
    { key: '2', value: 'Explicit' },
    { key: '3', value: 'ExplicitContentEdited' },
  ];

  const changeModalVisibility = (bool) => {
    setisModalVisible(bool)
  }

  // Set data from list
  const setData = (option) => {
    setSelectedLanguage(option)
  }

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

  // const saveValueFunction = () => {
  //   // Function to save the value in AsyncStorage
  //   if (label) {
  //     // To check the input not empty
  //     AsyncStorage.setItem('KeyString', label);
  //     // Setting a data to a AsyncStorage with respect to a key
  //     setLabel('');
  //     // Resetting the TextInput
  //     alert('Data Saved');
  //     // Alert to confirm
  //   } else {
  //     alert('Please fill data');
  //   }
  // };

  // useEffect(() => {
  //   addLabel()
  // }, [])

  // // get remixer from user device.
  // const getLabelFromUserDevice = async () => {
  //   try {
  //     const newLabel = await AsyncStorage.getItem('KeyString');
  //     if (newLabel != null) {
  //       setNewLabel(JSON.parse(newLabel));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

  // adding new label input

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


  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Language */}

        <View style={styles.langView}>
          <Text style={styles.langTxt}>Language:</Text>
          <View style={styles.pickerContainer}>
            <TouchableOpacity
              onPress={() => changeModalVisibility(true)}
              style={styles.touchableOpacity}
            >
              <Text style={styles.text}>{selectedLanguage}</Text>
            </TouchableOpacity>
            <Modal
              transparent={true}
              animationType='fade'
              visible={isModalVisible}
              onRequestClose={() => changeModalVisibility(false)}
            >
              <ModalPicker
                changeModalVisibility={changeModalVisibility}
                setData={setData}
              />
            </Modal>
            <TouchableOpacity
              onPress={() => changeModalVisibility(true)}
              style={{
                position: 'absolute',
                right: 10,
                //backgroundColor: 'red',
                top: 20,
              }}>
              <Image source={icons.downarrow}
                style={{
                  width: 10,
                  height: 10,
                  resizeMode: 'contain'
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Display Artists */}
        <ReleaseInput
          text='Display Artists (optional):'
          value={value}
          onChangeText={text => onChangeText(text)}
        />

        {/* Remixer */}

        <ReleaseInput
          text='Remixer:'
        />
        {/* Orchestra */}

        <ReleaseInput
          text='Orchestra:'
        />

        {/* Actor */}

        <ReleaseInput
          text='Actor:'
        />

        {/* Lyricist */}

        <ReleaseInput
          text='Lyricist:'
        />

        {/* Lable */}

        <View style={styles.langView}>
          <Text style={styles.langTxt}>Lable:</Text>
          <View style={{
            flexDirection: 'row',
            //justifyContent: 'space-between',
            //paddingHorizontal: 40,
            alignItems: 'center',
            // backgroundColor: 'red'
          }}>
            <View>
              <SelectList
                setSelected={setLabel}
                boxStyles={[styles.artistDropDown, { marginHorizontal: 0, marginVertical: 0, width: width / 1.55 }]}
                //arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
                data={newLabel.map((item) => item.task)}
                placeholder="Select"
                onSelect={() => console.log(selected)}
                dropdownStyles={{
                  backgroundColor: COLORS.gray,
                  marginHorizontal: 0,
                }}
              />
            </View>
            {/* Add New Label Button */}

            <TouchableOpacity
              onPress={() => setLoadingLabel(true)}
              style={[styles.addnewBtn, { justifyContent: 'center', alignItems: 'center' }]}
            >
              <Text style={styles.addnewTxt}>Add New</Text>
            </TouchableOpacity>
          </View>

        </View>



        {/* Main Genre */}

        <View style={styles.langView}>
          <Text style={styles.langTxt}>Main Genre:</Text>
          <View style={styles.pickerContainer}>
            <TouchableOpacity
              onPress={() => changeModalVisibility(true)}
              style={styles.touchableOpacity}
            >
              <Text style={styles.text}>{selectedLanguage}</Text>
            </TouchableOpacity>
            <Modal
              transparent={true}
              animationType='fade'
              visible={isModalVisible}
              nRequestClose={() => changeModalVisibility(false)}
            >
              <ModalPicker
                changeModalVisibility={changeModalVisibility}
                setData={setData}
              />
            </Modal>
          </View>
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

        <View style={styles.langView}>
          <Text style={styles.langTxt}>Price Tiers: (for itunes on v)</Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>

            <View style={styles.pickerContainer}>
              <TouchableOpacity
                onPress={() => changeModalVisibility(true)}
                style={styles.touchableOpacity}
              >
                <Text style={styles.text}>{selectedLanguage}</Text>
              </TouchableOpacity>
              <Modal
                transparent={true}
                animationType='fade'
                visible={isModalVisible}
                nRequestClose={() => changeModalVisibility(false)}
              >
                <ModalPicker
                  changeModalVisibility={changeModalVisibility}
                  setData={setData}
                />
              </Modal>
              <TouchableOpacity
                onPress={() => changeModalVisibility(true)}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 20
                }}>
                <Image source={icons.downarrow}
                  style={{
                    width: 10,
                    height: 10,
                  }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => setShowInfo(true)}
              style={{
                marginHorizontal: 10
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
          <View style={{marginHorizontal: SIZES.padding * 0.5}}>
            <SelectBox
              label=" "
              options={PRIMARY_ARTIST}
              selectedValues={selectedTeams}
              onMultiSelect={onMultiChange()}
              onTapClose={onMultiChange()}
              isMulti
              hideInputFilter={true}
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

        />

        {/* Composer */}

        <ReleaseInput
          text='Composer:'
        />

        {/* Arranger */}

        <ReleaseInput
          text='Arranger:'
        />
        {/* Conductor */}

        <ReleaseInput
          text='Conductor:'
        />

        {/* Release Title */}

        <ReleaseInput
          text='Release Title:'
        />

        {/* ArtWork */}

        <View style={{
          marginHorizontal: SIZES.padding * 1.5,
          marginVertical: SIZES.padding * 1.5
        }}>
          <Text style={styles.langTxt}>ArtWork:</Text>
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

        {/* Sub Genre */}

        <View style={styles.langView}>
          <Text style={styles.langTxt}>Sub Genre:</Text>
          <SelectList
            setSelected={setSelectedSubGenre}
            boxStyles={[styles.artistDropDown, { marginHorizontal: 0, marginVertical: 0 }]}
            //arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
            data={subGenedata}
            placeholder="Select"
            onSelect={() => console.log(selected)}
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
          />
        </View>

        {/* Release Date */}

        <TouchableOpacity style={styles.langView}>
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
          // onPress={() => navigation.navigate('audioTracks')}
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
        <View style={[styles.container, { width: width, height: height }]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              padding: SIZES.padding * 4,
              paddingBottom: height / 5,
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