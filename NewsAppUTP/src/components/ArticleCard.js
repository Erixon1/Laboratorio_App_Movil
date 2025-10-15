import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function ArticleCard({ article, isFavorite, onToggleFavorite }) {
    return (
        <View style={{ marginVertical: 10, padding: 10, backgroundColor: '#eee' }}>
            <Text style={{ fontWeight: 'bold' }}>{article.title}</Text>
            <Text>{article.body}</Text>
            <TouchableOpacity onPress={onToggleFavorite}>
                <Text style={{ color: isFavorite ? 'gold' : 'gray' }}>
                    {isFavorite ? '★ Favorito' : '☆ Marcar favorito'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
