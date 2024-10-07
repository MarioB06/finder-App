import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const registerUser = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        email,
        password,
        passwordConfirm,
      });
      console.log(response.data); // Erfolgsmeldung
    } catch (error) {
      console.error(error.response.data); // Fehlermeldung
    }
  };

  return (
    <View>
      <TextInput placeholder="E-Mail" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Passwort" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput placeholder="Passwort bestätigen" secureTextEntry value={passwordConfirm} onChangeText={setPasswordConfirm} />
      <Button title="Registrieren" onPress={registerUser} />
    </View>
  );
};

export default Register;
