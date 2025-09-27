import React from 'react';
import { View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Button title="Actualizar cada 3s" onPress={() => AsyncStorage.setItem('interval', '3000')} />
      <Button title="Actualizar cada 5s" onPress={() => AsyncStorage.setItem('interval', '5000')} />
      <Button title="Actualizar cada 10s" onPress={() => AsyncStorage.setItem('interval', '10000')} />
      <Button title="Resetear app" onPress={() => AsyncStorage.clear()} />
    </View>
  );
}
