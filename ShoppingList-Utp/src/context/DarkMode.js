import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      const theme = await AsyncStorage.getItem('@prefs/theme');
      if (theme === 'dark') setDarkMode(true);
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = !darkMode ? 'dark' : 'light';
    await AsyncStorage.setItem('@prefs/theme', newTheme);
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
