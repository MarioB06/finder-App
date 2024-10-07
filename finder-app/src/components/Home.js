import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { SvgXml } from 'react-native-svg';
import { magnifyingGlassSvg } from '../../assets/svg/MagnifyingGlassSvg';

export default function Home({ navigation }) {
  return (
    <View style={tw`flex-1`}>
      <View style={tw`flex-row justify-between items-center bg-white p-4 shadow`}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={tw`flex-row items-center`}>
          <SvgXml xml={magnifyingGlassSvg} width={30} height={30} />
          <Text style={tw`text-blue-500 text-lg ml-2`}>Finder</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          {/* Hier das Hamburger-Menü einfügen, falls vorhanden */}
        </TouchableOpacity>
      </View>
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-xl`}>Welcome to the Home Screen</Text>
      </View>
    </View>
  );
}
