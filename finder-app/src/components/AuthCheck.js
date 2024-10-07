import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthCheck = ({ children }) => {
  const [loading, setLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffect(() => {
    console.log("1");
    const checkAuth = async () => {
        console.log("2");

      const token = await AsyncStorage.getItem('token');
      if (token) {
        console.log("2");
        
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    console.log("222");

    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!isAuthenticated) {
    return (
      <View>
        <Text style={{ textAlign: 'center' }}>Unauthorized Access</Text>
      </View>
    );
  }

  return children; // Zeige die Kinder-Komponenten an
};

export default AuthCheck;
