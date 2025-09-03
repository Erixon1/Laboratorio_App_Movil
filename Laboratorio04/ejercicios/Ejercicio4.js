import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Ejercicio4() {
  const [answer, setAnswer] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Encuesta Rápida</Text>
      <Text style={styles.question}>¿Te gusta React Native?</Text>
      
      <View style={styles.buttonRow}>
        <Button 
          title="Sí" 
          onPress={() => setAnswer('Sí')} 
          color="#4CAF50"
        />
        <Button 
          title="No" 
          onPress={() => setAnswer('No')} 
          color="#F44336"
        />
      </View>
      
      {answer !== '' && (
        <Text style={styles.response}>Elegiste: {answer}</Text>
      )}
      
      <Button 
        title="Resetear" 
        onPress={() => setAnswer('')} 
        color="#2196F3"
      />
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
    marginBottom: 30,
    textAlign: 'center',
    color: '#333'
  },
  question: { 
    fontSize: 20, 
    marginBottom: 30,
    textAlign: 'center'
  },
  buttonRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-around',
    marginBottom: 30,
    width: '100%'
  },
  response: { 
    fontSize: 18, 
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
});