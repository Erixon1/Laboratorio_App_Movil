import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ItemRow({ item, onToggle, onRemove, onEdit, onRemoveQuantity }) {
    return (
        <View style={[styles.row, item.done && styles.done]}>
            <TouchableOpacity onPress={() => onToggle(item.id)} style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
                <Text style={styles.date}>{item.createdAt}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onEdit(item.id)} style={styles.edit}>
                <Text>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onRemoveQuantity(item.id)} style={styles.actionButton}>
                <Text>➖</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.delete}>
                <Text>🗑️</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#eee',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    done: {
        backgroundColor: '#c8e6c9',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    quantity: {
        fontSize: 14,
    },
    date: {
        fontSize: 12,
        color: '#666',
    },
    actions: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    actionButton: {
        marginHorizontal: 5,
        padding: 6,
        borderRadius: 4,
    },
    icon: {
        fontSize: 18,
    },
});