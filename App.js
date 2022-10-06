import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { DetailsDataProvider } from './app/context/useDetailsData';
import Routes from './app/Navigation/Routes';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
        {/* <Drawer/> */}
      <DetailsDataProvider>
        <Routes />
      </DetailsDataProvider>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})




