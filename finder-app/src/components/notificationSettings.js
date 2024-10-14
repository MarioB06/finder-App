import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Modal, Pressable, Switch, ScrollView } from 'react-native';
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

const NotificationSettings = ({ navigation, route }) => {
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [foundItems, setFoundItems] = useState(false);
    const [chatNotifications, setChatNotifications] = useState(false);
    const [fromTime, setFromTime] = useState('09:00');
    const [toTime, setToTime] = useState('21:00');
    const [token, setToken] = useState(null);
    const [message, setMessage] = useState('');
    const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState(false);


    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const userToken = await AsyncStorage.getItem('token');
                setToken(userToken);
                const response = await axios.get(`${API_BASE_URL}/api/notification-settings`, {
                    params: { token: userToken },
                });
                const settings = response.data;
                setEmailNotifications(settings.email);
                setPushNotifications(settings.push_notification);
                setFoundItems(settings.found_items);
                setChatNotifications(settings.chat_notifications);
                setFromTime(settings.from);
                setToTime(settings.to);
            } catch (error) {
                console.error('Fehler beim Laden der Benachrichtigungseinstellungen', error);
            }
        };
        fetchSettings();
    }, [navigation, route]);

    const saveSettings = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/notification-settings`, {
                email: emailNotifications,
                push_notification: pushNotifications,
                found_items: foundItems,
                chat_notifications: chatNotifications,
                from: fromTime,
                to: toTime,
            }, {
                params: { token: token },
            });
            setMessage('Einstellungen erfolgreich gespeichert');
        } catch (error) {
            setMessage('Fehler beim Speichern der Einstellungen');
            console.error('Fehler beim Speichern der Benachrichtigungseinstellungen', error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handleOutsideClick}>

            <ScrollView style={[tw`flex-1 p-4 relative`]}>

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

                <Text style={tw`text-2xl font-bold mb-6`}>Benachrichtigungen</Text>
                <View style={tw`mb-4`}>
                    <Text style={tw`text-lg mb-2`}>E-Mail</Text>
                    <Switch
                        value={emailNotifications}
                        onValueChange={(value) => setEmailNotifications(value)}
                        thumbColor={emailNotifications ? 'green' : 'red'}
                    />
                </View>
                <View style={tw`mb-4`}>
                    <Text style={tw`text-lg mb-2`}>Push-Benachrichtigung</Text>
                    <Switch
                        value={pushNotifications}
                        onValueChange={(value) => setPushNotifications(value)}
                        thumbColor={pushNotifications ? 'green' : 'red'}
                    />
                </View>
                <Text style={tw`text-2xl font-bold mt-8 mb-6`}>Benachrichtigungstypen</Text>
                <View style={tw`mb-4`}>
                    <Text style={tw`text-lg mb-2`}>Gefundene Gegenstände</Text>
                    <Switch
                        value={foundItems}
                        onValueChange={(value) => setFoundItems(value)}
                        thumbColor={foundItems ? 'green' : 'red'}
                    />
                </View>
                <View style={tw`mb-4`}>
                    <Text style={tw`text-lg mb-2`}>Chat - Nachrichten</Text>
                    <Switch
                        value={chatNotifications}
                        onValueChange={(value) => setChatNotifications(value)}
                        thumbColor={chatNotifications ? 'green' : 'red'}
                    />
                </View>
                <Text style={tw`text-2xl font-bold mt-8 mb-6`}>Zeitfenster</Text>
                <View style={tw`flex-row justify-between mb-4`}>
                    <View style={tw`flex-1 mr-2`}>
                        <Text style={tw`text-lg mb-2`}>Von:</Text>
                        <TextInput
                            style={tw`bg-gray-300 p-4 rounded-full mb-4`}
                            value={fromTime}
                            onChangeText={setFromTime}
                        />
                    </View>
                    <View style={tw`flex-1 ml-2`}>
                        <Text style={tw`text-lg mb-2`}>Bis:</Text>
                        <TextInput
                            style={tw`bg-gray-300 p-4 rounded-full mb-4`}
                            value={toTime}
                            onChangeText={setToTime}
                        />
                    </View>
                </View>
                <TouchableOpacity style={tw`bg-blue-500 p-4 rounded-full`} onPress={saveSettings}>
                    <Text style={tw`text-white text-center font-bold`}>Speichern</Text>
                </TouchableOpacity>
                {message ? (
                    <Text style={tw`text-center mt-4 text-lg`}>{message}</Text>
                ) : null}
            </ScrollView>
        </TouchableWithoutFeedback>

    );
};

export default NotificationSettings;