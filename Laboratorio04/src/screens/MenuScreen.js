import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú de Ejercicios Laboratorio</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Ejercicio1')}
      >
        <Text style={styles.buttonText}>Ejercicio 1: Doble de un Número</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Ejercicio2')}
      >
        <Text style={styles.buttonText}>Ejercicio 2: Semáforo</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Ejercicio3')}
      >
        <Text style={styles.buttonText}>Ejercicio 3: Convertir a Mayúsculas</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Ejercicio4')}
      >
        <Text style={styles.buttonText}>Ejercicio 4: Encuesta Rápida</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333'
  },
  button: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});