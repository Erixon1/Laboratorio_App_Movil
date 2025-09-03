import React, { useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";

export default function Ejercicio2() {
  const [color, setColor] = useState("");
  const getMessage = () => {
    switch (color) {
      case "green":
        return "¡Avanza!";
      case "red":
        return "¡Detente!";
      case "yellow":
        return "¡Precaución!";
      default:
        return "";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Semáforo</Text>
      <View style={[styles.circle, { backgroundColor: color || "gray" }]} />
      <Text style={styles.message}>{getMessage()}</Text>
      <View style={styles.buttonRow}>
        <Button title="Rojo" onPress={() => setColor("red")} color="#F44336" />
        <Button title="Amarillo" onPress={() => setColor("yellow")} color="#FFC107" />
        <Button title="Verde" onPress={() => setColor("green")} color="#4CAF50" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center",
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333'
  },
  circle: { 
    width: 150, 
    height: 150, 
    borderRadius: 75, 
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#333'
  },
  message: { 
    fontSize: 24, 
    marginBottom: 30,
    fontWeight: 'bold'
  },
  buttonRow: { 
    flexDirection: "row", 
    justifyContent: 'space-between',
    width: '80%'
  },
});