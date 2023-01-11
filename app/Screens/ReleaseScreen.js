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

const ReleaseScreen = ({ navigation }) => {

  const { data, setData } = useDetailsData();
  const [releaseData, setreleaseData] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [headline, setHeadline] = useState('')


  const postUser = (status, comment) => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
          + '\n' +

          comment,
          [{ t: 'ok', onPress: () => console.log('ok pressed') }],
          
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  function getReleaseItem() {
    return (
      <View>
        <Text>{Strings.t4} {data[0]?.Release?.Release_Id}</Text>
        <Text>{Strings.t5} {data[0]?.Release?.Release_PrimaryArtist}</Text>
        <Text>{Strings.t6} {data[0]?.Release?.Release_DisplayArtist}</Text>
        <Text>{Strings.t7} {data[0]?.Release?.Release_ReleaseTitle}</Text>
        <Text>{Strings.t8} {data[0]?.Release?.Release_Label}</Text>
        <Text>{Strings.t9} {data[0]?.Release?.Release_MainGenre}</Text>
        <Text>{Strings.t10} {data[0]?.Release?.Release_SubGenre}</Text>
        <Text>{Strings.t11} {moment(new Date(data[0]?.Release?.Date)).format('DD-MM-YYYY')}</Text>
        <Text>{Strings.t12} {data[0]?.Release?.Release_ReleaseType}</Text>
        <Text>Featured Artist: {data[0]?.Release?.Release_FeaturedArtist}</Text>
        <Text>{Strings.t13} {data[0]?.Release?.Composer}</Text>
        <Text>{Strings.t14} {data[0]?.Release?.Orchestra}</Text>
        <Text>Price Tiers: {data[0]?.Release?.Price_Tiers}</Text>
        <Text>{Strings.t15} {data[0]?.Release?.Arranger}</Text>
        <Text>{Strings.t16} {data[0]?.Release?.Actor}</Text>
        <Text>{Strings.t17} {data[0]?.Release?.Lyricist}</Text>
        <Text>{Strings.t18}  {data[0]?.Release?.Checked}</Text>
        <Text>{Strings.t19} {data[0]?.Release?.LanguageCode}</Text>
        <Text>Parental warning {data[0]?.Release?.ParentalWarning}</Text>
      </View>
    )
  };

  function renderFooter() {
    return (
      <View style={styles.releaseBtn}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => postUser(true, " ")}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{Strings.t20}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => setShowModal(!showModal)}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{Strings.t21}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{Strings.t22}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate('releaseForm', { data: data[0] })}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Edit</Text>
        </TouchableOpacity>
      </View>
    )
  };


  return (
    <ScrollView style={{ margin: 15 }}>
      <View >
        {getReleaseItem()}
        {renderFooter()}
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
            onPress={() => onPress(false, "comment: " + headline)}

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
            <Text style={{ color: 'white', padding: 15, }}>{Strings.t42}</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

export default ReleaseScreen

const styles = StyleSheet.create({

  releaseBtn: {
    //flexDirection: 'column',
    //justifyContent: 'space-evenly',
    //alignItems: 'flex-start'
    //backgroundColor: 'blue',
    padding: 10,
    paddingLeft: 0
  },
  actionBtn: {
    backgroundColor: '#383838',
    padding: 16,
    //marginLeft: 12,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10
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
