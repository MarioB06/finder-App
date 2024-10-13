// AddItem.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Modal, Pressable } from 'react-native';
import tw from 'twrnc';
import { SvgXml } from 'react-native-svg';
import { magnifyingGlassSvg } from '../../assets/svg/MagnifyingGlassSvg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_API_HOST, REACT_APP_API_PORT } from '@env';
import Navbar from './includes/Navbar';
const API_BASE_URL = `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`;

const AddItem = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [locationDescription, setLocationDescription] = useState('');
    const [reward, setReward] = useState('');
    const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSaveItem = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(
                `${API_BASE_URL}/api/items`,
                {
                    title,
                    description,
                    location,
                    locationDescription,
                    reward,
                    image: "",
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
                setErrorMessage("Alle Felder bitte ausfüllen");
            } else {
                setErrorMessage('Fehler beim Speichern des Gegenstands. Bitte versuchen Sie es erneut.');
            }
            console.error('Fehler beim Speichern des Gegenstands', error);
        }
    };

    return (
        <View style={tw`flex-1 p-4`}>
            {/* Navbar */}
            <Navbar navigation={navigation} setIsOptionsMenuVisible={setIsOptionsMenuVisible} magnifyingGlassSvg={magnifyingGlassSvg} />

            {/* Options Menu Modal */}
            <Modal
                visible={isOptionsMenuVisible}
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
                        <TouchableOpacity style={tw`mb-4`}>
                            <Text style={tw`text-xl text-gray-800`}>Profil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={tw`mb-4`}>
                            <Text style={tw`text-xl text-gray-800`}>Benachrichtigungen</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={tw`mb-4`}>
                            <Text style={tw`text-xl text-gray-800`}>Über die App</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => logout()} style={tw`mb-4`}>
                            <Text style={tw`text-xl text-gray-800`}>Abmelden</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>

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