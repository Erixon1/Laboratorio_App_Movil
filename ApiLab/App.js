import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setData(response.data);
        } catch (error) {
            setError("Error al cargar datos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Usuarios desde API</Text>

            <TouchableOpacity onPress={fetchData} style={styles.button} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Cargando...' : 'Recargar Datos'}</Text>
            </TouchableOpacity>

            {error && <Text style={{color: "red"}}>{error}</Text>}

            {!loading && !error && (
                <Text style={styles.countText}>
                    Mostrando {data.length} usuarios.
                </Text>
            )}

            {loading ? (
                <Text style={styles.loadingText}>Cargando datos...</Text>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.userName}>{item.name}</Text>
                            <Text>Email: {item.email}</Text>
                            <Text>Ciudad: {item.address.city}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 50,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,        
    },
    card: {
        backgroundColor: '#e0f7fa',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,    
    },
    button: {
        backgroundColor: '#00bcd4',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 15,
        opacity: 1,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    postTitle: {        
        fontWeight: 'bold',
        marginBottom: 5,
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        paddingVertical: 20,
        color: '#757575',
    }
});