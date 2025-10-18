import React, { Children, createContext, useState, useEffect, useContext, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Image, Text, StyleSheet, SafeAreaView, View, ActivityIndicator } from 'react-native';

import HomeScreen from '../tabs/HomeScreen'; 
import SettingsScreen from '../tabs/SettingsScreen';

//import { AuthContext } from './AuthContext';

import { useNavigation } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  //const { authToken, userData } = useContext(AuthContext);
  const navigation = useNavigation();

  /*if (!authToken || !userData) {
    return <ActivityIndicator size="large" color="#000" />;
  }*/
  
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
        headerShown: false, 
        tabBarActiveTintColor: '#5ec206ff',
        tabBarInactiveTintColor: '#888'
          
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Ajustes"
          component={SettingsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
    
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
    headerLeftWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 5
    },
    headerLeftText: {
      flexDirection: 'column',
      marginLeft: 11
    },
   
  });