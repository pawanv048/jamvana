import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Separator, CustomInput } from '../Custom/CustomComponent';
import { COLORS, SIZES } from '../Constants/theme';
import RadioButton from '../Custom/RadioButton';
import * as Strings from '../Constants/strings';

import { useForm } from "react-hook-form";



const AddNewArtist = ({navigation}) => {

  const { control, handleSubmit, formState: { error } } = useForm();
  console.log(error)

  // radio button category
  const [onClickYes, setOnClickYes] = useState(false)
  const [isActive, setisActive] = useState(false)
  const [choose, setchoose] = useState([
    { id: 1, value: false, name: `${Strings.ylink}`, selected: false },
    { id: 2, value: false, name: `${Strings.nlink}`, selected: false },
  ]);

  const [onYes, setonYes] = useState(false)
  const [selected, setselected] = useState([
    { id: 1, value: false, name: `${Strings.ylink}`, selected: false },
    { id: 2, value: false, name: `${Strings.nlink}`, selected: false },
  ]);

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

  // radion button items
  const onRadioBtnPressed = (item) => {
    let updatedState = selected.map((isLikedItem) =>
      isLikedItem.id === item.id
        ? { ...isLikedItem, selected: true }
        : { ...isLikedItem, selected: false }
    );
    setselected(updatedState);
    if (item.id === 1) {
      setonYes(true)
    } else {
      setonYes(false)
    }
  };

  function renderAllArtist() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('artistDetails')}
          style={{
            backgroundColor: COLORS.black,
            padding: 20,
            borderRadius: 10,
            margin: SIZES.padding * 3,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: COLORS.white,
          }}>View All Artists</Text>
        </TouchableOpacity>
        <Separator />
      </View>
    )
  };

  function renderNewArtistForm() {
    return (
      <View style={{ marginHorizontal: SIZES.padding * 2 }}>
        <View>
          <Text style={styles.newArtistTxt}>Add New Artist</Text>
          <Text style={styles.artistDetailTxt}>{Strings.artist_detail}</Text>
        </View>
        <View style={{ marginVertical: SIZES.padding * 3 }}>
          <CustomInput
            control={control}
            title='Artist Name'
            name='artistname'
            keyboardType='default'
            rules={{ required: 'Please Enter Artist Name' }}
          />
          <CustomInput
            control={control}
            title='Email:'
            name="Email"
            keyboardType='email-address'
          //rules={{required: 'Please Input Email'}}
          />
          <CustomInput
            control={control}
            title='Soundcloud:'
            name="Soundcloud"
            keyboardType='default'
          />
          <CustomInput
            control={control}
            title='Twitter:'
            name="Twitter"
            keyboardType='url'
          />
          <CustomInput
            control={control}
            title='Facebook:'
            name="Facebook"
            keyboardType='url'
          />
          <CustomInput
            control={control}
            title='Instagram:'
            name="Instagram"
            keyboardType='url'
          />
          <CustomInput
            control={control}
            title='YouTube:'
            name="YouTube"
            keyboardType='url'
          />
          <CustomInput
            control={control}
            title='Bandcamp:'
            name="Bandcamp"
            keyboardType='url'
          />
          <CustomInput
            control={control}
            title='Website:'
            name="Website"
            keyboardType='url'
          />
        </View>
      </View>
    )
  };

  function renderArtistPage() {
    return (
      <View>
        <View style={{ marginHorizontal: SIZES.padding * 2 }}>
          <Text style={styles.newArtistTxt}>Spotify Artist Page</Text>
          <Text style={{ marginVertical: SIZES.padding * 0.8, fontWeight: 'bold' }}>Is this artist on Spotify already ?</Text>

          <View style={{
            paddingLeft: 15,
            //backgroundColor: 'red',
            //marginVertical: SIZES.padding * 2,
            //paddingVertical: SIZES.padding * 2,
            //height: 200
          }}>
            {choose.map((item, index) => (
              <RadioButton
                onPress={() => onRadioBtnPress(item)}
                selected={item.selected}
                key={item.id}
              >
                <View style={{ marginBottom: 30, justifyContent: 'center' }}>
                  <Text style={{ fontWeight: 'bold' }}>{index == 0 ? item.name : ""}</Text>
                </View>
                <View>
                  <Text style={{ fontWeight: 'bold' }}>{index == 1 ? item.name : ""}</Text>
                </View>

              </RadioButton>
            ))}

            {onClickYes && <View>
              <View>
                <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Spotify Artist Link</Text>
                <View
                  style={[styles.artistlink, {
                    shadowColor: isActive ? '#CFE7F7' : 'white',
                    shadowOpacity: isActive ? 1 : 0,
                    shadowRadius: isActive ? 15 : 0,
                    borderColor: isActive ? '#CFE7F7' : 'black',
                    borderWidth: isActive ? 2 : 0
                  }]}
                >
                  <TextInput style={{ backgroundColor: 'white', width: '60%' }}
                    onFocus={() => setisActive(true)}
                    onBlur={() => setisActive(false)}
                    placeholder='Enter Artist Link'
                    autoCapitalize={false}
                    autoCorrect={false}
                  />
                  <TouchableOpacity activeOpacity={0.7} style={styles.verifybtn}>
                    <Text style={{ color: 'white' }}>Verify Artist link</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <Text style={styles.spotifyTxt}>In Spotify App / Browser</Text>
                  <Text>1) Find your artist page</Text>
                  <Text>2) Click the three dots</Text>
                  <Text>
                    3) Press <Text style={{ fontWeight: 'bold' }}>{Strings.artistlink}</Text>
                  </Text>
                  <Text>4) Paste link above</Text>
                  <Text>5) Click
                    <Text style={{ fontWeight: 'bold' }}> Verify Artist Link</Text>
                  </Text>
                </View>
              </View>
            </View>}

          </View>
        </View>
      </View>
    )
  };



  function renderAppleArtistPage() {
    return (
      <View>
        <View style={{ marginHorizontal: SIZES.padding * 2 }}>
          <Text style={styles.newArtistTxt}>Apple Artist Page</Text>
          <Text style={{ marginVertical: SIZES.padding * 0.8, fontWeight: 'bold' }}>Is this artist on Apple already ?</Text>

          <View style={{
            paddingLeft: 15,
            //backgroundColor: 'red',
            //marginVertical: SIZES.padding * 2,
            //paddingVertical: SIZES.padding * 2,
            //height: 200
          }}>
            {selected.map((item, index) => (
              <RadioButton
                onPress={() => onRadioBtnPressed(item)}
                selected={item.selected}
                key={item.id}
              >
                <View style={{ marginBottom: 30, justifyContent: 'center' }}>
                  <Text style={{ fontWeight: 'bold' }}>{index == 0 ? item.name : ""}</Text>
                </View>
                <View>
                  <Text style={{ fontWeight: 'bold' }}>{index == 1 ? item.name : ""}</Text>
                </View>

              </RadioButton>
            ))}

            {onYes && <View>
              <View>
                <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Apple Artist Link</Text>
                <View
                  style={[styles.artistlink, {
                    shadowColor: isActive ? '#CFE7F7' : 'white',
                    shadowOpacity: isActive ? 1 : 0,
                    shadowRadius: isActive ? 15 : 0,
                    borderColor: isActive ? '#CFE7F7' : 'black',
                    borderWidth: isActive ? 2 : 0
                  }]}
                >
                  <TextInput style={{ backgroundColor: 'white', width: '60%' }}
                    onFocus={() => setisActive(true)}
                    //onBlur={() => setisActive(false)}
                    placeholder='Enter Artist Link'
                    autoCapitalize={false}
                    autoCorrect={false}
                  />
                  <TouchableOpacity activeOpacity={0.7} style={styles.verifybtn}>
                    <Text style={{ color: 'white' }}>Verify Artist link</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <Text style={styles.spotifyTxt}>In Apple Music App</Text>
                  <Text>1) Find your artist page</Text>
                  <Text>2) Click the three dots</Text>
                  <Text>
                    3) Press <Text style={{ fontWeight: 'bold' }}>{Strings.shareartist}</Text>
                  </Text>
                  <Text>4) Paste link Above</Text>
                  <Text>5) Click
                    <Text style={{ fontWeight: 'bold' }}> Verify Artist Link</Text>
                  </Text>
                </View>

                <View>
                  <Text style={styles.spotifyTxt}>In Browser</Text>
                  <Text>1) Find your artist page</Text>
                  <Text>2) Copy the URL</Text>
                  <Text>4) Paste the link above</Text>
                  <Text>5) Click
                    <Text style={{ fontWeight: 'bold' }}> Verify Artist Link</Text>
                  </Text>
                </View>
              </View>
            </View>}

          </View>
        </View>
      </View>
    )
  };

  const onSaveArtistPressed = data => {
    console.log(data);
  }

  function renderSaveBtn() {
    return (
      <View style={{ marginVertical: SIZES.padding * 2 }}>
        <TouchableOpacity onPress={handleSubmit(onSaveArtistPressed)} style={styles.saveBtn} activeOpacity={0.4}>
          <Text style={styles.saveTxt}>Save Artist</Text>
        </TouchableOpacity>
      </View>
    )
  };

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false} contentContainerStyle={{ paddingBottom: 50 }}>
        {renderAllArtist()}
        {renderNewArtistForm()}
        {renderArtistPage()}
        {renderAppleArtistPage()}
        {renderSaveBtn()}
      </ScrollView>
    </View>
  )
}

export default AddNewArtist

const styles = StyleSheet.create({
  newArtistTxt: {
    fontSize: 30,
    marginVertical: SIZES.padding,
    color: COLORS.black,
    fontWeight: 'bold'
  },
  artistDetailTxt: {
    color: COLORS.primary,
    //fontSize: 14
  },
  artistlink: {
    marginVertical: SIZES.padding * 2,
    backgroundColor: 'white',
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  verifybtn: {
    backgroundColor: COLORS.black,
    padding: 15
  },
  spotifyTxt: {
    color: COLORS.primary,
    marginVertical: SIZES.padding * 2,
    fontSize: 15
  },
  saveBtn: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: SIZES.padding * 1.5,
    marginTop: SIZES.padding,
    borderRadius: 7
  },
  saveTxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
})