import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LandingPage from './src/components/notAuth/LandingPage';
import Register from './src/components/notAuth/Register';
import Login from './src/components/notAuth/Login';
import Home from './src/components/Home';
import ItemDetail from './src/components/ItemDetail';
import AddItems from './src/components/addItems';
import Profile from './src/components/Profile';
import NotificationSettings from './src/components/notificationSettings';
import PaymentPage from './src/components/PaymentPage';

import { StripeProvider } from '@stripe/stripe-react-native';

// Importiere die Stripe-API-Schlüssel aus der .env-Datei
import { REACT_APP_STRIPE_PUBLISHABLE_KEY } from '@env';

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState('LandingPage');

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setInitialRoute('Home');
      }
    };

    checkToken();
  }, []);

  return (
    // StripeProvider umschließt den gesamten Bereich, um Stripe überall verfügbar zu machen
    <StripeProvider publishableKey={REACT_APP_STRIPE_PUBLISHABLE_KEY}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            animationEnabled: false,
          }}
        >
          <Stack.Screen name="LandingPage" component={LandingPage} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ItemDetail" component={ItemDetail} />
          <Stack.Screen name="AddItems" component={AddItems} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="NotificationSettings" component={NotificationSettings} />
          <Stack.Screen name="PaymentPage" component={PaymentPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}
