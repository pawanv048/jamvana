import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES } from '../Constants/theme';

export const Separator = () => <View style={styles.separator} />

export const CustomInput = (props) => {
  const {
    value,
    onChangeText,
    title,
    keyboardType
  } = props
  const [isActive, setisActive] = useState(false)
  return (
    <View>
      <Text style={styles.titleTxt}>{title}</Text>
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
          onChangeText={onChangeText}
          onFocus={() => setisActive(true)}
          onBlur={() => setisActive(false)}
          {...props}
        />
      </View>
    </View>
  )
};

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