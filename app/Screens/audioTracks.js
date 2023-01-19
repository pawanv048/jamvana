import React, { useState, useEffect } from 'react';
import { COLORS, SIZES } from '../Constants/theme';
import {
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   TextInput,
   useWindowDimensions,
   ScrollView,
   Image,
   FlatList,
   Alert,

} from 'react-native';


import icons from '../Constants/icons';
import { RadioButton } from '../Custom/CustomComponent';
import * as Strings from '../Constants/strings';
import CheckBox from '@react-native-community/checkbox';
import SelectList from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReleaseInput, DropdownPicker, TextButton } from '../Custom/CustomComponent';
import { API } from '../apis/API';

// import Sound Component
import Sound from 'react-native-sound';
import VedioPlayer from 'react-native-video';
import DocumentPicker from 'react-native-document-picker';
import * as Progress from 'react-native-progress';
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
// import VideoPlayer from 'react-native-video-controls';


//api services
const baseURL = 'http://84.16.239.66/api/';

// Options data must contain 'item' & 'id' keys



const AudioTracks = ({ navigation, route }) => {
   const { height, width } = useWindowDimensions();
   // const audioTracksData = route?.params
   const { formData, userLoginId } = route.params;
   // console.log('userLoginId =>', userLoginId);
   // console.log('displayData =>',audioTracksData);


   const [mainGenreData, setMainGenreData] = useState([])
   const [subGenerData, setSubGenreData] = useState([])
   const [isSaveDisabled, setIsSaveDisabled] = useState(true);

   const [label, setLabel] = useState('Save')
   const [isEditing, setIsEditing] = useState(false);
   const [loading, setLoading] = useState(false);
   const [selected, setSelected] = useState('');
   //  console.log('main',selected);
   const [toggleCheckBox, setToggleCheckBox] = useState(false);
   const [explicittoggleCheckBox, setExplicittoggleCheckBox] = useState(false);
   // const [progress, setProgress] = useState(0)
   const [isPlayIndex, setIsPlayIndex] = useState('');

   // counting
   const [count, setCount] = useState(0);

   //remixer
   const [textInput, setTextInput] = useState('');
   const [todos, setTodos] = useState([]);

   // handle play pause event
   const [isSelected, setisSelected] = useState(false)
   const [isPlay, setisPlay] = useState(true);
   const [audioTime, setAudioTime] = useState({
      currentTime: 0,
      endTime: 1
   });

   useEffect(() => {
      getTodosFromUserDevice();
      getMainGenreData();
      getSubGenreData();
      //setupPlayer();
   }, []);

   // radio button category
   const [choose, setchoose] = useState([
      { id: 1, value: false, name: 'Yes', selected: false },
      { id: 2, value: false, name: 'No', selected: false },
   ]);

   const data = [
      { key: '1', value: 'Back' },
      { key: '2', value: 'Front' },
      { key: '3', value: 'Low' },
      { key: '4', value: 'Lowest' },
      { key: '5', value: 'Mid' },

   ];


   //handle change
   const [addNewFormInput, setAddNewFormInput] = useState({
      featureartist: formData.featureArtist,
      displayartist: formData.displayArtist,
      title: formData.releasetitle,
      maingener: formData.mainGener,
      subgener: formData.subGener,
      mixversion: '',
      orchestra: '',
      actor: '',
      arranger: '',
      conductor: '',
      composerfirstname: '',
      composerlastname: '',
      lyricistfirstname: '',
      lyricistlastname: '',
      publisher: '',
      contributors: ''
   })

   
   

   const handleOnChangeForm = (text, addNewFormInput) => {
      setAddNewFormInput(prevState => ({ ...prevState, [addNewFormInput]: text }));
   }

   const handleMainGenerSelect = (selected) => {
      setAddNewFormInput({ ...addNewFormInput, maingener: selected });
   }

   const handleSubGenerSelect = (selected) => {
      setAddNewFormInput({ ...addNewFormInput, subgener: selected });
   }

   const newMainGenre = mainGenreData.map(item => {
      return { key: item.MainGenre_Id, value: item.MainGenre_Name };
      //return item.MainGenre_Name;
   });
   // console.log('update =>',addNewFormInput);

   const newSubGenre = subGenerData.map(item => {
      return { key: item.SubGenre_Id, value: item.SubGenre_Name };
      //console.log(item);
   });

   // radion button items
   const onRadioBtnPress = item => {
      let updatedState = choose.map(isLikedItem =>
         isLikedItem.id === item.id
            ? { ...isLikedItem, selected: true }
            : { ...isLikedItem, selected: false },
      );
      setchoose(updatedState);
   };


   // Get mainGenre data
   const getMainGenreData = () => {
      API({
         url: `${baseURL}/GetmainGenre`,
         headers: { 'Content-Type': 'application/json' },

         onSuccess: val => {
            //console.log('main genere data =>',val?.Data);
            //alert('maingeneredata =>',val?.Data)
            ///let testlang = 
            setMainGenreData(val?.Data)
         },
         onError: val => console.log('Error:', val)
      })
   };

   const getSubGenreData = () => {
      API({
         url: `${baseURL}/Getsubgenre`,
         headers: { 'Content-Type': 'application/json' },

         onSuccess: val => {
            //console.log('main genere data =>',val?.Data);
            //alert('maingeneredata =>',val?.Data)
            ///let testlang = 
            setSubGenreData(val?.Data)
         },
         onError: val => console.log('Error:', val)
      })
   };


   // Artist Data Of Logined user

   // console.log('Id =>', userLoginId);
   const [artistData, setArtistData] = useState([])
   const [selectedArtists, setSelectedselectedArtists] = useState(artistData)
   //console.log('selectedArtists=>',selectedArtists);
   function onMultiChange() {
      return (item) => setSelectedselectedArtists(xorBy(selectedArtists, [item], 'id'))
   }
   //console.log('artistData=>',artistData);

   const getArtistData = () => {
      API({
         url: `http://84.16.239.66/api/GetAllArtistByUserId?UserId=${userLoginId}`,
         headers: { 'Content-Type': 'application/json' },

         onSuccess: val => {
            // console.log('Artistdata=>',val?.Data);
            let newArtistArrayList = val?.Data.map((items) => {
               return { id: items.Id, item: items.ArtistName }
            })
            // console.log('Newartist=>',newArray);
            //alert('maingeneredata =>',val?.Data)
            setArtistData(newArtistArrayList)
         },
         onError: val => console.log('Error:', val)
      })
   };

   useEffect(() => {
      getArtistData()
   }, [])



   // get remixer from user device.
   const getTodosFromUserDevice = async () => {
      try {
         const todos = await AsyncStorage.getItem('todos');
         if (todos != null) {
            setTodos(JSON.parse(todos));
         }
      } catch (error) {
         console.log(error);
      }
   };

   //   const AddNewTrack = ({visible = false}) => {
   const Separator = () => <View style={styles.separator} />;

   //  save remixer useffect

   // useEffect(() => {
   //   saveTodoToUserDevice(todos);
   // }, [todos]);

   const ListItem = ({ todo }) => {
      return (
         <View 
         style={{
            flexDirection: 'row',
            marginHorizontal: SIZES.padding * 2,
            //paddingTop: 10,
         }}>
            <View style={{
               width: '75%',
               height: 50,
               backgroundColor: '#fff',
               borderRadius: 5,
               //margin: SIZES.padding,
               marginTop: 5,
               justifyContent: 'center',
               //alignItems: 'center'
               paddingLeft: SIZES.padding
            }}>
               <Text
                  style={{
                     fontWeight: 'bold',
                     fontSize: 15,
                     //textDecorationLine: todo?.completed ?  'line-through' : 'none',
                  }}>
                  {todo?.task}
               </Text>
            </View>
            <View
               style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  //justifyContent: 'center',
               }}>
               {todo?.completed && (
                  <TouchableOpacity
                     style={[styles.remixerInputBtn]}
                     onPress={() => markRemixerComplete(todo?.id)}>
                     <Text style={styles.remixerTxt}>+</Text>
                  </TouchableOpacity>
               )}

               <TouchableOpacity
                  style={[styles.remixerInputBtn, { marginHorizontal: 15 }]}
                  onPress={() => deleteRemixer(todo.id)}>
                  <Text style={styles.remixerTxt}>-</Text>
               </TouchableOpacity>
            </View>
         </View>
      );
   };



   // Add remixer
   const addRemixer = () => {
      if (textInput == '') {
         Alert.alert('Error', 'Please add any remixer');
      } else {
         const newRemixer = {
            id: Math.random(),
            task: textInput,
            completed: false,
         };
         setTodos([...todos, newRemixer]);
         setTextInput('');
      }
   };



   const markRemixerComplete = todoId => {
      const newTodosItem = todos.map(item => {
         if (item.id == todoId) {
            return { ...item, completed: true };
         }
         return item;
      });

      setTodos(newTodosItem);
   };

   // deleting remixer
   const deleteRemixer = todoId => {
      const newTodosItem = todos.filter(item => item.id != todoId);
      setTodos(newTodosItem);
   };

   // Audio file selection handler
   const [fileResponse, setFileResponse] = useState([]);
   // console.log('show FileResp ==>', fileResponse)

   const handleSingleDocumentSelection = React.useCallback(async () => {
      try {
         const response = await DocumentPicker.pick({
            // Provide which type of file you want user to pick
            type: [DocumentPicker.types.audio],
            // There can me more options as well
            // DocumentPicker.types.allFiles
            // DocumentPicker.types.images
            // DocumentPicker.types.plainText
            // DocumentPicker.types.audio
            // DocumentPicker.types.pdf
            presentationStyle: 'fullScreen',
         });
         // Printing the log realted to the file
         //console.log('res : ' + JSON.stringify(response));
         setFileResponse(response);
      } catch (err) {
         console.warn(err);
         // setFileResponse(null)
         // Handling any exception (If any)
         if (DocumentPicker.isCancel(err)) {
            // If user canceled the document selection
            alert('Canceled');
         } else {
            // For Unknown Error
            alert('Unknown Error: ' + JSON.stringify(err));
            throw err;
         }
      }
   }, []);



   // Picking audio tracks
   const [selectTrackAudio, setSelectTrackAudio] = useState([])
   // console.log('selected tracks =>', selectTrackAudio);
   const pickAudio = async () => {
      try {
         const result = await DocumentPicker.pick({
            type: [DocumentPicker.types.audio],
            allowMultiSelection: true,
            transitionStyle: 'coverVertical'
         });

         // Check if the file is a 16-bit wav at 44.1kHz
         // if (result.type !== 'audio/wav' || result.name !== '16bit') {
         //   console.log('Invalid file format');
         //   return;
         // }
         //console.log('res : ' + JSON.stringify(result));
         setSelectTrackAudio(result)
         setIsSaveDisabled(false);
         // Prepare the form data for the file upload
         //let formData = new FormData();

         // formData.append('audioFile', {
         //   uri: result.uri,
         //   name: result.name,
         //   type: result.type
         // });

         // let response = await RNFetchBlob.fetch('POST', 'https://your-server-url.com/upload', {
         //   'Content-Type': 'multipart/form-data',
         // }, formData);

         //let responseJson = await response.json();
         //console.log(responseJson);
      } catch (err) {
         if (DocumentPicker.isCancel(err)) {
            console.log('User cancelled the picker');
         } else {
            throw err;
         }
      }
   };



   //Audio file Multiple selection handler
   const [multipleFiles, setMultipleFiles] = useState([]);

   const selectMultipleFiles = React.useCallback(async () => {
      try {
         const results = await DocumentPicker.pick({
            type: [DocumentPicker.types.audio],
            allowMultiSelection: true,
            transitionStyle: 'coverVertical'
         });
         for (const res of results) {
            setMultipleFiles(currentFiles => [...currentFiles, res])
         }
         //Setting the state to show the multiple file attributes
         //setMultipleFiles(results)
      } catch (err) {
         //Handle any exception (if any)
         if (DocumentPicker.isCancel(err)) {
            // if document cancel 
            alert('Empty Selection')
         } else {
            // For Unknown Error
            alert('Unknown Error: ' + JSON.stringify(err));
            throw err;
         }
      }
   }, [])

   const [editingIndex, setEditingIndex] = useState(null);
   const [editingData, setEditingData] = useState({});


   //  console.log('editingData=>', editingData);

   const handleEdit = (index) => {
      // code for handling the editing of the file
      //handleOnChangeForm(text, addNewFormInput);

      setEditingIndex(index);
      // set the current editing data from the selected file
      setEditingData(multipleFiles[index]);
      // set the loading state to true
      setIsEditing(true)
      //setLabel("Update Track");
      //setIsSaveDisabled(false)
      setLoading(true);
   }

   // update inputs btn
   const handleUpdateTrack = () => {
      // need for tommarrow
      //    if (!addNewFormInput.title) {
      //       alert("Title is required");
      //       return;
      //   }
      handleOnChangeForm()
      //console.log('Edit =>', addNewFormInput);
   }

   // form input when Save button click
   const handleOnChangenNewForm = (text, inputKey) => {
      setAddNewFormInput(prevState => ({ ...prevState, [inputKey]: text }));
   }

   // save click btn
   const handleSaveTrack = () => {
      let isValid = true;
      if (selectedArtists.length === 0) {
         alert('Please select artist');
         return;
      }
      if (!addNewFormInput.composerfirstname) {
         alert('Enter Composer First Name')
         return;
         // isValid = false;
      }
      if (!addNewFormInput.composerlastname) {
         alert('Enter Composer last Name')
         return;
         // isValid = false;
      }
      if (!addNewFormInput.lyricistfirstname) {
         alert('Enter Lyricist First Name')
         return;
         // isValid = false;
      }
      if (!addNewFormInput.lyricistlastname) {
         alert('Enter Lyricist Last Name')
         return;
         // isValid = false;
      }
      if (isValid) {
         setSelectTrackAudio([]);
         setLoading(false);
         setMultipleFiles([...multipleFiles, { ...addNewFormInput }]);
      }
        
      handleOnChangenNewForm()
      // Clear the form inputs
      setAddNewFormInput({
         featureartist: formData.featureArtist,
         displayartist: formData.displayArtist,
         title: formData.releasetitle,
         maingener: formData.mainGener,
         subgener: formData.subGener,
         mixversion: '',
         orchestra: '',
         actor: '',
         arranger: '',
         conductor: '',
         composerfirstname: '',
         composerlastname: '',
         lyricistfirstname: '',
         lyricistlastname: '',
         publisher: '',
         contributors: '',
         selectedArtists: ''
      });

      // console.log('save =>', addNewFormInput);
   }

   // console.log('show form data=>',addNewFormInput);

   // const [addNewFormInput, setAddNewFormInput] = useState([])
   // Add new Btn
   const handleAddNew = () => {
      // setLabel('Save')
      //setEditingData(multipleFiles[index]);
      //setEditingIndex(index);
      //console.log(index);
      setAddNewFormInput((prevState) => {
         return {...prevState, selectedArtists}
       })
      setIsEditing(false)
      setIsSaveDisabled(true)
      setLoading(true)
   }

   const removeFile = (index) => {
      const newFiles = [...multipleFiles];
      newFiles.splice(index, 1);
      setMultipleFiles(newFiles);
      setEditingIndex(null);
   }

   function renderAudioView() {

      const timeformate = (timeInSeconds) => {
         const digit = n => (n < 10 ? `0${n}` : `${n}`);
         const sec = digit(Math.floor(timeInSeconds % 60));
         const min = digit(Math.floor((timeInSeconds / 60) % 60));
         return `${min}:${sec}`
      }

      // const handleOnChange = (text, editInput) => {
      //   setEditInput(prevState => ({ ...prevState, [editInput]: text }));
      // }


      return (
         <View>
            <View style={styles.audioview}>
               <Text style={styles.audiotxt}>{Strings.addTrack}</Text>
            </View>
            <View>
               <TouchableOpacity
                  style={styles.addNewBtn}
                  onPress={() => handleAddNew()}>
                  <Text style={styles.addtxt}>Add New</Text>
               </TouchableOpacity>

               {/* Upload Single Tracks */}
               <TouchableOpacity
                  onPress={handleSingleDocumentSelection}
                  style={styles.addNewBtn}>
                  <Text style={styles.addtxt}>{Strings.SingleTrack}</Text>
               </TouchableOpacity>

               {/* Upload Multiple Tracks */}
               <TouchableOpacity
                  onPress={selectMultipleFiles}
                  style={styles.addNewBtn}>
                  <Text style={styles.addtxt}>{Strings.MultiTrack}</Text>
               </TouchableOpacity>
               <View>

                  {/* single Track */}
                  {fileResponse.map((file, index) => (
                     <View
                        key={index.toString()}
                        style={{
                           //backgroundColor: 'lightgrey',
                           marginHorizontal: SIZES.padding2 * 2,
                           padding: 5,
                           borderWidth: 1.2,
                           borderColor: 'blue'
                        }}
                     >
                        <Text style={styles.uri}>File Name: {file?.name}</Text>

                        <Text style={styles.uri}>File Type: {file?.type}</Text>
                        {/* <Text style={styles.uri}>File size (kb): {file.size}</Text> */}

                        {/*Single player container*/}
                        <View
                           style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              padding: 10
                           }}>

                           {isPlay ? (
                              <TouchableOpacity onPress={() => setisPlay(false)}
                                 style={{

                                    backgroundColor: 'grey',
                                    height: 40,
                                    width: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: 15
                                 }}
                              >
                                 <Image source={icons.play}
                                    style={{ height: 30, width: 30 }}
                                 />
                              </TouchableOpacity>
                           ) : (
                              <TouchableOpacity onPress={() => setisPlay(true)}
                                 style={{
                                    backgroundColor: 'grey',
                                    height: 40,
                                    width: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: 15
                                 }}
                              >
                                 <Image source={icons.pause}
                                    style={{ height: 30, width: 30 }}
                                 />
                              </TouchableOpacity>
                           )}
                           <VedioPlayer
                              source={{ uri: file.uri }}
                              //style={{ width: 20, height: 20, alignSelf: 'center', backgroundColor: 'red' }}
                              audioOnly={true}
                              paused={isPlay}
                              onLoad={(data) => setAudioTime({ ...audioTime, endTime: data.duration })}
                              onProgress={(data) => setAudioTime({ ...audioTime, currentTime: data.currentTime })}
                              repeat={true}
                              volume={4}

                           // style={{
                           //   width: SIZES.width / 6,
                           //   backgroundColor: 'red'
                           // }}
                           //onBuffer={(data) =>console.log(data)}
                           />
                           <View>
                              {/* 
                      sometime show error(not working properly)
                      see what thay have accept as a value
                      // 
                     */}
                              <View style={{ width: '65%' }}>
                                 <Progress.Bar
                                    progress={audioTime.currentTime / audioTime.endTime}
                                    //progress={0.2}
                                    width={120}
                                    height={20}
                                    color='rgb(0,177,44)'
                                    animated={true}
                                    animationType='spring'
                                    indeterminateAnimationDuration={50}
                                    borderRadius={0}
                                 // collapsable={true} 
                                 />
                              </View>

                              <View style={{
                                 flexDirection: 'row',
                                 justifyContent: 'space-between',
                              }}>
                                 <Text>{timeformate(audioTime.currentTime)}</Text>
                                 <Text>{timeformate(audioTime.endTime)}</Text>
                              </View>
                           </View>
                        </View>
                     </View>
                  ))}


                  {/* Multiple Tracks upload */}

                  {multipleFiles.map((item, index) => (
                     <View style={{
                        // backgroundColor: 'red',
                        margin: SIZES.padding * 0.5,
                     }}>
                        <View style={{
                           flexDirection: 'row',
                           marginLeft: SIZES.padding * 2,
                           justifyContent: 'space-between',
                           paddingRight: SIZES.padding * 2,

                        }}>
                           <View style={{ flexDirection: 'row' }}>
                              <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => removeFile()}>
                                 <Text>Remove</Text>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => handleEdit(index)}>
                                 <Text>Edit</Text>
                              </TouchableOpacity>
                           </View>
                           <Text>{item?.name}</Text>
                        </View>


                        <View
                           key={`file-${index}`}
                           style={{
                              // backgroundColor: 'white',
                              marginHorizontal: SIZES.padding2 * 2,
                              padding: 5,
                              marginVertical: SIZES.padding * 0.5,
                              borderWidth: 1,
                              borderColor: COLORS.primary,
                              flexDirection: 'row',
                              alignItems: 'center'
                           }}
                        >
                           {/* music container */}
                           <VedioPlayer
                              key={`audio-${index}`}
                              source={{ uri: item.uri }}
                              audioOnly={true}
                              paused={!(isPlayIndex === index)}
                              onLoad={(data) => setAudioTime({ ...audioTime, endTime: data.duration })}
                              onProgress={(data) => setAudioTime({ ...audioTime, currentTime: data.currentTime })}
                              repeat={true}
                              volume={4}
                           />

                           <View
                              key={`audio-btn-${index}`}
                              style={{
                                 flexDirection: 'row',
                                 alignItems: 'center',
                                 padding: 10
                              }}>

                              {isPlayIndex === index ? (
                                 <TouchableOpacity onPress={() => setIsPlayIndex('')}
                                    key={`audio-btn-pause-${index}`}
                                    style={{
                                       backgroundColor: 'grey',
                                       height: 40,
                                       width: 40,
                                       justifyContent: 'center',
                                       alignItems: 'center',
                                       marginRight: 15
                                    }}
                                 >
                                    <Image source={icons.pause}
                                       style={{ height: 30, width: 30 }}
                                    />
                                 </TouchableOpacity>
                              ) : (
                                 <TouchableOpacity onPress={() => setIsPlayIndex(index)}
                                    key={`audio-btn-play-${index}`}
                                    style={{
                                       backgroundColor: 'grey',
                                       height: 40,
                                       width: 40,
                                       justifyContent: 'center',
                                       alignItems: 'center',
                                       marginRight: 15
                                    }}
                                 >
                                    <Image source={icons.play}
                                       style={{ height: 30, width: 30 }}
                                    />
                                 </TouchableOpacity>
                              )}
                           </View>

                           {/* Track Details */}
                           <View style={{ flex: 1 }}>
                              <View style={{
                                 flexDirection: 'row',
                                 justifyContent: 'space-between',
                                 marginBottom: 10
                              }}>
                                 <Text>Track: {index + 1}</Text>
                                 <Text>Title: {formData.releasetitle}</Text>
                              </View>

                              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                 <Text>Genre: {formData.mainGener}</Text>
                                 <Text>Artist:alex b</Text>
                              </View>
                           </View>


                        </View>
                     </View>
                  ))}

               </View>

               {/* Release Form Navigation*/}
               <View
                  style={{
                     flexDirection: 'row',
                     marginVertical: SIZES.padding,
                     //alignItems: 'center',
                     justifyContent: 'center',
                     padding: SIZES.padding,
                  }}>
                  <TouchableOpacity
                     style={styles.addNewBtn}
                     onPress={() => navigation.goBack()}>
                     <Text style={styles.addtxt}>Previous</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     onPress={() => navigation.navigate('SelectTerritories')}
                     //onPress={() => navigation.navigate('testing')}
                     style={styles.addNewBtn}
                  >
                     <Text style={[styles.addtxt, { paddingHorizontal: SIZES.padding }]}>
                        Next
                     </Text>
                  </TouchableOpacity>
               </View>

            </View>
         </View>
      );
   };

   // audio url: https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3
   return (
      <View style={{ flex: 1 }}>
         <ScrollView showsVerticalScrollIndicator={false}>
            {renderAudioView()}
         </ScrollView>
         {loading && (
            <View style={[styles.container, { width, height }]}>
               <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: height / 6 }}
                  scrollsToTop={false}
                  bounces={false}>
                  <View
                     style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        margin: SIZES.padding * 1.5,
                        justifyContent: 'space-between',
                     }}>
                     <Text style={styles.addNewTxt}>Add New Track</Text>
                     <TouchableOpacity onPress={() => setLoading(false)}>
                        <Image
                           source={icons.cross}
                           style={{
                              height: 25,
                              width: 25,
                              tintColor: COLORS.white,
                           }}
                        />
                     </TouchableOpacity>
                  </View>
                  <Separator />
                  <View>


                     {/* Disc */}

                     <View>
                        <Text
                           style={{
                              fontSize: 18,
                              fontWeight: 'bold',
                              color: COLORS.white,
                              marginVertical: 7,
                              marginLeft: SIZES.padding,
                              marginTop: 20
                           }}>Disc*:</Text>
                        <View
                           style={{
                              backgroundColor: COLORS.white,
                              padding: SIZES.padding * 1.5,
                              marginHorizontal: SIZES.padding2,
                              borderRadius: 5
                           }}>
                           {count == 0 ? <Text>1</Text> : <Text>{count}</Text>}
                        </View>
                     </View>


                     {/* Track */}
                     <ReleaseInput
                        text='Track#*:'
                        value={(editingIndex + 1).toString()}
                        labelContainer={{
                           color: 'white',
                           fontWeight: 'bold'
                        }}
                     />

                     {/* Artist- Need multiple selection box */}

                     <>
                        <Text style={[styles.artistTxt, { marginBottom: 0, marginVertical: 5 }]}>Artist*:</Text>
                        <SelectBox
                           label=""
                           options={artistData}
                           selectedValues={selectedArtists}
                           onMultiSelect={onMultiChange()}
                           onTapClose={onMultiChange()}
                           isMulti
                           hideInputFilter={true}
                           //sdefaultValue={choosePriArtist}
                           containerStyle={{
                              backgroundColor: COLORS.white,
                              //alignItems: 'center',
                              width: '93%',
                              borderWidth: 1,
                              marginLeft: SIZES.padding,
                              marginBottom: SIZES.padding,
                              height: 55,
                              borderRadius: 5,
                              paddingHorizontal: 10,
                              paddingVertical: 30,
                           }}
                           labelStyle={{
                              fontSize: 10,
                              // margin: 20
                           }}
                           optionsLabelStyle={{
                              fontSize: 17,
                              paddingHorizontal: SIZES.padding * 2
                           }}
                           optionContainerStyle={{
                              backgroundColor: '#fff',
                              width: '93%',
                              //borderWidth: 1,
                              marginLeft: SIZES.padding,
                           }}
                           multiOptionContainerStyle={{
                              backgroundColor: COLORS.primary,
                           }}
                           multiOptionsLabelStyle={{
                              fontSize: 15,
                              fontWeight: 'bold',
                           }}
                           multiListEmptyLabelStyle={{ fontSize: 15 }}
                           listEmptyLabelStyle={{ color: 'red' }}
                           //selectedItemStyle={{ color: 'red' }}
                           arrowIconColor={COLORS.primary}
                           searchIconColor={COLORS.primary}
                           toggleIconColor={COLORS.primary}
                           listEmptyText='NO ARTIST FOUND'
                        />
                     </>

                     {/* Feature Artist */}
                     <ReleaseInput
                        text='Feature Artist*:'
                        value={addNewFormInput.featureartist}
                        labelContainer={{
                           color: 'white',
                           fontWeight: 'bold'
                        }}
                     />
                     {/* Track */}

                     <ReleaseInput
                        text='Display Artist:'
                        value={addNewFormInput.displayartist}
                        labelContainer={{
                           color: 'white',
                           fontWeight: 'bold'
                        }}
                     />

                     <ReleaseInput
                        text='Title*:'
                        value={addNewFormInput.title}
                        labelContainer={{
                           color: 'white',
                           fontWeight: 'bold'
                        }}
                     //value={'title name'}
                     />

                     {/* Mix Version */}
                     <ReleaseInput
                        value={addNewFormInput.mixversion}
                        text='Mix Version:'
                        labelContainer={{
                           color: 'white',
                           fontWeight: 'bold'
                        }}
                        onChangeText={(text) => handleOnChangeForm(text, 'mixversion')}
                     />

                     {/* Choose Remixer */}

                     <View>
                        <Text style={styles.artistTxt}>Choose Remixer:</Text>
                        <SelectList
                           setSelected={setSelected}
                           boxStyles={styles.artistDropDown}
                           data={data}
                           onSelect={() => alert(selected)}
                           dropdownStyles={{
                              backgroundColor: 'white',
                              marginHorizontal: SIZES.padding * 2,
                           }}
                        />
                     </View>


                     {/* Enter Remixer */}

                     {/* <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginVertical: SIZES.padding * 0.8
                  }}>
                  OR Enter Remixer(s):
                </Text> */}
                     {todos.map((item, index) => (
                        <ListItem key={index} todo={item} />
                     ))}


                     <View
                        style={{
                           flexDirection: 'row',
                           alignItems: 'center',
                           //backgroundColor: 'red',
                           marginVertical: SIZES.padding
                        }}>

                        <ReleaseInput
                           text='OR Enter Remixer(s):'
                           onChangeText={text => setTextInput(text)}
                           ContainerStyle={{ width: SIZES.width / 1.4 }}
                           labelContainer={{
                              color: 'white',
                              fontWeight: 'bold'
                           }}
                        />
                        <TouchableOpacity
                           //style={[styles.remixerInputBtn, { marginHorizontal: 10,  }]}
                           style={{
                              backgroundColor: COLORS.primary,
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingHorizontal: 20,
                              paddingVertical: 8,
                              position: 'absolute',
                              right: 10,
                              bottom: 5,
                              borderRadius: 5,

                           }}
                           onPress={addRemixer}>
                           <Text style={styles.remixerTxt}>+</Text>
                        </TouchableOpacity>
                        {/* <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.remixInput}
                      placeholder="select remixer"
                      value={textInput}
                      onChangeText={text => setTextInput(text)}
                    />
                  </View> */}
                        {/* <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      style={[styles.remixerInputBtn, { marginHorizontal: 10 }]}
                      onPress={addRemixer}>
                      <Text style={styles.remixerTxt}>+</Text>
                    </TouchableOpacity>
                  </View> */}
                     </View>



                     {/* Orchestra */}
                     <ReleaseInput
                        value={addNewFormInput.orchestra}
                        text='Orchestra:'
                        labelContainer={{
                           color: 'white',
                           fontWeight: 'bold'
                        }}
                        onChangeText={(text) => handleOnChangeForm(text, 'orchestra')}
                     />

                     {/* Actor */}
                     <ReleaseInput
                        value={addNewFormInput.actor}
                        text='Actor:'
                        labelContainer={{
                           color: 'white',
                           fontWeight: 'bold'
                        }}
                        onChangeText={(text) => handleOnChangeForm(text, 'actor')}
                     />

                     {/* Arranger */}
                     <ReleaseInput
                        value={addNewFormInput.arranger}
                        text='Arranger:'
                        labelContainer={{
                           color: 'white',
                           fontWeight: 'bold'
                        }}
                        onChangeText={(text) => handleOnChangeForm(text, 'arranger')}
                     />


                     {/* Conductor */}
                     <ReleaseInput
                        value={addNewFormInput.conductor}
                        text='Conductor:'
                        labelContainer={{
                           color: 'white',
                           fontWeight: 'bold'
                        }}
                        onChangeText={(text) => handleOnChangeForm(text, 'conductor')}
                     />

                     {/* Composer */}
                     <View>
                        <ReleaseInput
                           value={addNewFormInput.composerfirstname}
                           text='Composer:'
                           placeholder='First Name'
                           labelContainer={{
                              color: 'white',
                              fontWeight: 'bold',
                           }}
                           onChangeText={(text) => handleOnChangeForm(text, 'composerfirstname')}
                        />
                        <ReleaseInput
                           value={addNewFormInput.composerlastname}
                           placeholder='Last Name'
                           onChangeText={(text) => handleOnChangeForm(text, 'composerlastname')}
                           releaseInputMainContainerStyle={{ marginTop: -20 }}
                        />
                     </View>

                     {/* Lyricist */}
                     <View>
                        <ReleaseInput
                           text='Lyricist:'
                           value={addNewFormInput.lyricistfirstname}
                           placeholder='First Name'
                           labelContainer={{
                              color: 'white',
                              fontWeight: 'bold'
                           }}
                           onChangeText={(text) => handleOnChangeForm(text, 'lyricistfirstname')}
                        />
                        <ReleaseInput
                           value={addNewFormInput.lyricistlastname}
                           placeholder='Last Name'
                           releaseInputMainContainerStyle={{ marginTop: -20 }}
                           onChangeText={(text) => handleOnChangeForm(text, 'lyricistlastname')}
                        />
                     </View>


                     {/* Main Genre: */}
                     <DropdownPicker
                        label="Main Genre:"
                        data={newMainGenre}
                        setSelected={handleMainGenerSelect}
                        defaultOption={{ key: formData.mainGener, value: formData.mainGener }}
                     />

                     {/* Sub Gene */}
                     <DropdownPicker
                        label="Sub Genre:"
                        data={newSubGenre}
                        setSelected={handleSubGenerSelect}
                        onSelect
                        defaultOption={{ key: formData.subGener, value: formData.subGener }}
                     />


                     {/* Publisher */}
                     <ReleaseInput
                        value={addNewFormInput.publisher}
                        text='Publisher:'
                        labelContainer={{
                           color: 'white',
                           fontWeight: 'bold'
                        }}
                        onChangeText={(text) => handleOnChangeForm(text, 'publisher')}
                     />

                     {/* Contributors */}
                     <ReleaseInput
                        value={addNewFormInput.contributors}
                        text='Contributors:'
                        labelContainer={{
                           color: 'white',
                           fontWeight: 'bold'
                        }}
                        onChangeText={(text) => handleOnChangeForm(text, 'contributors')}
                     />

                     {/* ISRC */}
                     <View style={styles.irscView}>
                        <Text style={{
                           color: '#fff',
                           fontWeight: 'bold',
                           fontSize: 20
                        }}>{Strings.isrc}</Text>
                        <View
                           style={{
                              flexDirection: 'row',
                              marginVertical: SIZES.padding,
                           }}>
                           {choose.map(item => (
                              <RadioButton
                                 onPress={() => onRadioBtnPress(item)}
                                 selected={item.selected}
                                 key={item.id}>
                                 <Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.name}</Text>
                              </RadioButton>
                           ))}
                        </View>
                     </View>



                     {/* Album Only */}

                     <View
                        style={{
                           paddingVertical: SIZES.padding,
                        }}>
                        <Text
                           style={{
                              marginVertical: 9,
                              fontSize: 16,
                              fontWeight: '700',
                              color: COLORS.white,
                              marginLeft: SIZES.padding2,
                           }}>
                           Album Only?
                        </Text>
                        <View
                           style={{
                              flexDirection: 'row',
                              marginHorizontal: SIZES.padding * 2,
                              alignItems: 'center',
                           }}>
                           <View>
                              <CheckBox
                                 disabled={false}
                                 style={{
                                    width: 15,
                                    height: 15,
                                    tintColor: COLORS.primary,
                                 }}
                                 boxType="square"
                                 onFillColor="#fff"
                                 onCheckColor="#4C19AE"
                                 onTintColor="#4C19AE"
                                 //lineWidth={2}
                                 value={toggleCheckBox}
                                 onValueChange={newValue => setToggleCheckBox(newValue)}
                              />
                           </View>
                           <Text
                              style={{
                                 marginVertical: 9,
                                 fontSize: 12,
                                 fontWeight: '800',
                                 color: COLORS.white,
                                 marginLeft: SIZES.padding2,
                              }}>
                              Yes, This Track can only be sold with full album
                           </Text>
                        </View>
                     </View>

                     {/* Price Ties */}

                     <DropdownPicker
                        label='Price Ties:(for iTunes only)'
                        setSelected={setSelected}
                        data={data}
                     />

                     <View>
                        <Text
                           style={{
                              marginTop: SIZES.padding * 2,
                              fontSize: 15,
                              fontWeight: 'bold',
                              color: COLORS.white,
                              marginLeft: SIZES.padding2,
                           }}>
                           {Strings.audiofile}
                        </Text>

                        <TextButton
                           onPress={pickAudio}
                           label='Select Tracks'
                        />
                     </View>

                     {/* select Track */}
                     {selectTrackAudio.map((file, index) => (
                        <View
                           key={index.toString()}
                           style={{
                              flexDirection: 'row',
                              //backgroundColor: 'lightgrey',
                              marginHorizontal: SIZES.padding2 * 2,
                              padding: 5,
                              borderWidth: 1.2,
                              borderColor: 'blue'
                           }}
                        >
                           <Image
                              source={icons.attach}
                              style={{
                                 height: 13,
                                 width: 13,
                                 tintColor: 'black',
                                 marginRight: 20
                              }}
                           />
                           <Text
                              style={{
                                 color: COLORS.white,
                                 fontSize: 15,
                                 fontWeight: '600'
                              }}>{file?.name}</Text>

                           {/* <Text style={styles.uri}>File Type: {file?.type}</Text> */}
                           {/* <Text style={styles.uri}>File size (kb): {file.size}</Text> */}

                        </View>
                     ))}


                     <View
                        style={{
                           marginHorizontal: SIZES.padding * 2,
                        }}>
                        <Text style={[styles.addNewTxt, { marginVertical: 10 }]}>
                           Explicit
                        </Text>
                        <CheckBox
                           disabled={false}
                           style={{
                              width: 15,
                              height: 15,
                              tintColor: COLORS.primary,
                           }}
                           boxType="square"
                           onFillColor="#fff"
                           onCheckColor="#4C19AE"
                           onTintColor="#4C19AE"
                           //lineWidth={2}
                           value={explicittoggleCheckBox}
                           onValueChange={newValue => setExplicittoggleCheckBox(newValue)}
                        />
                     </View>


                     {/* Save */}
                     {/* Track Update */}
                     {isEditing ? (
                        <TextButton
                           label={'Update Track'}
                           onPress={() => handleUpdateTrack()}
                        />
                     ) : (
                        <TextButton
                           onPress={() => handleSaveTrack()}
                           label={label}
                           disabled={isSaveDisabled}
                           contentContainerStyle={{
                              opacity: isSaveDisabled ? 0.5 : 1
                           }}
                        // contentContainerStyle={styles.nextBtn}
                        // labelStyle={styles.nextTxt}
                        />
                     )}
                  </View>
               </ScrollView>
            </View>
         )}
      </View>
   );
};



export default AudioTracks;

const styles = StyleSheet.create({
   audioview: {
      marginVertical: SIZES.padding,
      alignItems: 'center',
   },
   audiotxt: {
      fontSize: 18,
      fontWeight: '300',
   },
   addNewBtn: {
      backgroundColor: COLORS.primary,
      marginHorizontal: SIZES.padding2 * 2,
      marginVertical: SIZES.padding,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      borderRadius: 8,
   },
   addtxt: {
      color: '#fff',
      fontSize: 15,
      fontWeight: 'bold',
   },
   input: {
      height: SIZES.height / 7,
      borderWidth: 0.4,
      borderColor: 'grey',
      marginHorizontal: SIZES.padding2 * 2,
      marginVertical: SIZES.padding,
      //backgroundColor: 'red'
   },

   previousBtn: {
      backgroundColor: COLORS.primary,
      padding: 20,
   },

   container: {
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0.5)',
   },
   separator: {
      marginHorizontal: SIZES.padding2,
      borderBottomColor: '#fff',
      borderBottomWidth: 1,
   },
   addNewTxt: {
      color: COLORS.white,
      fontWeight: 'bold',
      fontSize: 20,
   },
   saveTxt: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 25,
      color: COLORS.white,
   },
   irscView: {
      margin: SIZES.padding * 2,
   },
   artistDropDown: {
      backgroundColor: '#fff',
      marginHorizontal: SIZES.padding2,
      //marginVertical: SIZES.padding * 0.8,
      paddingVertical: SIZES.padding * 1.5,
   },
   artistTxt: {
      marginBottom: 9,
      fontSize: 16,
      fontWeight: '800',
      marginVertical: SIZES.padding,
      marginLeft: SIZES.padding2,
      color: COLORS.white,
   },
   inputContainer: {
      width: '80%',
      height: 50,
      backgroundColor: COLORS.white,
      //marginTop: SIZES.padding,
      borderRadius: 5,
      //alignItems: 'center',
      justifyContent: 'center',
   },
   remixInput: {
      width: '100%',
      height: 50,
      //backgroundColor: 'red',
      paddingLeft: 20,
   },
   remixerInputBtn: {
      backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: SIZES.padding * 2.2,
      paddingVertical: SIZES.padding * 0.7,
      color: COLORS.white,
      borderRadius: 5,
   },
   remixerTxt: {
      color: COLORS.white,
      fontSize: 30,
      fontWeight: 'bold',
   },
   listItem: {
      padding: 20,
      backgroundColor: COLORS.white,
      flexDirection: 'row',
      elevation: 12,
      borderRadius: 7,
      marginVertical: 10,
   },
   uri: {
      paddingVertical: SIZES.padding * 0.3,
      paddingLeft: 10,
      //paddingHorizontal: SIZES.padding * 2.4,
      fontSize: 13,
   }
})