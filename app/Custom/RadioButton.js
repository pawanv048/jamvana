import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../Constants/theme';


const RadioButton = ({ onPress, selected, children }) => {
    console.log('selected', selected)
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

export default RadioButton

const styles = StyleSheet.create({
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
        marginLeft: 16,
        
     }
})