import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { SvgXml } from 'react-native-svg';
import { magnifyingGlassSvg } from '../../assets/svg/MagnifyingGlassSvg';
import axios from 'axios';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerUser = async () => {
    try {
      const response = await axios.post('http://192.168.1.113:3000/api/auth/register', { email, password, passwordConfirm: confirmPassword });
      console.log(response.data);
      navigation.navigate('Login');
    } catch (error) {
      console.error(error.response.data);
      console.error("Error");
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

      {/* Confirm Password Input */}
      <TextInput
        style={tw`border border-gray-300 rounded-full w-72 p-3 mb-4 bg-gray-100`}
        placeholder="Passwort bestätigen"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Register Button */}
      <TouchableOpacity onPress={registerUser} style={tw`bg-blue-500 rounded-full p-4 w-60 mb-4`}>
        <Text style={tw`text-white text-center`}>Registrieren</Text>
      </TouchableOpacity>

      {/* Link zum Login */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={tw`text-gray-500 underline`}>Bereits ein Konto? Anmelden</Text>
      </TouchableOpacity>
    </View>
  );
}
