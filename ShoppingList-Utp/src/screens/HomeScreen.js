import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemRow from '../components/ItemRow';
import { ThemeContext } from '../context/DarkMode';

export default function HomeScreen() {
    const { darkMode } = useContext(ThemeContext);
    const [item, setItem] = useState('');
    const [qty, setQty] = useState('');
    const [list, setList] = useState([]);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const loadList = async () => {
            const data = await AsyncStorage.getItem('shoppingList');
            if (data) setList(JSON.parse(data));
        };
        loadList();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('shoppingList', JSON.stringify(list));
    }, [list]);

    const addItem = () => {
        if (!item.trim()) return;
        if (!qty.match(/^\d+$/)) return;

        if (editingId) {
            const updatedList = list.map(i =>
                i.id === editingId ? { ...i, title: item, quantity: qty } : i
            );
            setList(updatedList);
            setEditingId(null);
        } else {
            const newItem = {
                id: Date.now().toString(),
                title: item,
                quantity: qty,
                done: false,
                createdAt: new Date().toLocaleString(),
            };
            setList([...list, newItem]);
        }

        setItem('');
        setQty('');
    };

    const toggleItem = (id) => {
        setList(list.map(i => i.id === id ? { ...i, done: !i.done } : i));
    };

    const removeItem = (id) => {
        setList(list.filter(i => i.id !== id));
        if (editingId === id) {
            setEditingId(null);
            setItem('');
            setQty('');
        }
    };

    const removeQuantity = (id) => {
        setList(list.map(i => {
            if (i.id === id) {
                const currentQty = parseInt(i.quantity);
                const newQty = currentQty > 1 ? currentQty - 1 : '';
                return { ...i, quantity: newQty.toString() };
            }
            return i;
        }));
    };


    const confirmClearAll = async () => {
        try {
            await AsyncStorage.removeItem('shoppingList');
            setList([]);
            setEditingId(null);
            setItem('');
            setQty('');
            Alert.alert('Lista borrada', 'Todos los productos han sido eliminados.');
        } catch (error) {
            Alert.alert('Error', 'No se pudo borrar la lista.');
        }
    };

    const clearAll = () => {
        Alert.alert('Confirmación', '¿Deseas borrar toda la lista?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Sí', onPress: confirmClearAll }
        ]);
    };

    const startEdit = (id) => {
        const product = list.find(i => i.id === id);
        if (product) {
            setItem(product.title);
            setQty(product.quantity);
            setEditingId(id);
        }
    };

    const total = list.length;
    const done = list.filter(i => i.done).length;
    const pending = total - done;

    return (
        <View style={[styles.container, darkMode && styles.dark]}>
            {editingId && (
                <Text style={[styles.editingLabel, darkMode && styles.textDark]}>
                    Editando producto...
                </Text>
            )}
            <TextInput
                placeholder="Producto"
                value={item}
                onChangeText={setItem}
                style={[styles.input, darkMode && styles.inputDark]}
                placeholderTextColor={darkMode ? '#ccc' : '#000'}
            />
            <TextInput
                placeholder="Cantidad"
                value={qty}
                onChangeText={(text) => {
                    const onlyNumbers = text.replace(/[^0-9]/g, '');
                    setQty(onlyNumbers);
                }}
                keyboardType="numeric"
                style={[styles.input, darkMode && styles.inputDark]}
                placeholderTextColor={darkMode ? '#ccc' : '#000'}
            />
            <Button
                title={editingId ? "Guardar cambios" : "Agregar"}
                onPress={addItem}
            />

            {list.length === 0 && (
                <Text style={[styles.emptyMessage, darkMode && styles.textDark]}>
                    La lista está vacía. Agrega productos para comenzar.
                </Text>
            )}
            <FlatList
                data={list}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <ItemRow
                        item={item}
                        onToggle={toggleItem}
                        onRemove={removeItem}
                        onEdit={startEdit}
                        onRemoveQuantity={removeQuantity}
                    />
                )}
            />
            <Button title="Borrar todo" color="red" onPress={clearAll} />
            <Text style={[styles.footer, darkMode && styles.textDark]}>
                Total: {total} | Pendientes: {pending} | Comprados: {done}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        backgroundColor: '#fff',
    },
    dark: {
        backgroundColor: '#222',
    },
    input: {
        borderWidth: 1,
        marginVertical: 5,
        padding: 8,
        borderRadius: 5,
        color: '#000',
    },
    inputDark: {
        backgroundColor: '#444',
        color: '#fff',
        borderColor: '#666',
    },
    editingLabel: {
        marginBottom: 5,
        fontStyle: 'italic',
        color: '#333',
    },
    footer: {
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000',
    },
    textDark: {
        color: '#fff',
    },
    emptyMessage: {
        textAlign: 'center',
        marginVertical: 10,
        fontStyle: 'italic',
        color: '#666',
    },
});