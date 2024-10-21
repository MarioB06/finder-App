//home
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Modal, Pressable } from 'react-native';
import tw from 'twrnc';
import { SvgXml } from 'react-native-svg';
import { FlatList, Image } from 'react-native';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { REACT_APP_API_HOST, REACT_APP_API_PORT } from '@env';
const API_BASE_URL = `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`;

import BottomNavBar from './includes/BottomNavBar';
import Navbar from './includes/Navbar';
import OptionsMenu from './includes/OptionsMenu';
import { handleOutsideClick, logout } from './includes/sharedFunctions';

import { magnifyingGlassSvg } from '../../assets/svg/MagnifyingGlassSvg';
const defaultImage = require('../../assets/default-image.png');


const Home = ({ navigation, route }) => {
  const [searchLocation, setSearchLocation] = useState('');
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [token, setToken] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState(false);

  // Daten aus der Datenbank laden
  const getItems = async () => {
    try {
      const userToken = await AsyncStorage.getItem('token');
      console.log(userToken);
      if (userToken) {
        setToken(userToken);
        const response = await axios.get(`${API_BASE_URL}/api/items`, {
          params: { token: userToken },
        });
        setItems(response.data);
        setFilteredItems(response.data);
      }
    } catch (error) {
      console.error('Fehler beim Abrufen der Daten', error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  // Funktion zur Filterung von Items nach Standort
  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      if (route.params?.refresh) {
        getItems();
      }
    });

    return focusListener;
  }, [navigation, route]);

  return (
    <View style={[tw`flex-1 p-4 relative`]}>

      {/* Navbar */}
      <Navbar navigation={navigation} setIsOptionsMenuVisible={setIsOptionsMenuVisible} magnifyingGlassSvg={magnifyingGlassSvg} />

      {/* Suchfeld für Ort */}
      <TextInput
        style={tw`bg-gray-300 p-4 rounded-full mb-4`}
        placeholder="Ort suchen"
        value={searchLocation}
        onChangeText={(text) => {
          setSearchLocation(text);
          setFilteredItems(items.filter(item => item.location.toLowerCase().includes(text.toLowerCase())));
        }}
      />

      {/* Liste der gefilterten Gegenstände */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={tw`justify-between`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`border p-2 rounded-2xl mb-4 w-[48%] h-56`}
            onPress={() => navigation.navigate('ItemDetail', { itemId: item.id })}
          >
            <Image
              source={item.image ? { uri: item.image } : defaultImage}
              style={tw`w-full h-32 rounded-2xl mb-2`}
              resizeMode="cover"
            />
            <Text style={tw`text-center`}>{item.title}</Text>
            <Text style={tw`text-center font-bold`}>{item.reward} CHF</Text>
          </TouchableOpacity>
        )}
      />
      {/* Bottom Navigation Bar */}
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

export default Home;
