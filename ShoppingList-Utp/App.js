import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { ThemeProvider } from './src/context/DarkMode';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Lista" component={HomeScreen} />
          <Tab.Screen name="Configuración" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
