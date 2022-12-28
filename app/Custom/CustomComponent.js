import { StyleSheet, Text, View, TextInput, Animated } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES } from '../Constants/theme';
import { Controller } from "react-hook-form";
import Toast from 'react-native-simple-toast';

export const Separator = () => <View style={styles.separator} />

export const CustomInput = (props) => {
  const {
    title,
    keyboardType,
    control,
    name,
    rules = {}        // choice if you want to see the rules on particular field or not.
  } = props
  const [isActive, setisActive] = useState(false);
  return (
    <View>
      <Text style={styles.titleTxt}>{title}</Text>

      <Controller
        
        control={control}
        name={name}
        defaultValue=''
        
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <View style={{
              borderWidth: 1.5,
              borderColor: isActive ? COLORS.primary : COLORS.black,
              borderRadius: 5,
              height: 50,
              justifyContent: 'center',
              marginVertical: SIZES.padding * 1,
              backgroundColor: COLORS.white,
              //alignItems: 'center'
              paddingLeft: 10
            }}>
              <TextInput
                autoCapitalize='none'
                keyboardType={keyboardType}
                value={value}
                onChangeText={onChange}
                onFocus={() => setisActive(true)}
                onBlur={() => setisActive(false)}
                {...props}
              />
            </View>
            {error && (
              // <Text style={{ color: 'red', alignSelf: 'stretch' }}>{error.message || 'Error'}</Text>
              Toast.show(error.message || 'Error', Toast.SHORT)
            )}
          </>
        )}
      />

    </View>
  )
};


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
  }
})

const CustomComponent = { Separator, CustomInput };

export default CustomComponent;