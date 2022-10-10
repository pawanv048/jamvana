import React, { useState } from 'react';
import ReleaseInput from '../Custom/ReleaseInput';
import { COLORS, SIZES } from '../Constants/theme';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import icons from '../Constants/icons';
import { Picker } from '@react-native-picker/picker';
import RadioButton from '../Custom/RadioButton';
import ModalPicker from '../Custom/ModalPicker';
import LabelModalPicker from '../Custom/LabelModalPicker';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Button,
} from 'react-native';

const ReleaseForm = ({ navigation }) => {

  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectLabel, setSelectLabel] = useState('ITEM_1')
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isModalLabelVisible, setisModalLabelVisible] = useState(false);
  const [value, onChangeText] = useState('');
  const [description, setdescription] = useState('Distributed by Jamvana - www.Jamvana.com')


  // radion button liked category
  const [isLiked, setIsLiked] = useState([
    { id: 1, value: true, name: "Release", selected: false },
    { id: 2, value: false, name: "Album", selected: false },
    { id: 3, value: false, name: "Mix", selected: false }
  ]);

  // radio button category
  const [choose, setchoose] = useState([
    { id: 1, value: false, name: "Yes", selected: false },
    { id: 2, value: false, name: "No", selected: false },
  ]);


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
  };


  return (
    <View style={styles.mainContainer}>
      <ScrollView>

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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View style={styles.pickerContainer}>
              <TouchableOpacity
                onPress={() => changeModalVisibility(true)}
                style={styles.touchableOpacity}
              >
                <Text style={styles.text}>{selectLabel}</Text>
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
            <TouchableOpacity style={styles.addnewBtn}>
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

        {/* Release Date */}

        <View style={styles.langView}>
          <Text style={styles.langTxt}>Release Date:</Text>
          <View
            style={{
              marginVertical: SIZES.padding,
              paddingLeft: 20,
              borderWidth: 0.4,
              borderColor: 'grey',
              height: 50,
              borderRadius: 5,
              backgroundColor: '#EBEBEB'
            }}
          >
            <TextInput style={{
              width: '80%',
              height: 50,
              //backgroundColor: 'red'
            }} />
          </View>
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
            <TouchableOpacity style={{
              marginHorizontal: 10
            }}>
              <Image source={icons.infobutton}
                style={{
                  height: 15,
                  width: 15,
                  tintColor: COLORS.primary
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

        {/* Release Description */}

        <ReleaseInput
          text='Choose Primary Artist:'
          placeholder='Select Some Option'
          multiline={true}
          numberOfLines={2}
          maxLength={200}
        />


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

        {/* ArtWrok */}

        <View style={{
          marginHorizontal: SIZES.padding * 1.5,
          marginVertical: SIZES.padding * 1.5
        }}>
          <Text style={styles.langTxt}>ArtWrok:</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity style={{
              backgroundColor: 'grey',
              padding: 10,
              marginRight: 10
            }}>
              <Text>Choose File</Text>
            </TouchableOpacity>
            <Text>No File Choosen</Text>
          </View>
        </View>

        {/* Sub Genre */}

        <View style={styles.langView}>
          <Text style={styles.langTxt}>Sub Genre:</Text>
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
                //backgroundColor: 'red',
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
        </View>

        {/* Release Type */}

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

        {/* Cat Number */}

        <ReleaseInput
          text='Cat Number:'
        />


        {/* Copyrights */}

        <ReleaseInput
          text='Copyrights:'
        />

        {/* Parent Genre */}

        <View style={styles.langView}>
          <Text style={styles.langTxt}>Parental Warning Types:</Text>
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
                //backgroundColor: 'red',
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
        </View>
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => navigation.navigate('audioTracks')}
        >
          <Text style={styles.nextTxt}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
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
    marginHorizontal: SIZES.padding * 2,
    borderRadius: 7
  },
  nextTxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }

})