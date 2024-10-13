import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LandingPage from './src/components/LandingPage';
import Register from './src/components/Register';
import Login from './src/components/Login';
import Home from './src/components/Home';
import ItemDetail from './src/components/ItemDetail';
import AddItems from './src/components/addItems';

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
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}
       screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="LandingPage" component={LandingPage} options={{ gestureEnabled: false }}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} options={{ gestureEnabled: false }}/>
        <Stack.Screen name="ItemDetail" component={ItemDetail} />
        <Stack.Screen name="AddItems" component={AddItems} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}