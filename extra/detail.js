// import React, {useEffect, useState} from 'react';
// import {
//   ActivityIndicator,
//   FlatList,
//   Text,
//   View,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Modal,
//   TextInput,
//   Alert,
//   KeyboardAvoidingView,
// } from 'react-native';
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// export default App = ({route}) => {
//   const detailsData = route.params.data;
//   const IMAGE_PATH = `https://musicdistributionsystem.com/Release/${detailsData?.Release_Artwork}`;
//   //console.log('show image',IMAGE_PATH)
//   //console.log(route.params.data)
//   const [isLoading, setLoading] = useState(true);
//   const [data, setData] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [text, setText] = useState(
//     '\nStatus: true',
//     //'Release Id: ' + detailsData.Release_Id + '\n Status: true, \ncomment: ',
//   );
//   const [txt, setTxt] = useState('Release Id: ' + detailsData.Release_Id);

//   const [headline, setHeadline] = useState('');

//   //Get Data
//   const getRelease = async () => {
//     try {
//       const resp = await fetch(
//         `http://84.16.239.66/api/Release/GetReleasesDetails?ReleaseId=${detailsData?.Release_Id}`,
//       );

//       //console.log('ReleaseId=', detailsData?.Release_Id);

//       const json = await resp.json();
//       setData(json.Data);
//       console.log('fetchDetailsUsingReleaseId=', JSON.stringify(json.Data));
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getRelease();
//     // postUser();
//   }, []);

//   //http://84.16.239.66/api/ReleaseUpdate/PublishRelease
//   const postUser = (status, comment) => {
//     const requestOptions = {
//       method: 'POST',
//       headers: {
//         ReleaseId: detailsData?.Release_Id,
//         Status: status,
//         Comment: `${comment}`,
//       },
//     };

//     fetch(
//       'http://84.16.239.66/api/ReleaseUpdate/PublishRelease',
//       requestOptions,
//     )
//       .then(response => response.json())
//       .then(json => {
//         console.log('Fetch API Response', json);
//         Alert.alert(
//           'Release Id: ' +
//             detailsData.Release_Id +
//             `\n status : ${status}` +
//             '\n' +
//             'comment : ' +
//             comment,
//           [{t: 'ok', onPress: () => console.log('ok pressed')}],
//         );
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };
//   //http://84.16.239.66/api/ReleaseUpdate/DeleteRelease

//   const deleteUser = () => {
//     const requestOptions = {
//       method: 'POST',
//       body: {
//         ReleaseId: detailsData?.Release_Id,
//       },
//     };

//     fetch(
//       `http://84.16.239.66/api/ReleaseUpdate/DeleteRelease?ReleaseId=${detailsData?.Release_Id}`,
//       requestOptions,
//     )
//       .then(response => {
//         console.log('DeleteResponse=', response.ok);
//         console.log('DeleteResponseData=', JSON.stringify(response));
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };

//   {
//     /*Release header*/
//   }

//   const ListHeader = () => {
//     function showAlert() {
//       Alert.alert(
//         'Release Id: ' +
//           detailsData.Release_Id +
//           '\n status : false' +
//           '\n' +
//           headline,
//         [{t: 'ok', onPress: () => console.log('ok pressed')}],
//       );
//     }

//     //View to set in Header
//     return (
//       <React.Fragment>
//         <View style={styles.releaseContainer}>
//           <View>
//             <Image
//               source={{uri: IMAGE_PATH}}
//               style={{
//                 width: 150,
//                 height: 150,
//                 resizeMode: 'contain',
//                 margin: 8,
//                 marginBottom: 3,
//               }}
//             />
//             {/* User Feedback */}

//             <ModalFunction
//               animationType="slide"
//               showModal={showModal}
//               setShowModal={setShowModal}
//               headline={headline}
//               setHeadline={setHeadline}
//               onPress={(s, c) => postUser(s, c)}
//             />

//             <TouchableOpacity
//               style={styles.accept}
//               onPress={() =>
//                 Alert.alert(
//                   'Your release is approved and will send to DSP’s Soon',
//                   text,
//                 )
//               }
//               //onPress={(s) => postUser(s)}
//             >
//               <Text style={{color: 'white', fontSize: 16}}>Approve</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.Reject}
//               onPress={() => setShowModal(!showModal)}>
//               <Text style={{color: 'white', fontSize: 18}}>Reject</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.delete}
//               onPress={() => deleteUser()}>
//               <Text style={{color: 'white', fontSize: 18}}>Delete</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Release Data */}

//           <View
//             style={{
//               paddingLeft: 10,
//               paddingRight: 10,
//               paddingBottom: 10,
//               marginVertical: 10,
//             }}>
//             <Text style={{fontSize: 18}}>
//               Release Id: {route.params.data.Release_Id}
//             </Text>
//             <Text style={{fontSize: 18}}>
//               Release_PrimaryArtist: {route.params.data.Release_PrimaryArtist}
//             </Text>
//             <Text style={{fontSize: 18}}>
//               Release_Label: {route.params.data.Release_Label}
//             </Text>
//             <Text style={{fontSize: 18}}>
//               Release_PrimaryArtist: {route.params.data.Release_PrimaryArtist}
//             </Text>
//           </View>
//         </View>
//       </React.Fragment>
//     );
//   };

//   return (
//     <React.Fragment>
//       <KeyboardAvoidingView>
//         {isLoading ? (
//           <View
//             style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//             <ActivityIndicator />
//           </View>
//         ) : (
//           // Track Disk data
//           <FlatList
//             contentContainerStyle={{padding: 20}}
//             ListHeaderComponent={ListHeader}
//             ListFooterComponent={<View style={{height: 20}}></View>}
//             data={data}
//             renderItem={({item}) => (
//               <View>
//                 <View style={styles.trackContainer}>
//                   <Text>Track Artist : {item.Tracks.Track_Artist} </Text>
//                   <Text>
//                     Track DisplayArtist: {item.Tracks.Track_DisplayArtist}
//                   </Text>
//                   <Text>Track Title : {item.Tracks.Track_Title}</Text>
//                   <Text>Track MixVersion: {item.Tracks.Track_MainGenre}</Text>
//                   <Text>Track MainGenre : {item.Tracks.Track_MainGenre} </Text>
//                   <Text>Track SubGenre : {item.Tracks.Track_SubGenre} </Text>
//                   <Text>Track ISRC: {item.Tracks.Track_ISRC}</Text>
//                   <Text>
//                     Track FeaturedArtist: {item.Tracks.Track_FeaturedArtist}
//                   </Text>
//                 </View>
//               </View>
//             )}
//           />
//         )}
//       </KeyboardAvoidingView>
//     </React.Fragment>
//   );
// };

// const ModalFunction = ({showModal, setShowModal, onPress}) => {
//   const [headline, setHeadline] = useState('');
//   return (
//     <Modal
//       animationType={'slide'}
//       transparent={true}
//       visible={showModal}
//       //onRequestClose={() => showModal(false)}
//     >
//       <View style={{alignItems: 'center', top: 300}}>
//         <View style={styles.modalView}>
//           <TextInput
//             //value={headline}
//             style={styles.input}
//             placeholder="Enter comment"
//             onChangeText={t => setHeadline(t)}
//           />
//           <TouchableOpacity
//             style={{
//               backgroundColor: '#371B58',
//               left: 80,
//               top: 47,
//               borderRadius: 10,
//             }}
//             onPress={() => onPress(false, headline)}>
//             <Text
//               style={{
//                 color: 'white',
//                 padding: 15,
//                 paddingLeft: 20,
//                 paddingRight: 20,
//               }}>
//               Save
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={{backgroundColor: '#371B58', borderRadius: 10}}
//             onPress={() => {
//               setShowModal(!showModal);
//             }}>
//             <Text style={{color: 'white', padding: 15}}>Dismiss</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   releaseContainer: {
//     backgroundColor: '#D3DEDC',
//   },
//   trackContainer: {
//     backgroundColor: '#D3DEDC',
//     padding: 10,
//     marginTop: 20,
//   },
//   accept: {
//     position: 'absolute',
//     right: 30,
//     top: 10,
//     backgroundColor: '#383838',
//     padding: 15,
//     borderRadius: 8,
//   },
//   Reject: {
//     position: 'absolute',
//     right: 30,
//     top: 65,
//     backgroundColor: '#383838',
//     padding: 20,
//     paddingTop: 15,
//     paddingBottom: 15,
//     borderRadius: 8,
//   },
//   delete: {
//     position: 'absolute',
//     backgroundColor: '#383838',
//     top: 122,
//     right: 30,
//     padding: 20,
//     paddingBottom: 15,
//     paddingTop: 15,
//     borderRadius: 8,
//   },
//   modalView: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     width: '80%',
//     height: '60%',
//     borderColor: '#F5DF99',
//     borderWidth: 2,
//     borderRadius: 20,
//   },
//   input: {
//     height: '30%',
//     width: '70%',
//     borderWidth: 1,
//     textAlign: 'left',
//     paddingLeft: 10,
//     borderRadius: 5,
//   },
// });

