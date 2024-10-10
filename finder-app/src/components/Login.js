import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { SvgXml } from 'react-native-svg';
import { magnifyingGlassSvg } from '../../assets/svg/MagnifyingGlassSvg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_API_HOST, REACT_APP_API_PORT } from '@env';
const API_BASE_URL = `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`;

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Überprüfe Token bei Laden der Komponente
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

  const loginUser = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      await AsyncStorage.setItem('token', response.data.token);
      // await AsyncStorage.setItem('userID', response.data.userID);
      
      navigation.navigate('Home');
    } catch (error) {
      const errorMessage = error.response ? error.response.data : 'Error.';
      console.error(errorMessage);
    }
  };

  return (
    <View style={tw`flex-1 justify-start items-center bg-white p-4`}>
      {/* Logo */}
      <SvgXml xml={magnifyingGlassSvg} width="150" height="150" style={tw`mt-10 mb-6`} />

      {/* App Title */}
      <Text style={tw`text-3xl font-bold mb-6`}>FINDER</Text>

      {/* Email Input */}
      <TextInput
        style={tw`border border-gray-300 rounded-full w-72 p-3 mb-4 bg-gray-100`}
        placeholder="E-Mail"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <TextInput
        style={tw`border border-gray-300 rounded-full w-72 p-3 mb-4 bg-gray-100`}
        placeholder="Passwort"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <TouchableOpacity onPress={loginUser} style={tw`bg-blue-500 rounded-full p-4 w-60 mb-4`}>
        <Text style={tw`text-white text-center`}>Anmelden</Text>
      </TouchableOpacity>

      {/* Passwort vergessen */}
      <TouchableOpacity onPress={() => alert('Passwort vergessen gedrückt')}>
        <Text style={tw`text-gray-500 mb-4`}>Passwort vergessen?</Text>
      </TouchableOpacity>

      {/* Noch keinen Konto */}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={tw`text-gray-500 underline`}>Noch keinen Konto?</Text>
      </TouchableOpacity>
    </View>
  );
}
