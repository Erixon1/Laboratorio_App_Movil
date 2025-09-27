import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';

export default function NewsItem({ item, onPress, rightButton }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text style={{ fontSize: 18 }}>{item.title}</Text>
      {rightButton && <Button title={rightButton.label} onPress={rightButton.onPress} />}
    </TouchableOpacity>
  );
}
