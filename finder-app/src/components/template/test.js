// template
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Modal, Pressable } from 'react-native';
import tw from 'twrnc';
import { SvgXml } from 'react-native-svg';
import { FlatList, Image } from 'react-native';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { REACT_APP_API_HOST, REACT_APP_API_PORT } from '@env';
const API_BASE_URL = `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`;


import Navbar from './includes/Navbar';
import OptionsMenu from './includes/OptionsMenu';
import { handleOutsideClick, logout } from './includes/sharedFunctions';

import { magnifyingGlassSvg } from '../../assets/svg/MagnifyingGlassSvg';
const defaultImage = require('../../assets/default-image.png');


const Test = ({ navigation, route }) => {
    const [token, setToken] = useState(null);
    const [filterVisible, setFilterVisible] = useState(false);
    const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState(false);
  
    // Funktion zur Filterung von Items nach Standort
    useEffect(() => {
      return focusListener;
    }, [navigation, route]);
  
    return (
      <TouchableWithoutFeedback onPress={handleOutsideClick}>
        <View style={[tw`flex-1 p-4 relative`]}>
  
        {/*Menu include*/}
  
            {/* Navbar */}
            <Navbar navigation={navigation} setIsOptionsMenuVisible={setIsOptionsMenuVisible} magnifyingGlassSvg={magnifyingGlassSvg} />

            {/* Options Menu Modal */}
            <OptionsMenu
            isVisible={isOptionsMenuVisible}
            setIsOptionsMenuVisible={setIsOptionsMenuVisible}
            navigation={navigation}
            logout={logout}
            />


          {/* content */}


        </View>
      </TouchableWithoutFeedback>
    );
  };
  
  export default Test;