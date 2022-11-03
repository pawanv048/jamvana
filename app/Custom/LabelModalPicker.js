import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

const LABELDATA = ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4', 'ITEM_5', 'ITEM_6']
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const LabelModalPicker = (props) => {

    const onPressItem = (label) => {
        props.changeLabelModalVisibility(false),
        props.setLabelData(label)
    }
    const label = LABELDATA.map((item, index) => {
        return (
            <TouchableOpacity
                style={styles.label}
                key={index}
                onPress={() => console.log(item)}
            >
                <Text style={styles.text}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    })

    return (
        <TouchableOpacity
        onPress={() => props.changeLabelModalVisibility(false)}
            style={styles.container}
        >
            <View style={[styles.modal, { width: WIDTH - 20, height: HEIGHT / 2 }]}>
                <ScrollView>
                    {label}
                </ScrollView>
            </View>
        </TouchableOpacity>
    )
}

export default LabelModalPicker

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 10
    },
    label: {
        alignItems: 'flex-start'
    },
    text: {
        margin: 15,
        fontSize: 15,
        fontWeight: 'bold'
    }
})
