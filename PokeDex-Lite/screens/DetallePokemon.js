import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, Image } from 'react-native';
import axios from 'axios';

export default function DetallePokemon({ route, navigation }) {
    const { pokemonId, pokemonName } = route.params;
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
            const response = await axios.get(url);
            setPokemonDetails(response.data);
        } catch (error) {
            setError("Error al cargar detalles del Pokémon. Intente recargar.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        navigation.setOptions({ title: `Detalles de ${pokemonName || 'Pokémon'}` });
        fetchData();
    }, [pokemonId]);

    if (loading) return (
        <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#00bcd4" />
            <Text style={styles.loadingText}>Cargando detalles...</Text>
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

    if (!pokemonDetails) return null;

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={fetchData} style={styles.button} disabled={loading}>
                <Text style={styles.buttonText}>Recargar Detalles</Text>
            </TouchableOpacity>

            <View style={styles.header}>
                <Text style={styles.name}>{pokemonDetails.name.toUpperCase()}</Text>
                <Image 
                    source={{ uri: pokemonDetails.sprites.other['official-artwork'].front_default }} 
                    style={styles.image} 
                />
            </View>

            <Text style={styles.info}>ID: {pokemonDetails.id}</Text>
            <Text style={styles.info}>Altura: {pokemonDetails.height / 10} m</Text>
            <Text style={styles.info}>Peso: {pokemonDetails.weight / 10} kg</Text>

            <Text style={styles.sectionTitle}>Tipos:</Text>
            <View style={styles.badgeContainer}>
                <FlatList
                    data={pokemonDetails.types}
                    keyExtractor={item => item.type.name}
                    renderItem={({ item }) => (
                        <Text style={styles.badge}>{item.type.name}</Text>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <Text style={styles.sectionTitle}>Habilidades:</Text>
            <View style={styles.badgeContainer}>
                <FlatList
                    data={pokemonDetails.abilities}
                    keyExtractor={item => item.ability.name}
                    renderItem={({ item }) => (
                        <Text style={styles.badge}>{item.ability.name}</Text>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <Text style={styles.sectionTitle}>Estadísticas base:</Text>
            {pokemonDetails.stats.map(stat => (
                <Text key={stat.stat.name} style={styles.stat}>
                    {stat.stat.name}: {stat.base_stat}
                </Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
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
    header: {
        alignItems: 'center',
        marginBottom: 15,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },
    info: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 15,
        marginBottom: 8,
        color: '#007bff',
    },
    badgeContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    badge: {
        backgroundColor: '#00bcd4',
        color: '#fff',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginRight: 8,
        fontSize: 14,
        textTransform: 'capitalize',
    },
    stat: {
        fontSize: 16,
        marginBottom: 3,
        color: '#555',
    },
});
