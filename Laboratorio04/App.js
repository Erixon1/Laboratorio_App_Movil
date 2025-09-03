import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from './src/screens/MenuScreen';
import Ejercicio1 from './ejercicios/Ejercicio1';
import Ejercicio2 from './ejercicios/Ejercicio2';
import Ejercicio3 from './ejercicios/Ejercicio3';
import Ejercicio4 from './ejercicios/Ejercicio4';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Menu"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4285F4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Menu" 
          component={MenuScreen} 
          options={{ title: 'Menú de Ejercicios Laboratorio 04' }} 
        />
        <Stack.Screen 
          name="Ejercicio1" 
          component={Ejercicio1} 
          options={{ title: 'Ejercicio 1: Doble de un Número' }} 
        />
        <Stack.Screen 
          name="Ejercicio2" 
          component={Ejercicio2} 
          options={{ title: 'Ejercicio 2: Semáforo' }} 
        />
        <Stack.Screen 
          name="Ejercicio3" 
          component={Ejercicio3} 
          options={{ title: 'Ejercicio 3: Convertir a Mayúsculas' }} 
        />
        <Stack.Screen 
          name="Ejercicio4" 
          component={Ejercicio4} 
          options={{ title: 'Ejercicio 4: Encuesta Rápida' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
