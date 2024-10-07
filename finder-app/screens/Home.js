import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

export default function Home() {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-xl`}>Welcome to the Home Screen</Text>
    </View>
  );
}
