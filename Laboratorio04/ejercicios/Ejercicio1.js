import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function Ejercicio1() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    if (number === '') {
      Alert.alert('Error', 'Por favor ingresa un número');
      return;
    }
    const doubled = parseFloat(number) * 2;
    setResult(doubled);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doble de un Número</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ingresa un número"
        value={number}
        onChangeText={setNumber}
      />
      <Button title="Calcular" onPress={handleCalculate} color="#4285F4" />
      {result !== null && <Text style={styles.result}>Resultado: {result}</Text>}
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
    backgroundColor: 'white',
    borderRadius: 8,
    fontSize: 18
  },
  result: { 
    marginTop: 20, 
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#4285F4'
  },
});