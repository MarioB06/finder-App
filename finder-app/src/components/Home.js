import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Image, FlatList } from 'react-native';
import tw from 'twrnc';
import axios from 'axios';

const defaultImage = require('../../assets/default-image.png'); // Standardbild

const Home = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

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
  }, []);

  // Live-Ortsfilter
  useEffect(() => {
    const result = items.filter(item =>
      item.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setFilteredItems(result);
  }, [searchLocation, items]);

  return (
    <View style={tw`flex-1 p-4`}>
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
        key={(items.length > 0).toString()}  // Die Liste wird neu gerendert, wenn Items sich ändern
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
