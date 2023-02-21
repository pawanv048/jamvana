import * as Permissions from 'react-native-permissions';
import { View, Text } from 'react-native';
import React, { useEffect } from 'react'

const Testing = () => {

  
    useEffect(() => {
      const checkPhotoLibraryPermission = async () => {
        const { status } = await Permissions.check('photo');
  
        if (status === 'denied') {
          console.log('Photo library permission denied');
        } else if (status === 'undetermined') {
          const { status, canAskAgain } = await Permissions.request('photo');
          if (status === 'granted') {
            console.log('Photo library permission granted');
          } else {
            console.log('Photo library permission denied');
            if (!canAskAgain) {
              console.log('User has denied photo library permission permanently');
            }
          }
        } else {
          console.log('Photo library permission granted');
        }
      };
  
      checkPhotoLibraryPermission();
    }, []);
 
  return (
    <View>
      <Text>Try permissions</Text>
      {/* <Button title="request permissions" onPress={requestCameraPermission} /> */}
    </View>
  )
}

export default Testing

// const styles = StyleSheet.create({})