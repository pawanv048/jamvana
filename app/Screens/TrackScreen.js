import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import useDetailsData from '../context/useDetailsData';
import moment from 'moment-timezone';

const TrackScreen = () => {
  const {data, setData} = useDetailsData();

  
  return (
    <View>
    <FlatList
      data={data}
      renderItem={({item}) => (
        <View style={{ margin: 15}}>
          <Text>Track Disc: {item?.Tracks?.Track_Disc}</Text>
          <Text>Track Track: {item?.Tracks?.Track_Track}</Text>
          <Text>Track Artist: "{item?.Tracks?.Track_Artist}"</Text>
          <Text>Track DisplayArtist: "{item?.Tracks?.Track_DisplayArtist}"</Text>
          {/* <Text>Track Title: "{data[0]?.Tracks?.Track_Title}"</Text> */}
          <Text>Track Title : {item?.Tracks?.Track_Title}</Text>
          <Text>Track MixVersion: "{item?.Tracks?.Track_MixVersion}"</Text>
          <Text>Track Remixer: "{item?.Tracks?.Track_Remixer}"</Text>
          <Text>Track MainGenre: "{item?.Tracks?.Track_MainGenre}"</Text>
          <Text>Track SubGenre: "{item?.Tracks?.Track_SubGenre}"</Text>
          <Text>Track ISRC: "{item?.Tracks?.Track_ISRC}"</Text>
          <Text>Track AlbumOnly: "{item?.Tracks?.Track_AlbumOnly}"</Text>
          {/* <Text>Track AudioFile: "{item?.Tracks?.Track_AudioFile}"</Text> */}
          <Text>Track FeaturedArtist: "{item?.Tracks?.Track_FeaturedArtist}"</Text>
          <Text>Track Date "{moment(new Date(item?.Tracks?.Track_Date)).format('DD-MM-YYYY')}"</Text>
          <Text>Track Explicit: "{item?.Tracks?.Track_Explicit}"</Text>
          <Text>Track Orchestra: "{item?.Tracks?.Orchestra}"</Text>
          <Text>Track Conductor: "{item?.Tracks?.Conductor}"</Text>
          <Text>Track Actor: "{item?.Tracks?.Actor}"</Text>
          <Text>Track Arranger: "{item?.Tracks?.Arranger}"</Text>
        </View>
      )}
    />
  </View>
  );
};

export default TrackScreen;

const styles = StyleSheet.create({});