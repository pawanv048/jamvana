import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, Animated } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES } from '../Constants/theme';
import SelectList from 'react-native-dropdown-select-list';
import { Controller } from "react-hook-form";
import Toast from 'react-native-simple-toast';




export const Separator = () => <View style={styles.separator} />

export const TextButton = ({
  contentContainerStyle,
  disabled,
  label,
  labelStyle,
  onPress
}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        padding: 15,
        marginHorizontal: SIZES.padding * 1.5,
        marginVertical: SIZES.padding,
        borderRadius: 7,
        ...contentContainerStyle                      //pass style on customcomonent
      }}
      disabled={disabled}
      onPress={onPress}
    >
      <Text
        style={{
          color: COLORS.white,
          fontSize: 20,
          fontWeight: 'bold',
          ...labelStyle                               ////pass style on customcomonent
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  )
};


// RELEASE FORM INPUT

export const ReleaseInput = props => {
  const [isFocus, setIsFocus] = React.useState(false)

  const {
    text,
    value,
    onChangeText = () => { },
    placeholder,
    multiline,
    maxLength,
    numberOfLines,
    labelContainer,
    title,
    ContainerStyle,
    releaseInputMainContainerStyle,
    onFocus = () => { },
    error
  } = props

  function renderReleaseForm() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.padding * 1.5,
          marginVertical: SIZES.padding * 0.5,
          ...releaseInputMainContainerStyle,
          // backgroundColor: 'red' 
        }}>
        <Text
          style={{
            marginBottom: 9,
            fontSize: 16,
            fontWeight: '600',
            ...labelContainer
          }}>{text}</Text>
        <View
          style={{
            width: '100%',
            height: 50,
            backgroundColor: '#fff',
            borderWidth: 0.3,
            borderColor: 'grey',
            //marginHorizontal: 20,
            borderRadius: 5,
            justifyContent: 'center',
            paddingLeft: SIZES.padding * 1.6,
            ...ContainerStyle,
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
          }}>
          <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            style={styles.inputTxt}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            multiline={multiline}
            maxLength={maxLength}
            numberOfLines={numberOfLines}
            onFocus={() => {
              onFocus();
              setIsFocus(true)
            }}
            onBlur={() => {
              setIsFocus(false)
            }}
          />
        </View>
        {error && (
          <Text style={{ color: 'red' }}>{error}</Text>
        )}

      </View>
    )
  };

  return (
    <View>
      {renderReleaseForm()}
    </View>
  )
}


// RADIO BUTTON

export const RadioButton = ({ onPress, selected, children }) => {
  //console.log('select button',selected)
  return (
    <View style={styles.radioButtonContainer}>
      <TouchableOpacity onPress={onPress} style={styles.radioButton}>
        {selected ? <View style={styles.radioButtonIcon} /> : null}
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.radioButtonText}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};



// DropDown box

export const DropdownPicker = ({
  label,
  data,
  defaultOption,
  labelContainer,
  setSelected = () => {}
}) => {

  // const [selected, setSelected] = useState('')
  return (
    <View>
      <Text
        style={{
          marginBottom: 9,
          fontSize: 16,
          fontWeight: '800',
          marginVertical: SIZES.padding,
          marginLeft: SIZES.padding2,
          color: COLORS.white,
          ...labelContainer
        }}>{label}</Text>
      <SelectList
        setSelected={setSelected}
        defaultOption={defaultOption}
        boxStyles={{
          backgroundColor: '#fff',
          marginHorizontal: SIZES.padding2,
          //marginVertical: SIZES.padding * 0.8,
          paddingVertical: SIZES.padding * 1.5,
        }}
        data={data}
        save="value"
        //onSelect={() => console.log(selected)}
        dropdownStyles={{
          backgroundColor: 'white',
          marginHorizontal: SIZES.padding * 2,
        }}
      />
    </View>
  )
};





export const CustomActivityIndicator = () => {
  const [spinValue] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={{
      flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    }}>
      <Animated.View style={[styles.circle, { transform: [{ rotate: spin }] }]} />
    </View>
  );
};








{/* <View>
  <Text style={styles.artistTxt}>Choose Remixer:</Text>
  <SelectList
    setSelected={setSelected}
    boxStyles={styles.artistDropDown}
    data={data}
    onSelect={() => alert(selected)}
    dropdownStyles={{
      backgroundColor: 'white',
      marginHorizontal: SIZES.padding * 2,
    }}
  />
</View> 

 artistDropDown: {
    backgroundColor: '#fff',
    marginHorizontal: SIZES.padding2,
    //marginVertical: SIZES.padding * 0.8,
    paddingVertical: SIZES.padding * 1.5,
  },
  artistTxt: {
    marginBottom: 9,
    fontSize: 16,
    fontWeight: '800',
    marginVertical: SIZES.padding,
    marginLeft: SIZES.padding2,
    color: COLORS.white,
  },

*/}



// export const CustomInput = (props) => {
//   const {
//     title,
//     keyboardType,
//     control,
//     name,
//     rules = {}        // choice if you want to see the rules on particular field or not.
//   } = props
//   const [isActive, setisActive] = useState(false);
//   return (
//     <View>
//       <Text style={styles.titleTxt}>{title}</Text>

//       <Controller

//         control={control}
//         name={name}
//         defaultValue=''

//         rules={rules}
//         render={({ field: { onChange, value }, fieldState: { error } }) => (
//           <>
//             <View style={{
//               borderWidth: 1.5,
//               borderColor: isActive ? COLORS.primary : COLORS.black,
//               borderRadius: 5,
//               height: 50,
//               justifyContent: 'center',
//               marginVertical: SIZES.padding * 1,
//               backgroundColor: COLORS.white,
//               //alignItems: 'center'
//               paddingLeft: 10
//             }}>
//               <TextInput
//                 autoCapitalize='none'
//                 keyboardType={keyboardType}
//                 value={value}
//                 onChangeText={onChange}
//                 onFocus={() => setisActive(true)}
//                 onBlur={() => setisActive(false)}
//                 {...props}
//               />
//             </View>
//             {error && (
//               // <Text style={{ color: 'red', alignSelf: 'stretch' }}>{error.message || 'Error'}</Text>
//               Toast.show(error.message || 'Error', Toast.SHORT)
//             )}
//           </>
//         )}
//       />

//     </View>
//   )
// };


// export const CustomBar = ({ step, steps, height }) => {
//   const [width, setWidth] = React.useState(0)
//   const animatedValue = React.useRef(new Animated.Value(-1000)).current
//   const reactive = React.useRef(new Animated.Value(-1000)).current

//   React.useEffect(() => {
//     Animated.timing(animatedValue, {
//       toValue: reactive,
//       duration: 300,
//       useNativeDriver: true
//     }).start();
//   }, [])

//   React.useEffect(() => {
//     reactive.setValue(-width + (width * step) / steps)
//   }, [step, width])

//   return (
//     <>

//       <View
//         onLayout={(e) => {
//           const newWidth = e.nativeEvent.layout.width;
//           setWidth(newWidth)
//         }}
//         style={{
//           height,
//           backgroundColor: 'rgba(0,0,0,0.1)',
//           //backgroundColor: 'red',
//           borderRadius: height,
//           overflow: 'hidden',
//         }}>
//         <Animated.View
//           style={{
//             height,
//             width: '100%',
//             borderRadius: height,
//             //backgroundColor: 'blue',
//             backgroundColor: 'rgba(0,0,0,0.5)',
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             transform: [
//               {
//                 translateX: animatedValue
//               }
//             ]
//           }} />
//       </View>
//     </>
//   )
// }


// export const Rose = ()=> {
//   return(
//     <View>
//       <Text>custom compoente</Text>
//     </View>
//   )
// }

const styles = StyleSheet.create({

  separator: {
    marginHorizontal: SIZES.padding2,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  titleTxt: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 0.3,
    borderColor: 'grey',
    //marginHorizontal: 20,
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
    height: 50,

  },
  formTxt: {
    marginBottom: 9,
    fontSize: 16,
    fontWeight: '600',

  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 45
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    alignItems: "center",
    justifyContent: "center"
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: COLORS.primary
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 16
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue'
  }
})

const CustomComponent = { Separator, TextButton, ReleaseInput, RadioButton, DropdownPicker, CustomActivityIndicator };

export default CustomComponent;