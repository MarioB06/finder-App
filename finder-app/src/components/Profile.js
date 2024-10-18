//Profile
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

const Profile = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword] = useState('');
    const [items, setItems] = useState([]);
    const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.get(`${API_BASE_URL}/api/getUserInfo`, {
                    params: { token },
                });
                setUsername(response.data.username);
                setEmail(response.data.email);
                setMessage('');
                setErrorMessage('');
            } catch (error) {
                console.error('Fehler beim Abrufen der Benutzerdaten', error);
                setErrorMessage('Fehler beim Abrufen der Benutzerdaten.');
                setMessage('');
            }
        };

        const fetchUserItems = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const itemsResponse = await axios.get(`${API_BASE_URL}/api/MyItems`, {
                    params: { token },
                });
                setItems(itemsResponse.data);
                setMessage('');
                setErrorMessage('');
            } catch (error) {
                console.error('Fehler beim Abrufen der Gegenstände', error);
                setErrorMessage('Fehler beim Abrufen der Gegenstände.');
                setMessage('');
            }
        };

        fetchUserInfo();
        fetchUserItems();
    }, []);

    const handleSave = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(`${API_BASE_URL}/api/changeUserInfo`, {
                username,
                email,
                password,
                newPassword: newPassword,
            }, {
                params: { token },
            });
            setMessage('Profil erfolgreich aktualisiert.');
            setErrorMessage('');
        } catch (error) {
            console.error('Fehler beim Aktualisieren des Profils', error);
            setErrorMessage('Fehler beim Aktualisieren des Profils. Bitte versuchen Sie es erneut.');
            setMessage('');
        }
    };

    return (
        <View style={[tw`flex-1 p-4 relative`]}>

            {/* Navbar */}
            <Navbar navigation={navigation} setIsOptionsMenuVisible={setIsOptionsMenuVisible} magnifyingGlassSvg={magnifyingGlassSvg} />

            <ScrollView style={tw`flex-1 p-4`} showsVerticalScrollIndicator={false}>

                {/* Profil bearbeiten */}
                <View>
                    <Text style={tw`text-xl font-bold mb-4`}>Profil bearbeiten</Text>

                    <TextInput
                        style={tw`bg-gray-300 p-4 rounded-full mb-4`}
                        placeholder="Benutzername"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={tw`bg-gray-300 p-4 rounded-full mb-4`}
                        placeholder="E-Mail"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={tw`bg-gray-300 p-4 rounded-full mb-4`}
                        placeholder="Passwort"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <TextInput
                        style={tw`bg-gray-300 p-4 rounded-full mb-4`}
                        placeholder="Neues Passwort"
                        onChangeText={newPassword}
                        secureTextEntry
                    />
                    <TouchableOpacity onPress={handleSave} style={tw`bg-blue-500 p-4 rounded-full mt-6`}>
                        <Text style={tw`text-white text-center font-bold`}>Speichern</Text>
                    </TouchableOpacity>
                    {message ? <Text style={tw`text-green-500 text-center mt-4`}>{message}</Text> : null}
                    {errorMessage ? <Text style={tw`text-red-500 text-center mt-4`}>{errorMessage}</Text> : null}
                </View>

                {/* Gegenstände des Nutzers */}
                <View style={tw`pt-10`}>
                    <Text style={tw`text-xl font-bold mb-4`}>Meine Gegenstände</Text>

                    <FlatList
                        data={items}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        columnWrapperStyle={tw`justify-between`}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={tw`border p-3 rounded-2xl mb-4 w-[48%] h-56`}
                                onPress={() => navigation.navigate('ItemDetail', { itemId: item.id })}
                            >
                                <Image
                                    source={item.image ? { uri: item.image } : defaultImage}
                                    style={tw`w-full h-32 rounded-2xl mb-2`}
                                    resizeMode="cover"
                                />
                                <Text style={tw`text-center`}>{item.title}</Text>
                                <Text style={tw`text-center font-bold`}>{item.reward} CHF</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>

            </ScrollView>

            {/* Bottom Navigation Bar */}
            <BottomNavBar navigation={navigation} />
        </View>
    );
};

export default Profile;
