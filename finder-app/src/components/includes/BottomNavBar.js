import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

import { homeIcon } from '../../../assets/svg/homeIcon';
import { addItemIcon } from '../../../assets/svg/addItemIcon';
import { messageIcon } from '../../../assets/svg/messageIcon';
import { settingsIcon } from '../../../assets/svg/settingsIcon';
import { profileIcon } from '../../../assets/svg/profileIcon';

// import { homeIcon, addItemIcon, messageIcon, settingsIcon, profileIcon } from '../../assets/svg/Icons';

const BottomNav = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex-row justify-between items-center p-4 mb-2`}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <SvgXml xml={homeIcon} width="30" height="30" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <SvgXml xml={messageIcon} width="30" height="30" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AddItems')}>
        <SvgXml xml={addItemIcon} width="30" height="30" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('NotificationSettings')}>
        <SvgXml xml={settingsIcon} width="30" height="30" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <SvgXml xml={profileIcon} width="30" height="30" />
      </TouchableOpacity>
    </View>
  );
};


export default BottomNav;
