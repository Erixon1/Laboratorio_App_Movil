import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const UserProfile = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.profileImage}
            />
            <Text style={styles.name}>Erixon Castillo</Text>
            <Text style={styles.occupation}>Desarrollador React Native</Text>
            <Text style={styles.description}>
                Ingeniero de software con experiencia en el desarrollo de aplicaciones móviles.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 40,
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    occupation: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
});

export default UserProfile;