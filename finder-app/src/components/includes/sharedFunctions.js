// sharedFunctions.js

import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleOutsideClick = (isOptionsMenuVisible, setIsOptionsMenuVisible) => {
  if (isOptionsMenuVisible) {
    isOptionsMenuVisible = false;
  }
};

export const logout = async (navigation) => {
  await AsyncStorage.removeItem('token');
  navigation.navigate('LandingPage');
};

