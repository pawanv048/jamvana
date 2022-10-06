import React, { useState } from 'react'
import useDetailsData from '../context/useDetailsData';
import moment from 'moment-timezone';
import * as Strings from '../Constants/strings';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Alert, 
  Modal, 
  TextInput, 
  ScrollView 
} from 'react-native';

const ReleaseScreen = () => {

  const { data, setData } = useDetailsData();
  const [showModal, setShowModal] = useState(false)
  const [headline, setHeadline] = useState('')
  

  const postUser = (status,comment) => {
    
    const requestOptions = {
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({
        "ReleaseId": data[0]?.Release?.Release_Id,
        "Status": status,
         "Comment": `${comment}`
      }),
      
    };

    fetch(
      'http://84.16.239.66/api/PublishRelease',
      requestOptions,
    )
      .then(response => response.json())
      .then(json => {
        console.log('Fetch API Response', json);
        Alert.alert(
          'Release Id: ' +
          data[0]?.Release?.Release_Id +
          `\n status : ${status}`
          +'\n'+
          
          // 'comment : ' +
           comment,
          [{ t: 'ok', onPress: () => console.log('ok pressed') }],
        );
      })
      .catch(error => {
        console.error(error);
      });
  };



  return (
    <React.Fragment>
      <ScrollView style={{margin: 15}}>
        <View style={{ flex: 1 }}>
          <View style={{ margin: 15 }}>
            <Text>{Strings.t4} {data[0]?.Release?.Release_Id}</Text>
            <Text>{Strings.t5} {data[0]?.Release?.Release_PrimaryArtist}</Text>
            <Text>{Strings.t6} "{data[0]?.Release?.Release_DisplayArtist}"</Text>
            <Text>{Strings.t7} "{data[0]?.Release?.Release_ReleaseTitle}"</Text>
            <Text>{Strings.t8}"{data[0]?.Release?.Release_Label}"</Text>
            <Text>{Strings.t9}"{data[0]?.Release?.Release_MainGenre}"</Text>
            <Text>{Strings.t10}"{data[0]?.Release?.Release_SubGenre}"</Text>
            <Text>{Strings.t11}"{moment(new Date(data[0]?.Release?.Date)).format('DD-MM-YYYY')}"</Text>
            <Text>{Strings.t12}"{data[0]?.Release?.Release_ReleaseType}"</Text>
            <Text>{Strings.t13}"{data[0]?.Release?.Composer}"</Text>
            <Text>{Strings.t14}"{data[0]?.Release?.Orchestra}"</Text>
            <Text>{Strings.t15}"{data[0]?.Release?.Arranger}"</Text>
            <Text>{Strings.t16}"{data[0]?.Release?.Actor}"</Text>
            <Text>{Strings.t17}"{data[0]?.Release?.Lyricist}"</Text>
            <Text>{Strings.t18} "{data[0]?.Release?.Checked}"</Text>
            <Text>{Strings.t19}"{data[0]?.Release?.LanguageCode}"</Text>
          </View>
          <View style={styles.releaseBtn}>
            <TouchableOpacity
              style={styles.accept}
                onPress={() => postUser(
                 true,
                 " "
                )}  
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>{Strings.t20}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.reject}
              onPress={() => setShowModal(!showModal)}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>{Strings.t21}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.delete}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>{Strings.t22}</Text>
            </TouchableOpacity>
          </View>
          {/* User Feedback */}

          <ModalFunction
            animationType="slide"
            showModal={showModal}
            setShowModal={setShowModal}
            headline={headline}
            setHeadline={setHeadline}
            onPress={(s, c) => postUser(s, c)}
          />
        </View>
      </ScrollView>
    </React.Fragment>
  )

}


const ModalFunction = ({ showModal, setShowModal, onPress }) => {
  const [headline, setHeadline] = useState(" ");
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={showModal}
    onRequestClose={() => showModal(false)}
    >
      <View style={{ alignItems: 'center', top: 300 }}>
        <View style={styles.modalView}>
          <TextInput
            //value={headline}
            style={styles.input}
            placeholder="Enter comment"
            onChangeText={t => setHeadline(t)}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#371B58',
              left: 80,
              top: 47,
              borderRadius: 10,
            }}
            onPress={() => onPress(false, "comment: "+headline)}
          
          >
            <Text
              style={{
                color: 'white',
                padding: 15,
                paddingLeft: 20,
                paddingRight: 20,
              }}>
              {Strings.t41}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: '#371B58', borderRadius: 10, marginStart: -40 }}
            onPress={() => {
              setShowModal(!showModal);
            }}>
            <Text style={{ color: 'white', padding: 15,  }}>{Strings.t42}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ReleaseScreen

const styles = StyleSheet.create({

  releaseBtn: {
    flexDirection: 'column',
    //margin: 15,
    //backgroundColor: 'red', 
    justifyContent: 'space-evenly',
    alignItems: 'flex-start'
  },
  accept: {
    //paddingLeft: 20,
    backgroundColor: '#383838',
    padding: 16,
    marginLeft: 12,
    borderRadius: 10
  },
  reject: {
    padding: 18,
    paddingLeft: 20,
    paddingRight: 24,
    marginTop: 10,
    marginLeft: 15,
    backgroundColor: '#383838',
    borderRadius: 10
  },
  delete: {
    padding: 18,
    paddingRight: 26,
    marginLeft: 15,
    marginTop: 10,
    backgroundColor: '#383838',
    borderRadius: 10
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '80%',
    height: '60%',
    borderColor: '#F5DF99',
    borderWidth: 2,
    borderRadius: 20,
  },
  input: {
    height: '20%',
    width: '75%',
    borderWidth: 1,
    textAlign: 'left',
    paddingLeft: 10,
    borderRadius: 5,
  },
})
