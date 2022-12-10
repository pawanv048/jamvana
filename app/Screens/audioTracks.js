import React, {useState, useEffect} from 'react';
import {COLORS, SIZES} from '../Constants/theme';
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

import AudioTrackInput from '../Custom/AudioTrackInput';
import icons from '../Constants/icons';
import RadioButton from '../Custom/RadioButton';
import * as Strings from '../Constants/strings';
import CheckBox from '@react-native-community/checkbox';
import SelectList from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CustomBar} from '../Custom/CustomComponent';

// import Sound Component
import Sound from 'react-native-sound';
import VedioPlayer from 'react-native-video';
import DocumentPicker from 'react-native-document-picker';
import * as Progress from 'react-native-progress';
// import VideoPlayer from 'react-native-video-controls';

const AudioTracks = ({navigation}) => {
  const {height, width} = useWindowDimensions();

  const [loading, setLoading] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [selected, setSelected] = useState('');
  // const [progress, setProgress] = useState(0)

  //remixer
  const [textInput, setTextInput] = useState('');
  const [todos, setTodos] = useState([]);

  // handle play pause event
  const [isSelected, setisSelected] = useState(false);
  const [isPlay, setisPlay] = useState(true);
  const [audioTime, setAudioTime] = useState({
    currentTime: 0,
    endTime: 1,
  });

  const [isPlayIndex, setIsPlayIndex] = useState('');


  //const [isPlaying, setShowPause] = useState(false)
  //const playBackState = usePlaybackState();

  useEffect(() => {
    getTodosFromUserDevice();
    //setupPlayer();
  }, []);

  // radio button category
  const [choose, setchoose] = useState([
    {id: 1, value: false, name: 'Yes', selected: false},
    {id: 2, value: false, name: 'No', selected: false},
  ]);

  const data = [
    {key: '1', value: 'item_1'},
    {key: '2', value: 'item_2'},
  ];

  // radion button items
  const onRadioBtnPress = item => {
    let updatedState = choose.map(isLikedItem =>
      isLikedItem.id === item.id
        ? {...isLikedItem, selected: true}
        : {...isLikedItem, selected: false},
    );
    setchoose(updatedState);
  };

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

  const ListItem = ({todo}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            width: '80%',
            height: 50,
            backgroundColor: '#fff',
            borderRadius: 5,
            marginVertical: SIZES.padding * 0.3,
            justifyContent: 'center',
            //alignItems: 'center'
            paddingLeft: SIZES.padding,
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
            style={[styles.remixerInputBtn, {marginHorizontal: 10}]}
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
        return {...item, completed: true};
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
      console.log('res : ' + JSON.stringify(response));
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

  //Audio file Multiple selection handler
  const [multipleFiles, setMultipleFiles] = useState([]);

  const selectMultipleFiles = React.useCallback(async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
        allowMultiSelection: true,
        transitionStyle: 'coverVertical',
      });
      for (const res of results) {
        // printing the logs
        // console.log(
        //   res.uri,
        //   res.type, // mime type
        //   res.name,
        //   res.size
        // );
      }
      //Setting the state to show the multiple file attributes
      setMultipleFiles(results);
    } catch (err) {
      //Handle any exception (if any)
      if (DocumentPicker.isCancel(err)) {
        // if document cancel
        alert('Empty Selection');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }, []);

  function renderAudioView() {
    const timeformate = timeInSeconds => {
      const digit = n => (n < 10 ? `0${n}` : `${n}`);
      const sec = digit(Math.floor(timeInSeconds % 60));
      const min = digit(Math.floor((timeInSeconds / 60) % 60));
      return `${min}:${sec}`;
    };

    const handleAudioTrackPress = index => {
      if (isSelected != index) {
        console.log(index);
        //setisPlay(false)
      }
    };

    return (
      <View>
        <View style={styles.audioview}>
          <Text style={styles.audiotxt}>{Strings.addTrack}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.addNewBtn}
            onPress={() => setLoading(true)}>
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
            {/* select audio files */}

            {/* single Track */}
            {fileResponse.map((file, index) => (
              <View
                key={index.toString()}
                style={{
                  //backgroundColor: 'lightgrey',
                  marginHorizontal: SIZES.padding2 * 2,
                  padding: 5,
                  borderWidth: 1.2,
                  borderColor: 'blue',
                }}>
                <Text style={styles.uri}>File Name: {file?.name}</Text>
                {/* <Text
                  //key={index.toString()}
                  style={styles.uri}
                  numberOfLines={1}
                  ellipsizeMode={'middle'}>
                  File Url: {file?.uri}
                </Text> */}

                <Text style={styles.uri}>File Type: {file?.type}</Text>
                {/* <Text style={styles.uri}>File size (kb): {file.size}</Text> */}

                {/*Single player container*/}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                  }}>
                  {isPlay ? (
                    <TouchableOpacity
                      onPress={() => setisPlay(false)}
                      style={{
                        backgroundColor: 'grey',
                        height: 40,
                        width: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 15,
                      }}>
                      <Image
                        source={icons.play}
                        style={{height: 30, width: 30}}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => setisPlay(true)}
                      style={{
                        backgroundColor: 'grey',
                        height: 40,
                        width: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 15,
                      }}>
                      <Image
                        source={icons.pause}
                        style={{height: 30, width: 30}}
                      />
                    </TouchableOpacity>
                  )}
                  <VedioPlayer
                    source={{uri: file.uri}}
                    //style={{ width: 20, height: 20, alignSelf: 'center', backgroundColor: 'red' }}
                    audioOnly={true}
                    paused={isPlay}
                    onLoad={data =>
                      setAudioTime({...audioTime, endTime: data.duration})
                    }
                    onProgress={data =>
                      setAudioTime({
                        ...audioTime,
                        currentTime: data.currentTime,
                      })
                    }
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
                    <View style={{width: '65%'}}>
                      <Progress.Bar
                        progress={audioTime.currentTime / audioTime.endTime}
                        //progress={0.2}
                        width={120}
                        height={20}
                        color="rgb(0,177,44)"
                        animated={true}
                        animationType="spring"
                        indeterminateAnimationDuration={50}
                        borderRadius={0}
                        // collapsable={true}
                      />
                    </View>

                    <View
                      style={{
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

            {multipleFiles.map((item, index) => {
              return (
                <View
                  key={index.toString()}
                  style={{
                    backgroundColor: 'lightgrey',
                    marginHorizontal: SIZES.padding2 * 2,
                    padding: 5,
                    marginVertical: SIZES.padding * 0.5,
                  }}>
                  <Text style={styles.uri}>File Name: {item?.name}</Text>
                  {/* <Text style={styles.uri}>File Name: {item.uri}</Text> */}

                  {/* music container */}
                  <VedioPlayer
                    key={index => `${index}`}
                    source={{uri: item.uri}}
                    audioOnly={true}
                    paused={!(isPlayIndex === index)}
                    onLoad={data =>
                      setAudioTime({...audioTime, endTime: data.duration})
                    }
                    onProgress={data =>
                      setAudioTime({
                        ...audioTime,
                        currentTime: data.currentTime,
                      })
                    }
                    repeat={true}
                    volume={4}
                  />
                  <View
                    key={index.toString()}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 10,
                    }}>
                    {isPlayIndex === index ? (
                      <TouchableOpacity
                        onPress={() => setIsPlayIndex('')}
                        key={index.toString()}
                        style={{
                          backgroundColor: 'grey',
                          height: 40,
                          width: 40,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 15,
                        }}>
                        <Image
                          source={icons.play}
                          style={{height: 30, width: 30}}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => setIsPlayIndex(index)}
                        key={index.toString()}
                        style={{
                          backgroundColor: 'grey',
                          height: 40,
                          width: 40,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 15,
                        }}>
                        <Image
                          source={icons.pause}
                          style={{height: 30, width: 30}}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
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
              style={styles.addNewBtn}>
              <Text style={[styles.addtxt, {paddingHorizontal: SIZES.padding}]}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // audio url: https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3
  return (
    <View style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderAudioView()}
      </ScrollView>
      {loading && (
        <View style={[styles.container, {height, width}]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: height / 6}}
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

              <AudioTrackInput
                text="Disc*:"
                //onChangeText={(text) =>}
              />

              {/* Artist */}

              <View>
                <Text style={styles.artistTxt}>Artist*:</Text>
                <SelectList
                  setSelected={setSelected}
                  boxStyles={styles.artistDropDown}
                  //arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
                  data={data}
                  placeholder="Select Some Option"
                  onSelect={() => alert(selected)}
                  dropdownStyles={{
                    backgroundColor: 'white',
                    marginHorizontal: SIZES.padding * 2,
                  }}
                />
              </View>

              {/* Feature Artist */}
              <AudioTrackInput text="Feature Artist*:" />

              {/* Mix Version */}
              <AudioTrackInput text="Mix Version:" />
              <AudioTrackInput text="Arranger:" />
              <AudioTrackInput text="Conductor:" />
              <AudioTrackInput text="Sub Gene:" />
              <AudioTrackInput text="Contributors:" />

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

              <View>
                <AudioTrackInput
                  text="Price Ties:(for iTunes only)"
                  placeholder="Select price Tier"
                />
                <Text
                  style={{
                    marginVertical: 9,
                    fontSize: 12,
                    fontWeight: '800',
                    color: COLORS.white,
                    marginLeft: SIZES.padding2,
                  }}>
                  {Strings.audiofile}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.addNewBtn,
                    {marginHorizontal: SIZES.padding * 1.5},
                  ]}>
                  <Text style={styles.saveTxt}>Select Tracks</Text>
                </TouchableOpacity>
              </View>

              {/* Track */}

              <AudioTrackInput text="Track#*:" />

              <AudioTrackInput text="Display Artist:" />

              <AudioTrackInput text="Title*:" />

              {/* Enter Remixer */}
              <View
                style={{
                  marginHorizontal: SIZES.padding,
                }}>
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginVertical: SIZES.padding * 0.2,
                  }}>
                  OR Enter Remixer(s):
                </Text>

                {todos.map((item, index) => (
                  <ListItem key={index} todo={item} />
                ))}

                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: SIZES.padding * 0.3,
                  }}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.remixInput}
                      placeholder="select remixer"
                      value={textInput}
                      onChangeText={text => setTextInput(text)}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      style={[styles.remixerInputBtn, {marginHorizontal: 10}]}
                      onPress={addRemixer}>
                      <Text style={styles.remixerTxt}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Orchestra */}
              <AudioTrackInput text="Orchestra:" />

              {/* Actor */}
              <AudioTrackInput text="Actor:" />

              {/* Main Genre */}
              <AudioTrackInput text="Main Genre:" />

              {/* Publisher */}
              <AudioTrackInput text="Publisher:" />
              {/* ISRC */}
              <View style={styles.irscView}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                  {Strings.isrc}
                </Text>
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
                      <Text style={{color: '#fff', fontWeight: 'bold'}}>
                        {item.name}
                      </Text>
                    </RadioButton>
                  ))}
                </View>
              </View>

              <View
                style={{
                  marginHorizontal: SIZES.padding * 2,
                }}>
                <Text style={[styles.addNewTxt, {marginVertical: 10}]}>
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
                  value={toggleCheckBox}
                  onValueChange={newValue => setToggleCheckBox(newValue)}
                />
              </View>

              {/* Save */}
              <TouchableOpacity style={[styles.addNewBtn, {marginTop: 25}]}>
                <Text style={styles.saveTxt}>Save</Text>
              </TouchableOpacity>
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
  },
});
