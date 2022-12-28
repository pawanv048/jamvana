import React, { useEffect, useState, useRef } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StyleSheet,

} from 'react-native';
import {API} from '../apis/API';
import moment from 'moment-timezone';
import * as Strings from '../Constants/strings';
import { COLORS, SIZES } from '../Constants/theme';


const API_ALLRELEASE_URL = 'http://84.16.239.66/api/Release/GetAllReleases';

const Home = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);


  const getAllReleases = () => {
    //console.log('calling api')
    API({
      url: `${API_ALLRELEASE_URL}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

      onSuccess: val => {
        setData(val?.Data)
         //console.log('Agreement data ==>', val?.Data)
        setLoading(false)
      },
      onError: val => console.log('ERROR:', val),
    });
    setLoading(true);
  }



  useEffect(() => {
    getAllReleases();
  }, []);


  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size='large'/> 
      </View>
    );
  }



  function renderHomeReleaseItem({ item }) {
    return (
      <View
        style={{
          //flex: 1,
          padding: 24,
          backgroundColor: '#1B1A17',
          marginBottom: 10,
          borderRadius: 15,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Detail', { data: item })}
        >
          <Text style={styles.releaseTxt}>{Strings.t1} {item.Release_ReleaseTitle}</Text>
          <Text style={[styles.releaseTxt, { marginVertical: SIZES.padding * 2 }]}>{Strings.t2} {item.Release_PrimaryArtist}</Text>
          <Text style={styles.releaseTxt}>{Strings.t3} {moment(new Date(item?.Release_ReleaseDate)).format("DD-MM-YYYY")}</Text>
        </TouchableOpacity>
      </View>
    )
  };

  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={true}
      keyExtractor={(item) => `${item.Release_Id}`}
      renderItem={renderHomeReleaseItem}
      contentContainerStyle={{ padding: SIZES.padding * 2}}
      
    />
  );
};

export default Home;


const styles = StyleSheet.create({
  releaseTxt: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '600',
  }
})








