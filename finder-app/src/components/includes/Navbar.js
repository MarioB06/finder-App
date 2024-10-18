//nav bar

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { SvgXml } from 'react-native-svg';
import { magnifyingGlassSvg } from '../../../assets/svg/MagnifyingGlassSvg';
import { HamburgerMenuSvg } from '../../../assets/svg/HamburgerMenuSvg.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_API_HOST, REACT_APP_API_PORT } from '@env';
const API_BASE_URL = `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`;

const defaultImage = require('../../../assets/default-image.png');
import { FlatList, Image } from 'react-native';

const NavBar = ({ navigation, setIsOptionsMenuVisible }) => {
  return (
    <View style={tw`flex-row justify-between items-center mb-10 mt-15`}>
      <TouchableOpacity style={tw`flex-row items-center`} onPress={() => navigation.navigate('Home')}>
        <SvgXml xml={magnifyingGlassSvg} width="40" height="40" />
        <Text style={tw`ml-3 text-blue-500 text-3xl font-bold`}>Finder</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;
