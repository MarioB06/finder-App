import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Modal, Pressable, Switch, ScrollView } from 'react-native';
import tw from 'twrnc';
import { SvgXml } from 'react-native-svg';
import { FlatList, Image } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

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
    const [lostItems, setLostItems] = useState(false);
    const [chatNotifications, setChatNotifications] = useState(false);
    const [fromTime, setFromTime] = useState('09:00');
    const [toTime, setToTime] = useState('21:00');
    const [token, setToken] = useState(null);
    const [message, setMessage] = useState('');
    const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (isSaving) {
            saveSettings();
        }
        const fetchSettings = async () => {
            try {
                const userToken = await AsyncStorage.getItem('token');
                setToken(userToken);
                const response = await axios.get(`${API_BASE_URL}/api/notification-settings`, {
                    params: { token: userToken },
                });
                const settings = response.data;
                setEmailNotifications(settings.email == 1 ? true : false);
                setPushNotifications(settings.push_notification == 1 ? true : false);
                setFoundItems(settings.found_items == 1 ? true : false);
                setLostItems(settings.lost_items == 1 ? true : false);
                setChatNotifications(settings.chat_notifications == 1 ? true : false);

            } catch (error) {
                console.error('Fehler beim Laden der Benachrichtigungseinstellungen', error);
            }
        };
        fetchSettings();
    }, [navigation, route, isSaving]);

    const saveSettings = async () => {
        setIsSaving(true);
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/notification-settings`,
                {
                    email: (emailNotifications ? 1 : 0),
                    push_notification: (pushNotifications ? 1 : 0),
                    found_items: (foundItems ? 1 : 0),
                    lost_items: (lostItems ? 1 : 0),
                    chat_notifications: (chatNotifications ? 1 : 0),
                },
                {
                    params: { token: token },
                }
            );
            setSuccessMessage('Benachrichtigungseinstellungen erfolgreich gespeichert.');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Fehler beim Speichern der Benachrichtigungseinstellungen.');
            setSuccessMessage('');
            console.error('Fehler beim Speichern der Benachrichtigungseinstellungen', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleSwitchChange = (setter, value) => {
        setter(value);
        setIsSaving(true);
    };

    return (
        <TouchableWithoutFeedback onPress={handleOutsideClick}>
            <View style={[tw`flex-1 p-4 relative`]}>
                {/* Navbar */}
                <Navbar navigation={navigation} setIsOptionsMenuVisible={setIsOptionsMenuVisible} magnifyingGlassSvg={magnifyingGlassSvg} />

                {/* Options Menu Modal */}
                <OptionsMenu
                    isVisible={isOptionsMenuVisible}
                    setIsOptionsMenuVisible={setIsOptionsMenuVisible}
                    navigation={navigation}
                    logout={logout}
                />

                {/* Main Content */}
                <ScrollView style={tw`p-4`}>
                    {message ? (
                        <Text style={tw`text-center mt-4 text-lg`}>{message}</Text>
                    ) : null}
                    <Text style={tw`text-2xl font-bold mb-6`}>Benachrichtigungen</Text>
                    <View style={tw`mb-4`}>
                        <Text style={tw`text-lg mb-2`}>E-Mail</Text>
                        <Switch
                            value={emailNotifications}
                            onValueChange={(value) => handleSwitchChange(setEmailNotifications, value)}
                            thumbColor={emailNotifications ? 'green' : 'red'}
                            disabled={isSaving}
                        />
                    </View>
                    <View style={tw`mb-4`}>
                        <Text style={tw`text-lg mb-2`}>Push-Benachrichtigung</Text>
                        <Switch
                            value={pushNotifications}
                            onValueChange={(value) => handleSwitchChange(setPushNotifications, value)}
                            thumbColor={pushNotifications ? 'green' : 'red'}
                            disabled={isSaving}
                        />
                    </View>
                    <Text style={tw`text-2xl font-bold mt-8 mb-6`}>Benachrichtigungstypen</Text>
                    <View style={tw`mb-4`}>
                        <Text style={tw`text-lg mb-2`}>Gefundene Gegenstände</Text>
                        <Switch
                            value={foundItems}
                            onValueChange={(value) => handleSwitchChange(setFoundItems, value)}
                            thumbColor={foundItems ? 'green' : 'red'}
                            disabled={isSaving}
                        />
                    </View>
                    <View style={tw`mb-4`}>
                        <Text style={tw`text-lg mb-2`}>Verlorene Gegenstände</Text>
                        <Switch
                            value={lostItems}
                            onValueChange={(value) => handleSwitchChange(setLostItems, value)}
                            thumbColor={lostItems ? 'green' : 'red'}
                            disabled={isSaving}
                        />
                    </View>
                    <View style={tw`mb-4`}>
                        <Text style={tw`text-lg mb-2`}>Chat - Nachrichten</Text>
                        <Switch
                            value={chatNotifications}
                            onValueChange={(value) => handleSwitchChange(setChatNotifications, value)}
                            thumbColor={chatNotifications ? 'green' : 'red'}
                            disabled={isSaving}
                        />
                    </View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>

    );
};

export default NotificationSettings;
