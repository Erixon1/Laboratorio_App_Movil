import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import ArticleCard from '../components/ArticleCard';
import useFavorites from '../hooks/useFavorites';

export default function Favoritos() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const { favorites, isFavorite } = useFavorites();

    useEffect(() => {
        fetchArticles();
    }, [favorites]);

    const fetchArticles = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            const filtered = response.data.filter((item) => isFavorite(item.id));
            setArticles(filtered);
        } catch (error) {
            console.error('Error al cargar favoritos:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ padding: 20, flex: 1 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Favoritos</Text>
            {loading ? (
                <ActivityIndicator size="large" />
            ) : articles.length === 0 ? (
                <Text>No tienes artículos favoritos guardados.</Text>
            ) : (
                <FlatList
                    data={articles}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ArticleCard
                            article={item}
                            isFavorite={true}
                            onToggleFavorite={() => { }}
                        />
                    )}
                />
            )}
        </View>
    );
}
