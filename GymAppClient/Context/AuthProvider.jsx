import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import jwtDecode from 'jwt-decode'; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const savedToken = await AsyncStorage.getItem('jwtToken');
      if (savedToken) {
        const decodedToken = jwtDecode(savedToken);
        setToken(savedToken);
        setRole(decodedToken.role); 
        setIsAuthenticated(true);
      }
    };

    checkToken();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('YOUR_API_URL/login', { username, password });
      const { token } = response.data;
      await AsyncStorage.setItem('jwtToken', token);
      const decodedToken = jwtDecode(token);
      setToken(token);
      setRole(decodedToken.role); 
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed", error);
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('jwtToken');
    setToken(null);
    setRole(null); // Очищаємо роль при виході
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, role, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
