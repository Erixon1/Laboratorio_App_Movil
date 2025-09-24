import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("todas");

  // Cargar tareas al montar
  useEffect(() => {
    const cargar = async () => {
      const data = await AsyncStorage.getItem("tasks");
      if (data) setTasks(JSON.parse(data));
    };
    cargar();
  }, []);

  // Guardar tareas y actualizar mensaje
  useEffect(() => {
    AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    const pendientes = tasks.filter(t => !t.completado).length;

    if (pendientes > 5) {
      setMessage("Demasiadas tareas pendientes");
    } else {
      setMessage(`Tareas pendientes: ${pendientes}`);
    }
  }, [tasks]);

  // Agregar tarea
  const addTask = () => {
    if (task.trim() === "") return;

    const yaExiste = tasks.some(
      t => t.text.trim().toLowerCase() === task.trim().toLowerCase()
    );
    if (yaExiste) {
      alert("Esta tarea ya existe.");
      return;
    }

    setTasks([
      ...tasks,
      {
        id: Date.now().toString(),
        text: task,
        completado: false,
        createdAt: new Date().toLocaleString()
      }
    ]);
    setTask("");
  };

  // Marcar como completada
  const toggleComplete = id => {
    setTasks(
      tasks.map(t =>
        t.id === id ? { ...t, completado: !t.completado } : t
      )
    );
  };

  // Eliminar tarea
  const deleteTask = id => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Filtros
  const filteredTasks = tasks.filter(t => {
    if (filter === "pendiente") return !t.completado;
    if (filter === "completado") return t.completado;
    return true;
  });

  // Color dinámico del mensaje según tareas pendientes
  const pendientes = tasks.filter(t => !t.completado).length;
  const mensajeColor = pendientes > 5 ? "red" : "black";

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 40 }}>
      <TextInput
        placeholder="Escribe una tarea"
        value={task}
        onChangeText={setTask}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <Button title="Agregar" onPress={addTask} />

      <Text
        style={{
          marginVertical: 10,
          color: mensajeColor,
          fontWeight: "bold"
        }}
      >
        {message}
      </Text>

      <View style={styles.filterContainer}>
        <View style={styles.filterButton}>
          <Button title="Todas" onPress={() => setFilter("todas")} />
        </View>
        <View style={styles.filterButton}>
          <Button title="Pendientes" onPress={() => setFilter("pendiente")} />
        </View>
        <View style={styles.filterButton}>
          <Button title="Completadas" onPress={() => setFilter("completado")} />
        </View>
      </View>

      <FlatList
        data={filteredTasks}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity
              onPress={() => toggleComplete(item.id)}
              style={{ flex: 1 }}
            >
              <Text
                style={{
                  textDecorationLine: item.completado ? "line-through" : "none",
                  color: item.completado ? "gray" : "black"
                }}
              >
                {item.text}
              </Text>
              <Text style={{ fontSize: 10, color: "gray" }}>
                {item.createdAt}
              </Text>
            </TouchableOpacity>
            <Button title="Eliminar" onPress={() => deleteTask(item.id)} />
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#eee",
    padding: 10,
    marginVertical: 5
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10
  },
  filterButton: {
    marginHorizontal: 5
  }

});
