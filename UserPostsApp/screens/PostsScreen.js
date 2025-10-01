import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function PostsScreen({ route, navigation }) {
    const { userId, userName } = route.params;
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
            const response = await axios.get(url);
            setPosts(response.data);
        } catch (error) {
            setError("Error al cargar posts. Intente recargar.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        navigation.setOptions({ title: `Posts de ${userName || 'Usuario'}` });
        fetchData();
    }, [userId]);

    if (loading) return (
        <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#00bcd4" />
            <Text style={styles.loadingText}>Cargando publicaciones...</Text>
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
                <Text style={styles.buttonText}>Recargar Posts</Text>
            </TouchableOpacity>
            <Text style={styles.countText}>
                Mostrando {posts.length} publicaciones.
            </Text>

            <FlatList
                data={posts}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text>{item.body}</Text>
                    </View>
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
        alignItems: 'center'
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
        backgroundColor: '#00bcd4',
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
        borderLeftWidth: 4,
        borderLeftColor: '#00bcd4',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 16,
        color: '#333'
    }
});