import React from 'react';
import { StyleSheet, Text, View, TextInput, Platform } from 'react-native';
import { SIZES } from '../Constants/theme';

const AudioTrackInput = props => {
   const {
      text,
      value,
      onChangeText,
      placeholder,
      multiline,
      maxLength,
      numberOfLines,
      selected
   } = props

   function renderAudioForm() {
      return (
         <View
            style={{
               marginHorizontal: SIZES.padding * 1.5,
               marginVertical: SIZES.padding * 0.5
            }}>
            <Text style={styles.formTxt}>{text}</Text>
            <View style={styles.input}>
               <TextInput
                  style={styles.inputTxt}
                  value={value}
                  onChangeText={onChangeText}
                  placeholder={placeholder}
                  multiline={multiline}
                  maxLength={maxLength}
                  numberOfLines={numberOfLines}
               />
               {selected? <View>heoo</View> : null}
            </View>
         </View>
      )
   };

   return (
      <View>
         {renderAudioForm()}
      </View>
   )
}

export default AudioTrackInput;

const styles = StyleSheet.create({
   input: {
      width: '100%',
      height: 50,
      backgroundColor: '#fff',
      borderWidth: 0.3,
      borderColor: 'grey',
      borderRadius: 5,
      justifyContent: 'center',
      paddingLeft: SIZES.padding * 1.6,
      ...Platform.select({
         shadowColor: "#000",
         shadowOffset: {
            width: 0,
            height: 2,
         },
         shadowOpacity: 0.25,
         shadowRadius: 3.84,
         elevation: 5,
      })
   },
   inputTxt: {
      height: 50
   },
   formTxt: {
      marginBottom: 9,
      fontSize: 16,
      fontWeight: '800',
      color: '#fff'
   }
})
