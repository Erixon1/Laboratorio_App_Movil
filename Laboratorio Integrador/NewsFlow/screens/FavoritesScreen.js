import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { getFavorites, removeFavorite , removeDuplicates} from '../utils/storage';
import NewsItem from '../components/NewsItem';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const load = async () => {
      const favs = await getFavorites();
      setFavorites(favs);
    };
    const focus = setInterval(load, 1000);
    return () => clearInterval(focus);
  }, []);

  useEffect(() => {
  const load = async () => {
    const cleaned = await removeDuplicates();
    setFavorites(cleaned);
  };
  const focus = setInterval(load, 1000);
  return () => clearInterval(focus);
}, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.counter}>Favoritos guardados: {favorites.length}</Text>
      </View>
      <FlatList
        data={favorites}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <NewsItem
            item={item}
            onPress={() => {}}
            rightButton={{
              label: 'Eliminar',
              onPress: async () => {
                await removeFavorite(item.id);
                setFavorites(prev => prev.filter(f => f.id !== item.id));
              },
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  counter: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
