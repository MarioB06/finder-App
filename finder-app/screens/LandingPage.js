import React from 'react';
import { View, Text, Button } from 'react-native';
import tw from 'twrnc';

export default function LandingPage({ navigation }) {
  return (
    <View style={tw`flex-1 justify-center items-center bg-white p-4`}>
      <Text style={tw`text-3xl font-bold text-center mb-6`}>Welcome to FINDER</Text>
      <Button 
        title="Get Started" 
        onPress={() => navigation.navigate('Home')} 
      />
    </View>
  );
}