import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PokemonList from './screens/Pokemon';
import DetallePokemon from './screens/DetallePokemon';
import Settings from './screens/Settings';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="PokemonList"
        screenOptions={{
          headerStyle: { backgroundColor: '#007bff' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="PokemonList"
          component={PokemonList}
          options={{ title: 'Pokédex' }}
        />
        <Stack.Screen
          name="DetallePokemon"
          component={DetallePokemon}
          options={{ title: 'Detalles del Pokémon' }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ title: 'Configuración' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}