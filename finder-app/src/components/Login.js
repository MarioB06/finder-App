import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token); // Token speichern
      console.log('Login erfolgreich');
    } catch (error) {
      console.error(error.response.data); // Fehlermeldung
    }
  };

  return (
    <View>
      <TextInput placeholder="E-Mail" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Passwort" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Anmelden" onPress={loginUser} />
    </View>
  );
};

export default Login;
