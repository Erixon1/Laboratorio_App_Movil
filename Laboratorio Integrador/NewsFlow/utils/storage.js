import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveFavorite = async (item) => {
  const stored = await AsyncStorage.getItem('favorites');
  const favorites = stored ? JSON.parse(stored) : [];
  const exists = favorites.some(fav => fav.id === item.id);
  if (!exists) {
    await AsyncStorage.setItem('favorites', JSON.stringify([...favorites, item]));
  }
};

export const getFavorites = async () => {
  const stored = await AsyncStorage.getItem('favorites');
  return stored ? JSON.parse(stored) : [];
};

export const removeFavorite = async (id) => {
  const stored = await AsyncStorage.getItem('favorites');
  const favorites = stored ? JSON.parse(stored) : [];
  const updated = favorites.filter(item => item.id !== id);
  await AsyncStorage.setItem('favorites', JSON.stringify(updated));
};

export const removeDuplicates = async () => {
  const stored = await AsyncStorage.getItem('favorites');
  const favorites = stored ? JSON.parse(stored) : [];
  const unique = [];
  const seen = new Set();
  for (const item of favorites) {
    if (!seen.has(item.id)) {
      unique.push(item);
      seen.add(item.id);
    }
  }
  await AsyncStorage.setItem('favorites', JSON.stringify(unique));
  return unique;
};

