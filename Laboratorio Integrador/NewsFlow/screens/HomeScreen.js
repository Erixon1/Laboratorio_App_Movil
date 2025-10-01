import React, { useState, useEffect } from 'react';
import { View, FlatList, Button, RefreshControl } from 'react-native';
import NewsItem from '../components/NewsItem';
import { newsFeed } from '../data/news';

export default function HomeScreen({ navigation }) {
    const [news, setNews] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [intervalTime, setIntervalTime] = useState(1000);

    useEffect(() => {
        const loadInterval = async () => {
            const stored = await AsyncStorage.getItem('interval');
            if (stored) setIntervalTime(Number(stored));
        };
        loadInterval();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const next = newsFeed[Math.floor(Math.random() * newsFeed.length)];

            setNews(prev => {
                const exists = prev.some(n => n.id === next.id);
                return exists ? prev : [next, ...prev];
            });
        }, intervalTime);

        return () => clearInterval(interval);
    }, [intervalTime]);

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setNews([]);
            setRefreshing(false);
        }, 1000);
    };

    
    return (
        <View style={{ flex: 1 }}>
            <Button title="Eliminar todas" onPress={() => setNews([])} />
            <FlatList
                data={news}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <NewsItem item={item} onPress={() => navigation.navigate('Detail', { item })} />
                )}
                initialNumToRender={10}
                getItemLayout={(data, index) => ({
                    length: 70,
                    offset: 70 * index,
                    index,
                })}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
            />
        </View>
    );
}
