import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SettingsScreen({ route, navigation }) {
    const { currentLimit, onChangeLimit } = route.params;
    const options = [10, 20, 50, 100,151];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cantidad de Pokémon por página</Text>
            {options.map(option => (
                <TouchableOpacity
                    key={option}
                    style={[
                        styles.optionButton,
                        currentLimit === option && styles.selected
                    ]}
                    onPress={() => {
                        onChangeLimit(option);
                        navigation.goBack();
                    }}
                >
                    <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    optionButton: {
        padding: 15,
        backgroundColor: '#007bff',
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    selected: {
        backgroundColor: '#0056b3',
    },
    optionText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
