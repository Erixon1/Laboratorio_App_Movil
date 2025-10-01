import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function UsersScreen({ navigation }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setUsers(response.data);
        } catch (error) {
            setError("Error al cargar usuarios. Intente recargar.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return (
        <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#007bff" />
            <Text style={styles.loadingText}>Cargando usuarios...</Text>
        </View>
    );

    if (error) return (
        <View style={styles.centerContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={fetchData} style={styles.errorButton}>
                <Text style={styles.buttonText}>Recargar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={fetchData} style={styles.button} disabled={loading}>
                <Text style={styles.buttonText}>Recargar Lista</Text>
            </TouchableOpacity>
            <Text style={styles.countText}>
                Mostrando {users.length} usuarios.
            </Text>

            <FlatList
                data={users}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('Posts', { userId: item.id, userName: item.name })}
                    >
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.info}>{item.email}</Text>
                        <Text style={styles.info}>{item.address.city}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    errorButton: {
        backgroundColor: '#ff9800',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    countText: {
        fontSize: 14,
        marginBottom: 10,
        color: '#555',
        fontWeight: '600',
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        borderLeftWidth: 5,
        borderLeftColor: '#007bff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 3,
        color: '#333'
    },
    info: {
        fontSize: 14,
        color: '#555'
    }
});