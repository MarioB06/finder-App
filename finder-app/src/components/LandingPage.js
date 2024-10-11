import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { SvgXml } from 'react-native-svg';
import { magnifyingGlassSvg } from '../../assets/svg/MagnifyingGlassSvg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_API_HOST, REACT_APP_API_PORT } from '@env';
const API_BASE_URL = `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`;

export default function LandingPage({ navigation }) {

  useEffect(() => {
    const navigateIfAuthenticated = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await axios.get(`${API_BASE_URL}/api/auth/check`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.status === 200) {
            navigation.navigate('Home');
          }
        }
      } catch (error) {
        console.error('Authentifizierung fehlgeschlagen', error);
      }
    };
    
    navigateIfAuthenticated();
  }, []);

  return (
    <View style={tw`flex-1 justify-start items-center bg-white p-4`}>
      {/* Logo */}
      <SvgXml xml={magnifyingGlassSvg} width="150" height="150" style={tw`mt-10 mb-6`} />

      {/* Text */}
      <Text style={tw`text-3xl font-bold text-center mb-2`}>FINDER</Text>
      <Text style={tw`text-center text-lg text-gray-600 mb-6`}>
        Der einfachste Weg, verlorene Gegenstände wiederzufinden und etwas zu verdienen!
      </Text>

      {/* Buttons */}
      <TouchableOpacity style={tw`bg-blue-500 rounded-full p-4 mb-4 w-60`} onPress={() => navigation.navigate('Register')}>
        <Text style={tw`text-white text-center`}>Registrieren</Text>
      </TouchableOpacity>
      <TouchableOpacity style={tw`bg-blue-500 rounded-full p-4 mb-4 w-60`} onPress={() => navigation.navigate('Login')}>
        <Text style={tw`text-white text-center`}>Anmelden</Text>
      </TouchableOpacity>

      {/* Link für "Über die App" */}
      <TouchableOpacity onPress={() => navigation.navigate('About')} style={tw`mt-10`}>
        <Text style={tw`text-gray-500 underline`}>Über die App</Text>
      </TouchableOpacity>
    </View>
  );
}
