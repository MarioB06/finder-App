import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultImage = require('../../assets/default-image.png');

const Home = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [token, setToken] = useState(null);
  
  // Daten aus der Datenbank laden
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://192.168.1.113:3000/api/items');
        setItems(response.data);
        setFilteredItems(response.data);
      } catch (error) {
        console.error('Fehler beim Laden der Daten', error);
      }
    };
    fetchItems();

    // Token aus AsyncStorage abrufen
    const getToken = async () => {
      try {        
        const userToken = await AsyncStorage.getItem('token');
        console.log(userToken);
        setToken(userToken);
      } catch (error) {
        console.error('Fehler beim Abrufen des Tokens', error);
      }
    };
    getToken();
  }, []);

  // Live-Ortsfilter
  useEffect(() => {
    const result = items.filter(item =>
      item.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setFilteredItems(result);
  }, [searchLocation, items]);

  // Toggle dropdown visibility
  const toggleFilterDropdown = () => {
    setFilterVisible(!filterVisible);
  };

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

      {/* Filter Button */}
      <TouchableOpacity
        style={tw`border p-3 rounded-full bg-gray-100 mb-4`}
        onPress={toggleFilterDropdown}
      >
        <Text style={tw`text-center`}>Filter</Text>
      </TouchableOpacity>

      {/* Filter Dropdown */}
      {filterVisible && (
        <View style={tw`border p-4 bg-gray-100 rounded-lg mb-4`}>
          <Text>Filteroptionen hier hinzufügen</Text>
          {/* Weitere Filteroptionen */}
        </View>
      )}

      {/* Liste der gefilterten Gegenstände */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item._id}
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
