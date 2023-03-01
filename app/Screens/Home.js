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
import moment from 'moment-timezone';
import { API } from '../apis/API';
import * as Strings from '../Constants/strings';
import { COLORS, SIZES } from '../Constants/theme';


const API_ALLRELEASE_URL = 'http://84.16.239.66/api/Release/GetAllReleases';
// const pageSize = 10;

const Home = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  //const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  //const [total, setTotal] = useState(0);
  //const [currentPage, setCurrentPage] = useState(0);

  const getAllReleases = () => {
    //console.log('calling api')
    API({
      url: `${API_ALLRELEASE_URL}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

      onSuccess: val => {
        setData(val?.Data)
        //setTotal(val?.Data.total)
        //console.log('Agreement data ==>', val?.Data)
        setLoading(false)
      },
      onError: val => console.log('ERROR:', val),
    });
    setLoading(true);
  }

  // const handleLoadMore = () => {
  //   if (!isLoading && data.length < total) {
  //     setPage(page + 1);
  //   }
  // };

  // const handleLoadMore = () => {
  //   setCurrentPage(currentPage + 1);
  //   };

  //   const currentData = data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);


  useEffect(() => {
    getAllReleases();
  }, []);


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  };



  function renderHomeReleaseItem({ item, index }) {
    //console.log('index =>', index, item.Release_Id);
    return (
      <View
        style={{
          //flex: 1,
          padding: 24,
          backgroundColor: '#1B1A17',
          marginBottom: 10,
          borderRadius: 15,
          overflow: 'hidden',  
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
      keyExtractor={item => item.Release_Id}
      renderItem={renderHomeReleaseItem}
      contentContainerStyle={{ padding: SIZES.padding * 2 }}
      removeClippedSubviews={true}
      // onEndReached={handleLoadMore}
      // onEndReachedThreshold={0.5}
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
