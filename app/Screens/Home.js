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
import API from '../apis/API';
import moment from 'moment-timezone';
import * as Strings from '../Constants/strings';
import { COLORS, SIZES } from '../Constants/theme';
import axios from 'axios';

const Home = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getAllReleases = async () => {
    try {
      const resp = await fetch(
        'http://84.16.239.66/api/Release/GetAllReleases',
      );
      //console.log('ReleaseId123=', detailsData?.Release_Id);
      const json = await resp.json();
      setData(json.Data);
      // console.log('fetchDetailsUsingReleaseId12=', JSON.stringify(json.Data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // const makeRequest = async () => {
  //   try {
  //     API
  //   } catch (error) {
      
  //   }
  // }

  useEffect(() => {
    getAllReleases();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  function renderHomeReleaseItem({ item }) {
    return (
      <View
        style={{
          flex: 1,
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
    <SafeAreaView style={{ flex: 1, padding: Platform.OS === 'ios' ? 40 : 2 }}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={true}
        keyExtractor={(item) => `${item.Release_Id}`}
        renderItem={renderHomeReleaseItem}
        contentContainerStyle={{ padding: SIZES.padding * 2 }}
      />
    </SafeAreaView>
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