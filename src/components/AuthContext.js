import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          setAuthToken(token);
          const decoded = jwtDecode(token);
          setUserData(decoded);
        }
      } catch (error) {
        console.error('Error. No se pudo cargar el token desde AsyncStorage', error);
      }
    };
    loadToken();
  }, []);

  const login = async (token) => {
    setAuthToken(token);
    await AsyncStorage.setItem('authToken', token);
    const decoded = jwtDecode(token);
    setUserData(decoded);
  };

  const logout = async () => {
    setAuthToken(null);
    setUserData(null);
    await AsyncStorage.removeItem('authToken');
  };

  const updateUserData = (newData) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  return (
    <AuthContext.Provider value={{ authToken, userData, login, logout, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
