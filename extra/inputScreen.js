import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native'
import React, {useState} from 'react'


const inputScreen = () => {

const [headline, setHeadline] = useState("dfsd")
const [tip, setTip] = useState("sdsdsdaas")

function showAlert() {
    Alert.alert (
       headline, tip,
        [
            {t: "ok", onPress: ()=>console.log("ok pressed")}
        ]
    )
}

  return (
    <View style={styles.container}>
      <Text>inputScreen</Text>
      <TextInput
            style={styles.textInput}
            //value={headline}
            onChangeText={t => setHeadline(t)}
        />
        <Button
            title='showAlert'
            onPress={showAlert}
        >showAlert</Button>
        
    </View>
  )
}

export default inputScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        height: 50,
        width: 250,
        borderWidth: 1,
        borderColor: 'black',
        textAlign: 'center'

    }
})