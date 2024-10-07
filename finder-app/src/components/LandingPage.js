import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { SvgXml } from 'react-native-svg';
import { magnifyingGlassSvg } from '../../assets/svg/MagnifyingGlassSvg';

export default function LandingPage({ navigation }) {
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
