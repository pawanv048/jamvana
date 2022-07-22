import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


const Agreements = ({props}) => {

    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Agreements</Text>
        </View>
    )
}

export default Agreements;


// const styles = StyleSheet.create({})