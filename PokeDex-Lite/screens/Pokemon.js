import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Image, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PokemonsList({ navigation }) {
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(20);
    const [searchText, setSearchText] = useState('');

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            await AsyncStorage.setItem('pokemonLimit', limit.toString());
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
            const pokemons = response.data.results;
            const pokemonDetails = await Promise.all(
                pokemons.map(async (pokemon) => {
                    const detailsResponse = await axios.get(pokemon.url);
                    return {
                        id: detailsResponse.data.id,
                        name: pokemon.name,
                        image: detailsResponse.data.sprites.front_default,
                    };
                })
            );
            setPokemonList(pokemonDetails);
            setFilteredList(pokemonDetails);
        } catch (error) {
            setError("Error al cargar Pokémon. Intente recargar.");
        } finally {
            setLoading(false);
        }
    };

    const loadLimitFromStorage = async () => {
        const storedLimit = await AsyncStorage.getItem('pokemonLimit');
        if (storedLimit) setLimit(parseInt(storedLimit));
    };

    useEffect(() => {
        loadLimitFromStorage();
    }, []);

    useEffect(() => {
        fetchData();
    }, [limit]);

    useEffect(() => {
        const filtered = pokemonList.filter(p =>
            p.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredList(filtered);
    }, [searchText, pokemonList]);

    if (loading) return (
        <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#007bff" />
            <Text style={styles.loadingText}>Cargando Pokémon...</Text>
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

            <TouchableOpacity
                onPress={() => navigation.navigate('Settings', {
                    currentLimit: limit,
                    onChangeLimit: (newLimit) => setLimit(newLimit)
                })}
                style={[styles.button, { backgroundColor: '#28a745' }]}
            >
                <Text style={styles.buttonText}>Configuración</Text>
            </TouchableOpacity>

            <TextInput
                style={styles.searchInput}
                placeholder="Buscar por nombre..."
                value={searchText}
                onChangeText={setSearchText}
            />

            <Text style={styles.countText}>
                Mostrando {filteredList.length} Pokémon.
            </Text>

            <FlatList
                data={filteredList}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('DetallePokemon', { pokemonId: item.id, pokemonName: item.name })}
                    >
                        <Text style={styles.name}>{item.name}</Text>
                        <Image source={{ uri: item.image }} style={styles.pokemonImage} />
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
    searchInput: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        borderColor: '#ccc',
        borderWidth: 1,
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
        color: '#333',
    },
    pokemonImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginTop: 10,
    }
});
