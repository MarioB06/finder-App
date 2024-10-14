// OptionsMenu.js
import React from 'react';
import { Modal, Pressable, View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const OptionsMenu = ({ isVisible, setIsOptionsMenuVisible, navigation, logout }) => (
  <Modal
    visible={isVisible}
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
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={tw`mb-4`}>
          <Text style={tw`text-xl text-gray-800`}>Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('NotificationSettings')} style={tw`mb-4`}>
          <Text style={tw`text-xl text-gray-800`}>Benachrichtigungen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`mb-4`}>
          <Text style={tw`text-xl text-gray-800`}>Über die App</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logout(navigation)} style={tw`mb-4`}>
          <Text style={tw`text-xl text-gray-800`}>Abmelden</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  </Modal>
);

export default OptionsMenu;
