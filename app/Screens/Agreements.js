import React, { useState, useEffect } from 'react';
import API from '../apis/API';
import * as Strings from '../Constants/strings';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Linking
} from 'react-native';

const Agreements = () => {

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getAgreementsData = () => {
    console.log('calling api')
    API({
      url: 'http://84.16.239.66/api/Agreements',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

      onSuccess: val => {
        setData(val?.Data)
        // console.log('Agreement data ==>', val?.Data)
      },
      onError: val => console.log('ERROR:', val),
    });
    setLoading(false);
  }


//   async function makerequest({index}) {

//     const pdf = data.map(function (name) {
//       return name.Userid;
//     });
//     console.log(pdf);

//     try {
//         //console.log('Button clicked')
//         const res = await fetch(`https://musicdistributionsystem.com/members/Agreements/Agreement_${pdf[index]}.pdf`)
//         //error handling
//         if(!res.ok){
//             throw Error(res.statusText)
//         }
//         console.log(res)
//         const data = await res.text()
//         console.log("pddfffff....",data)
//         //set data here
//     } catch (error) {
//         console.log(error)
//     }

// }

  useEffect(() => {
    getAgreementsData();  
  },[]);



  function renderAgreementsList() {

    // const pdf = data.map(function (name) {
    //   return name.Userid;
    // })

    const pdf = data.map(({Userid}) => Userid)
    // console.log('fjdlkfjd', pdf)

    const renderItem = ({ item, index }) => {

      if (isLoading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
            <ActivityIndicator />
          </View>
        );
      }

      return (
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          alignItems: 'center',
          marginTop: 15,
          backgroundColor: 'lightgrey',
          marginHorizontal: 10,
          height: 50,
          borderRadius: 8
        }}>
          <View style={{ width: 150 }}>
            <Text
              style={{
                fontSize: 15
              }}
              ellipsizeMode="tail" numberOfLines={1}>{item.UserName}
            </Text>
          </View>
          <Text>
            {item.StripePlan === "0" ? 'Free' : item.StripePlan === "1" ? '$9.99' : item.StripePlan === "2" ? '$19.99' : item.StripePlan}
          </Text>
          <TouchableOpacity style={{
            backgroundColor: '#8D8DAA',
            padding: 8,
            borderRadius: 4
          }}
            //Linking.openURL(`https://musicdistributionsystem.com/members/Agreements/Agreement_${pdf[index]}.pdf`)
            //onPress={()=> console.log('pdf data=....',pdf[index])}
            
            onPress={() => Linking.openURL(`https://musicdistributionsystem.com/members/Agreements/Agreement_${pdf[index]}.pdf`)}
          >
            <Text>{Strings.t46}</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View>
        <FlatList
          data={data}
          keyExtractor={item => `${item.Userid}`}
          renderItem={renderItem}
        />
      </View>
    )
  }


  return (
    <SafeAreaView>
      {renderAgreementsList()}
    </SafeAreaView>
  )
}

export default Agreements;

const styles = StyleSheet.create({})