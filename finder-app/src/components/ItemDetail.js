//ItemDetails
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Modal, Pressable } from 'react-native';
import tw from 'twrnc';
import { SvgXml } from 'react-native-svg';
import { magnifyingGlassSvg } from '../../assets/svg/MagnifyingGlassSvg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_API_HOST, REACT_APP_API_PORT } from '@env';
import Navbar from './includes/Navbar';
const API_BASE_URL = `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`;

const defaultImage = require('../../assets/default-image.png');
import { FlatList, Image } from 'react-native';

const ItemDetail = ({ route, navigation }) => {
  const { itemId } = route.params;
  const [item, setItem] = useState(null);
  const [token, setToken] = useState(null);
  const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState(false);

  useEffect(() => {
    const getItem = async () => {
      try {
        const userToken = await AsyncStorage.getItem('token');
        if (userToken) {
          setToken(userToken);
          console.log(`${API_BASE_URL}/api/items/${itemId}`);
          console.log(`Bearer ${userToken}`);
          
          const response = await axios.get(`${API_BASE_URL}/api/items/${itemId}`, {
            params: { token: userToken },
          });
          setItem(response.data);
        }
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten', error);
      }
    };
    getItem();
  }, [itemId]);

  const handleOutsideClick = () => {
    if (isOptionsMenuVisible) {
      setIsOptionsMenuVisible(false);
    }
  };

  const logout = async () => {
    setIsOptionsMenuVisible(false);
    await AsyncStorage.removeItem('token');
    navigation.navigate('LandingPage');
  };

  return (
    <View style={tw`flex-1 p-4`}> 
      {/* Navbar */}
      <Navbar navigation={navigation} setIsOptionsMenuVisible={setIsOptionsMenuVisible} magnifyingGlassSvg={magnifyingGlassSvg} />

      {/* Options Menu Modal */}
      <Modal
          visible={isOptionsMenuVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsOptionsMenuVisible(false)}
        >
          <Pressable style={tw`flex-1 bg-black bg-opacity-0`} onPress={() => setIsOptionsMenuVisible(false)}>
            <View style={tw`absolute top-0 right-0 bottom-0 w-3/4 bg-white p-6 pt-15`}>
              <Text style={tw`text-lg font-bold mb-4`}>V 01.0.1</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Home')} style={tw`mb-4`}>
                <Text style={tw`text-xl text-gray-800`}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('AddItems')} style={tw`mb-4`}>
              <Text style={tw`text-xl text-gray-800`}>Gegenstand eintragen</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`mb-4`}>
                <Text style={tw`text-xl text-gray-800`}>Chats</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`mb-4`}>
                <Text style={tw`text-xl text-gray-800`}>Profil</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`mb-4`}>
                <Text style={tw`text-xl text-gray-800`}>Benachrichtigungen</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`mb-4`}>
                <Text style={tw`text-xl text-gray-800`}>Über die App</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => logout()} style={tw`mb-4`}>
                <Text style={tw`text-xl text-gray-800`}>Abmelden</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>

      {item && (
        <View style={tw`items-center p-6 bg-gray-100 rounded-xl`}>
          <Image
            source={item.image ? { uri: item.image } : require('../../assets/default-image.png')}
            style={tw`w-full h-60 rounded-xl mb-6`}
            resizeMode="cover"
          />
          <Text style={tw`text-2xl font-bold mb-2`}>{item.title}</Text>
          <Text style={tw`text-lg text-gray-600 mb-6`}>{item.description}</Text>
          <Text style={tw`text-base text-gray-600 mb-1`}>{item.location}</Text>
          <Text style={tw`text-base text-gray-600 mb-4`}>{item.location_description}</Text>
          <Text style={tw`text-lg font-bold mb-6`}>{item.reward} CHF Finderlohn</Text>
          <TouchableOpacity style={tw`bg-green-600 p-4 rounded-full w-56 shadow-lg`}>
            <Text style={tw`text-white text-center text-lg font-semibold`}>Gefunden!</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ItemDetail;
