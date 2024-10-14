// sharedFunctions.js

import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleOutsideClick = (isOptionsMenuVisible, setIsOptionsMenuVisible) => {
  if (isOptionsMenuVisible) {
    setIsOptionsMenuVisible(false);
  }
};

export const logout = async (navigation, setIsOptionsMenuVisible) => {
  setIsOptionsMenuVisible(false);
  await AsyncStorage.removeItem('token');
  navigation.navigate('LandingPage');
};
