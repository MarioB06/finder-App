// AddItem.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Modal, Pressable, ScrollView } from 'react-native';
import tw from 'twrnc';
import { SvgXml } from 'react-native-svg';
import { FlatList, Image } from 'react-native';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { REACT_APP_API_HOST, REACT_APP_API_PORT } from '@env';
const API_BASE_URL = `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`;


import BottomNavBar from './includes/BottomNavBar';
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

        if (!title || !description || !location || !locationDescription || !reward) {
            setErrorMessage('Bitte fülle alle Felder aus.');
            return;
        }

        if (parseFloat(reward) < 0.5) {
            setErrorMessage('Der Finderlohn muss mindestens 0.50 CHF betragen.');
            return;
        }

        const itemData = {
            title,
            description,
            location,
            locationDescription,
            reward,
        };

        setErrorMessage(null);  // Entferne Fehlermeldung, falls zuvor angezeigt
        navigation.navigate('PaymentPage', { itemData });
    };


    return (
        <View style={[tw`flex-1 p-4 relative`]}>

            {/* Navbar */}
            <Navbar navigation={navigation} setIsOptionsMenuVisible={setIsOptionsMenuVisible} magnifyingGlassSvg={magnifyingGlassSvg} />


            <ScrollView style={tw`flex-1 p-4`} showsVerticalScrollIndicator={false}>

                <Text style={tw`text-xl font-bold mb-4`}>Gegenstand eintragen</Text>

                {/* Rückmeldungen */}
                {errorMessage && <Text style={tw`text-red-500 text-center mb-4`}>{errorMessage}</Text>}
                {successMessage && <Text style={tw`text-green-500 text-center mb-4`}>{successMessage}</Text>}

                {/* Bild hochladen (wird in einem zukünftigen Schritt hinzugefügt) */}
                <TouchableOpacity style={tw`bg-gray-300 p-4 rounded-full flex-row items-center mb-4`}>
                    <SvgXml xml={magnifyingGlassSvg} width="24" height="24" />
                    <Text style={tw`ml-2`}>Bild hochladen</Text>
                </TouchableOpacity>

                {/* Formularfelder */}
                <TextInput
                    style={tw`bg-gray-300 p-4 rounded-full mb-4`}
                    placeholder="Titel"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={tw`bg-gray-300 p-4 rounded-full mb-4`}
                    placeholder="Beschreibung"
                    value={description}
                    onChangeText={setDescription}
                />
                <TextInput
                    style={tw`bg-gray-300 p-4 rounded-full mb-4`}
                    placeholder="Standort"
                    value={location}
                    onChangeText={setLocation}
                />
                <TextInput
                    style={tw`bg-gray-300 p-4 rounded-full mb-4`}
                    placeholder="Standort Beschreibung"
                    value={locationDescription}
                    onChangeText={setLocationDescription}
                />
                <TextInput
                    style={tw`bg-gray-300 p-4 rounded-full mb-4`}
                    placeholder="Finderlohn ( min 0.50 CHF )"
                    value={reward}
                    onChangeText={setReward}
                />

                {/* Speichern Button */}
                <TouchableOpacity onPress={handleSaveItem} style={tw`bg-blue-500 p-4 rounded-full mt-6`}>
                    <Text style={tw`text-white text-center font-bold`}>Speichern</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Bottom Navigation Bar */}
            <BottomNavBar navigation={navigation} />
        </View>
    );
};

export default AddItem;