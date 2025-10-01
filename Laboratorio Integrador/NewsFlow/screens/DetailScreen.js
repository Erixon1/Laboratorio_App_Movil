import React from 'react';
import { View, Text, Button } from 'react-native';
import { saveFavorite } from '../utils/storage';

export default function DetailScreen({ route }) {
  const { item } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>{item.title}</Text>
      <Text>{item.content}</Text>
      <Button title="Guardar en favoritos" onPress={() => saveFavorite(item)} />
    </View>
  );
}
