import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions } from 'react-native';

const products = [
    { id: '1', name: 'Nice Nature', price: 85, image: require('../../assets/Products/EvilNature.jpg') },
    { id: '2', name: 'Kitasan Black', price: 1250, image: require('../../assets/Products/HarikitteIkou.jpg') },
    { id: '3', name: 'Mambo', price: 99, image: require('../../assets/Products/mambo.jpg') },
    { id: '4', name: 'Oguri Cap', price: 450, image: require('../../assets/Products/OguriCap.jpg') },
];

const { width } = Dimensions.get('window');
const itemWidth = (width - 30) / 2; // Subtracting padding and space

const Product = () => {
    const renderProductItem = ({ item }) => (
        <View style={styles.productCard}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={[styles.productPrice, item.price > 100 && styles.priceHigh]}>
                ${item.price}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Catálogo de Productos</Text>
            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
    listContent: {
        paddingHorizontal: 10,
    },
    row: {
        justifyContent: 'space-between',
    },
    productCard: {
        width: itemWidth,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 15,
        alignItems: 'center',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    productImage: {
        width: '100%',
        height: itemWidth - 20,
        borderRadius: 8,
        resizeMode: 'cover',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },
    productPrice: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4caf50',
        marginTop: 5,
    },
    priceHigh: {
        color: 'red',
        fontWeight: 'bold',
    },
});

export default Product;