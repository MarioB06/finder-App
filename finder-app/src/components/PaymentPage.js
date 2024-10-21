//home
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Modal, Pressable, ScrollView } from 'react-native';
import tw from 'twrnc';
import { SvgXml } from 'react-native-svg';
import { FlatList, Image } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useStripe, CardField, StripeProvider } from '@stripe/stripe-react-native';
import { REACT_APP_API_HOST, REACT_APP_API_PORT, REACT_APP_STRIPE_PUBLISHABLE_KEY } from '@env';
const API_BASE_URL = `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`;

import BottomNavBar from './includes/BottomNavBar';
import Navbar from './includes/Navbar';
import OptionsMenu from './includes/OptionsMenu';
import { handleOutsideClick, logout } from './includes/sharedFunctions';

import { magnifyingGlassSvg } from '../../assets/svg/MagnifyingGlassSvg';
const defaultImage = require('../../assets/default-image.png');

import { loadStripe } from '@stripe/stripe-js';

const PaymentPage = ({ navigation }) => {
    const [clientSecret, setClientSecret] = useState(null);
    const { itemData } = useRoute().params;
    const { confirmPayment } = useStripe();
    const [token, setToken] = useState(null);

    const checkAuthStatus = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            navigation.navigate('Login');
        }
        console.log(token);
        setToken(token);
    };


    const fetchPaymentIntentClientSecret = async () => {
        try {
            console.log(itemData.reward);
            const response = await axios.post(`${API_BASE_URL}/api/create-payment-intent`, {
                amount: itemData.reward,
            });
            setClientSecret(response.data.clientSecret);
            console.log(response.data.clientSecret);

        } catch (error) {
            console.error('Fehler beim Abrufen des clientSecret:', error);
        }
    };

    useEffect(() => {
        setClientSecret(null);
        fetchPaymentIntentClientSecret();
        checkAuthStatus();

    }, [itemData]);

    const pay = async () => {
        if (!clientSecret) {
            console.log("clientSecret nicht verfügbar");
            return;
        }

        const { error, paymentIntent } = await confirmPayment(clientSecret, {
            paymentMethodType: 'Card',
            paymentMethodData: {
                billingDetails: {
                    name: 'Test User',
                },
            },
        });

        if (error) {
            console.error('Fehler bei der Zahlung:', error.message);
        } else if (paymentIntent) {
            console.log('Zahlung erfolgreich:', paymentIntent);

            try {
                const response = await axios.post(
                    `${API_BASE_URL}/api/items`,
                    {
                        title: itemData.title,
                        description: itemData.description,
                        location: itemData.location,
                        locationDescription: itemData.locationDescription,
                        reward: itemData.reward,
                    },
                    {
                        params: { token: token },
                    }
                );
                console.log("ewqe" + response);

                if (response.status === 201) {
                    setTimeout(() => {
                        navigation.navigate('Home', { refresh: true });
                    }, 1500);
                }
            } catch (error) {
                if (error.response.status === 422) {
                    const validationErrors = error.response.data.errors;
                    console.log(validationErrors);
                    setErrorMessage("Alle Felder bitte ausfüllen");
                } else {
                    console.log(error.response?.data?.message || 'Fehler beim Speichern des Gegenstands.');
                    setErrorMessage('Fehler beim Speichern des Gegenstands. Bitte versuchen Sie es erneut.');
                }
                console.error('Fehler beim Speichern des Gegenstands', error);
            }
            console.log("r" + response);
            console.log("e" + error);

        }
    };


    return (
        <View style={tw`flex-1 p-4 relative`}>
            {/* Navbar */}
            <Navbar navigation={navigation} />

            <ScrollView style={tw`flex-1 p-4`} showsVerticalScrollIndicator={false}>
                <Text style={tw`text-xl font-bold mb-4`}>Zahlungsseite</Text>

                <View style={tw`mb-6 p-4 bg-gray-100 rounded-lg shadow`}>
                    <Text style={tw`text-lg font-semibold mb-2`}>{itemData.title}</Text>
                    <Text style={tw`text-gray-700 mb-1`}>{itemData.description}</Text>
                    <Text style={tw`text-gray-700 mb-1`}>{itemData.location}</Text>
                    <Text style={tw`text-gray-700 mb-1`}>{itemData.locationDescription}</Text>
                    <Text style={tw`text-gray-700 mb-1`}>{itemData.reward} CHF</Text>
                </View>

                {/* Karteneingabe */}
                <View style={tw`mb-6`}>
                    <Text style={tw`text-lg font-semibold mb-4`}>Kartendaten eingeben:</Text>
                    <CardField
                        postalCodeEnabled={true}
                        placeholders={{
                            number: '1234 1234 1234 1234',
                        }}
                        cardStyle={{
                            backgroundColor: '#FFFFFF',
                            textColor: '#000000',
                        }}
                        style={{
                            width: '100%',
                            height: 50,
                            marginVertical: 10,
                        }}
                        onCardChange={(cardDetails) => {
                            console.log('Kartendetails geändert:', cardDetails);
                        }}
                    />
                </View>

                <View style={tw`mb-6 p-4 bg-yellow-100 rounded-lg shadow`}>
                    <Text style={tw`text-lg font-semibold mb-2`}>Wichtige Informationen zur Finderlohnzahlung:</Text>
                    <Text style={tw`text-gray-700 mb-1`}>
                        - Der Finderlohn wird direkt bei uns hinterlegt, sobald die Zahlung abgeschlossen ist.
                    </Text>
                    <Text style={tw`text-gray-700 mb-1`}>
                        - Sobald ein Finder Ihr verlorenes Objekt zurückbringt und Sie den Erhalt bestätigen, wird der Finderlohn an den Finder ausgezahlt. Wir behalten dabei einen kleinen Anteil von X% als Servicegebühr ein.
                    </Text>
                    <Text style={tw`text-gray-700 mb-1`}>
                        - Falls Ihr verlorenes Objekt innerhalb von 15 Tagen nicht gefunden wird, wird der volle Finderlohn automatisch zurückerstattet. Allerdings behalten wir in diesem Fall einen kleinen Betrag von X% als Bearbeitungsgebühr ein.
                    </Text>
                    <Text style={tw`text-gray-700 mb-1`}>
                        - Bitte beachten Sie, dass diese Bedingungen mit der Zahlung akzeptiert werden.
                    </Text>
                </View>

                <TouchableOpacity onPress={pay} style={tw`bg-blue-500 p-4 rounded-full mt-6`}>
                    <Text style={tw`text-white text-center font-bold`}>Finderlohn hinterlegen</Text>
                </TouchableOpacity>




            </ScrollView>

            {/* Bottom Navigation Bar */}
            <BottomNavBar navigation={navigation} />
        </View>
    );
};

export default PaymentPage;