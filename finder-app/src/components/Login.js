import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { SvgXml } from 'react-native-svg';
import { magnifyingGlassSvg } from '../../assets/svg/MagnifyingGlassSvg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    try {
      const response = await axios.post('http://192.168.1.113:3000/api/auth/login', { email, password });
      await AsyncStorage.setItem('token', response.data.token);
      console.log('Login erfolgreich');
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