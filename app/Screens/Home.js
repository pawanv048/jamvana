import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
//library to format date
import API from '../apis/API';
import moment from 'moment-timezone';


const Home = ({navigation, route}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  //***fetching through api */

  // const getAllReleases = () => {
  //   API({
  //     url: 'http://84.16.239.66/api/Release/GetAllReleases',
  //     onSuccess: val => {
  //       setData(val?.Data)
  //     },
  //     onError: val => console.log('ERROR:', val),
  //   });
  //     setLoading(false);
  // };

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

  useEffect(() => {
    getAllReleases();
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator/>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, padding: Platform.OS === 'ios' ? 40 : 2}}>
      
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          style={{flex: 1, margin: 10, marginHorizontal: 20}}
          keyExtractor={({Release_Id}) => Release_Id}
          renderItem={({item}) => (
            <View
              style={{
                flex: 1,
                padding: 24,
                backgroundColor: '#1B1A17',
                marginBottom: 10,
                borderRadius: 15,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Detail', {data: item})}
                >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    //fontFamily: 'Roboto-Italic',
                  }}>
                  Release Title : {item.Release_ReleaseTitle}
                  {'\n'}
                  {'\n'}
                  Release Artist : {item.Release_PrimaryArtist}
                  {'\n'}
                  {'\n'}
                  Release Date: {moment(new Date(item?.Release_ReleaseDate)).format("DD-MM-YYYY")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      
    </SafeAreaView>
  );
};

export default Home;


// {isLoading ? (
//   <View style={{ alignItems: 'center', justifyContent: 'center'}}>
//     <ActivityIndicator size="small" color='black' />
//   </View>
// ) : (

// )}


