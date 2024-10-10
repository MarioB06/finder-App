import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { SvgXml } from 'react-native-svg';
import { magnifyingGlassSvg } from '../../assets/svg/MagnifyingGlassSvg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_API_HOST, REACT_APP_API_PORT } from '@env';
const API_BASE_URL = `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`;

const defaultImage = require('../../assets/default-image.png');
import { FlatList, Image } from 'react-native';

const Home = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [token, setToken] = useState(null);

  // Daten aus der Datenbank laden
  useEffect(() => {
    const getItems = async () => {
      try {
        const userToken = await AsyncStorage.getItem('token');
        if (userToken) {
          setToken(userToken);
          const response = await axios.get(`${API_BASE_URL}/api/items`, {
            params: { token: userToken },
          });
          setItems(response.data);
          setFilteredItems(response.data);
        }
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten', error);
      }
    };
    getItems();
  }, []);

  // Funktion zur Filterung von Items nach Standort
  useEffect(() => {
    const filtered = items.filter((item) =>
      item.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchLocation, items]);

  return (
    <View style={tw`flex-1 p-4 mt-6`}>
      <View style={tw`flex-1 p-4`}>
        {/* Zeige den Token oben an */}
        <Text style={tw`text-center mb-4`}>
          Aktuelles Token: {token ? token : 'Kein Token gefunden'}
        </Text>
        {/* Andere Inhalte der Seite */}
      </View>
      {/* Suchfeld für Ort */}
      <TextInput
        style={tw`border p-3 rounded-full text-center mb-4 bg-gray-100`}
        placeholder="Ort suchen"
        value={searchLocation}
        onChangeText={setSearchLocation}
      />

      {/* Liste der gefilterten Gegenstände */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()} // Verwende `id` anstelle von `_id`
        numColumns={2}
        columnWrapperStyle={tw`justify-between`}
        renderItem={({ item }) => (
          <View style={tw`border p-3 rounded-lg mb-4 w-[48%]`}>
            <Image
              source={item.image ? { uri: item.image } : defaultImage}
              style={tw`w-full h-24 rounded-lg mb-2`}
              resizeMode="contain"
            />
            <Text style={tw`text-center`}>{item.title}</Text>
            <Text style={tw`text-center`}>{item.reward} CHF</Text>
            <Text style={tw`text-center`}>{item.location}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Home;