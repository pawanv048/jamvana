import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import useDetailsData from '../context/useDetailsData';
import moment from 'moment-timezone';
import * as Strings from '../Constants/strings';

const TrackScreen = () => {
  const { data, setData } = useDetailsData();


  const trackItems = ({ item }) => {
    return (
      <View style={{ margin: 15 }}>
        <Text>{Strings.t23} {item?.Tracks?.Track_Disc}</Text>
        <Text>{Strings.t24} {item?.Tracks?.Track_Track}</Text>
        <Text>{Strings.t25} {item?.Tracks?.Track_Artist}</Text>
        <Text>{Strings.t26} {item?.Tracks?.Track_DisplayArtist}</Text>
        {/* <Text>Track Title: {data[0]?.Tracks?.Track_Title}</Text> */}
        <Text>{Strings.t27} {item?.Tracks?.Track_Title}</Text>
        <Text>{Strings.t28} {item?.Tracks?.Track_MixVersion}</Text>
        <Text>{Strings.t29} {item?.Tracks?.Track_Remixer}</Text>
        <Text>{Strings.t30} {item?.Tracks?.Track_MainGenre}</Text>
        <Text>{Strings.t31} {item?.Tracks?.Track_SubGenre}</Text>
        <Text>{Strings.t32} {item?.Tracks?.Track_ISRC}</Text>
        <Text>{Strings.t33} {item?.Tracks?.Track_AlbumOnly}</Text>
        {/* <Text>Track AudioFile: {item?.Tracks?.Track_AudioFile}</Text> */}
        <Text>{Strings.t34} {item?.Tracks?.Track_FeaturedArtist}</Text>
        <Text>{Strings.t35} {moment(new Date(item?.Tracks?.Track_Date)).format('DD-MM-YYYY')}</Text>
        <Text>{Strings.t36} {item?.Tracks?.Track_Explicit}</Text>
        <Text>{Strings.t37} {item?.Tracks?.Orchestra}</Text>
        <Text>{Strings.t38} {item?.Tracks?.Conductor}</Text>
        <Text>{Strings.t39} {item?.Tracks?.Actor}</Text>
        <Text>{Strings.t40} {item?.Tracks?.Arranger}</Text>
      </View>
    )
  };

  return (
    <View>
      <FlatList
        data={data}
        //keyExtractor={`${item.Tracks?.Track_Id}`}
        renderItem={trackItems}
      />
    </View>
  );
};

export default TrackScreen;

const styles = StyleSheet.create({});