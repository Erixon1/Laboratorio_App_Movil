import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/DarkMode';

export default function SettingsScreen() {
    const { darkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <View style={[styles.container, darkMode && styles.dark]}>
            <Text style={[styles.label, darkMode && styles.labelDark]}>Modo oscuro</Text>
            <Switch value={darkMode} onValueChange={toggleTheme} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    dark: {
        backgroundColor: '#333',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        color: '#000',
    },
    labelDark: {
        color: '#fff',
    },
});
