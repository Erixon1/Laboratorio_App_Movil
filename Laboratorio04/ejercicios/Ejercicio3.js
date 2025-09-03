import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export default function Ejercicio3() {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Convertir a Mayúsculas</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe algo..."
        value={text}
        onChangeText={setText}
      />
      <Text style={styles.output}>{text.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  input: { 
    borderWidth: 1, 
    padding: 15, 
    marginBottom: 20,
    fontSize: 18,
    backgroundColor: 'white',
    borderRadius: 8
  },
  output: { 
    fontSize: 24,
    textAlign: 'center',
    padding: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    fontWeight: 'bold'
  },
});