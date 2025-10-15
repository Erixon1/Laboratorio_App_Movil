import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button } from 'react-native';
import axios from 'axios';
import ArticleCard from '../components/ArticleCard';
import useFavorites from '../hooks/useFavorites';

export default function HomeScreen({ navigation }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [error, setError] = useState(null);
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

    const { favorites, toggleFavorite, isFavorite } = useFavorites();

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setArticles(response.data);
            setLastUpdated(new Date().toLocaleString());
        } catch (err) {
            setError('Error al cargar noticias. Verifica tu conexión.');
        } finally {
            setLoading(false);
        }
    };

    const filteredArticles = showOnlyFavorites
        ? articles.filter((a) => isFavorite(a.id))
        : articles;

    return (
        <View style={{ padding: 20, flex: 1 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Noticias UTP</Text>
            <Text>Última actualización: {lastUpdated}</Text>

            <View style={{ marginVertical: 10 }}>
                <Button title="Refrescar noticias" onPress={fetchArticles} />
                <Button
                    title={showOnlyFavorites ? 'Ver todas las noticias' : 'Solo favoritos'}
                    onPress={() => setShowOnlyFavorites((prev) => !prev)}
                />
                <Button
                    title="Ir a pantalla Favoritos"
                    onPress={() => navigation.navigate('Favoritos')}
                />
            </View>

            {loading ? (
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <ActivityIndicator size="large" />
                    <Text style={{ marginTop: 10 }}>Cargando...</Text>
                </View>
            ) : error ? (
                <Text style={{ color: 'red' }}>{error}</Text>
            ) : filteredArticles.length === 0 ? (
                <Text>No hay artículos para mostrar.</Text>
            ) : (
                <FlatList
                    data={filteredArticles}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ArticleCard
                            article={item}
                            isFavorite={isFavorite(item.id)}
                            onToggleFavorite={() => toggleFavorite(item.id)}
                        />
                    )}
                />
            )}
        </View>
    );
}
