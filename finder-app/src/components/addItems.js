// AddItem.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Modal, Pressable } from 'react-native';
import tw from 'twrnc';
import { SvgXml } from 'react-native-svg';
import { FlatList, Image } from 'react-native';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { REACT_APP_API_HOST, REACT_APP_API_PORT } from '@env';
const API_BASE_URL = `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`;


import Navbar from './includes/Navbar';
import OptionsMenu from './includes/OptionsMenu';
import { handleOutsideClick, logout } from './includes/sharedFunctions';

import { magnifyingGlassSvg } from '../../assets/svg/MagnifyingGlassSvg';
const defaultImage = require('../../assets/default-image.png');

const AddItem = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [locationDescription, setLocationDescription] = useState('');
    const [reward, setReward] = useState('');
    const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                navigation.navigate('Login');
            }
            setIsOptionsMenuVisible(false);
        };
        checkAuthStatus();
    }, []);

    const handleSaveItem = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log(token);
            
            const response = await axios.post(
                `${API_BASE_URL}/api/items`,
                {
                    title,
                    description,
                    location,
                    locationDescription,
                    reward,
                },
                {
                    params: { token: token },
                }
            );
            if (response.status === 201) {
                setSuccessMessage('Gegenstand erfolgreich gespeichert.');
                setTimeout(() => {
                    navigation.navigate('Home', { refresh: true });
                }, 1500);
            }
        } catch (error) {
            if(error.response.status === 422){
                const validationErrors = error.response.data.errors;
                console.log(validationErrors);
                setErrorMessage("Alle Felder bitte ausfüllen");
            } else {
                console.log(error.response?.data?.message || 'Fehler beim Speichern des Gegenstands.');
                setErrorMessage('Fehler beim Speichern des Gegenstands. Bitte versuchen Sie es erneut.');
            }
            console.error('Fehler beim Speichern des Gegenstands', error);
        }
    };

    return (
        <View style={tw`flex-1 p-4`}>
            {/*Menu include*/}
  
            {/* Navbar */}
            <Navbar navigation={navigation} setIsOptionsMenuVisible={setIsOptionsMenuVisible} magnifyingGlassSvg={magnifyingGlassSvg} />

            {/* Options Menu Modal */}
            <OptionsMenu
            isVisible={isOptionsMenuVisible}
            setIsOptionsMenuVisible={setIsOptionsMenuVisible}
            navigation={navigation}
            logout={logout}
            />

            <Text style={tw`text-2xl font-bold text-center my-6`}>Neuen Gegenstand eintragen</Text>

            {/* Rückmeldungen */}
            {errorMessage && <Text style={tw`text-red-500 text-center mb-4`}>{errorMessage}</Text>}
            {successMessage && <Text style={tw`text-green-500 text-center mb-4`}>{successMessage}</Text>}

            {/* Bild hochladen (wird in einem zukünftigen Schritt hinzugefügt) */}
            <TouchableOpacity style={tw`bg-gray-100 p-4 rounded-full flex-row justify-center items-center mb-4`}>
                <SvgXml xml={magnifyingGlassSvg} width="24" height="24" />
                <Text style={tw`ml-2`}>Bild hochladen</Text>
            </TouchableOpacity>

            {/* Formularfelder */}
            <TextInput
                style={tw`bg-gray-100 p-4 rounded-full mb-4`}
                placeholder="Titel"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={tw`bg-gray-100 p-4 rounded-full mb-4`}
                placeholder="Beschreibung"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={tw`bg-gray-100 p-4 rounded-full mb-4`}
                placeholder="Standort"
                value={location}
                onChangeText={setLocation}
            />
            <TextInput
                style={tw`bg-gray-100 p-4 rounded-full mb-4`}
                placeholder="Standort Beschreibung"
                value={locationDescription}
                onChangeText={setLocationDescription}
            />
            <TextInput
                style={tw`bg-gray-100 p-4 rounded-full mb-4`}
                placeholder="Finderlohn"
                value={reward}
                onChangeText={setReward}
            />

            {/* Speichern Button */}
            <TouchableOpacity onPress={handleSaveItem} style={tw`bg-blue-500 p-4 rounded-full mt-6`}>
                <Text style={tw`text-white text-center font-bold`}>Speichern</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddItem;