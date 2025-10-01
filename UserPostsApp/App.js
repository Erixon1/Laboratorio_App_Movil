import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import UsersScreen from './screens/UsersScreen';
import PostsScreen from './screens/PostsScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Usuarios" screenOptions={{
                headerStyle: { backgroundColor: '#007bff' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
            }}>
                <Stack.Screen
                    name="Usuarios"
                    component={UsersScreen}
                    options={{ title: 'Lista de Usuarios' }}
                />
                <Stack.Screen
                    name="Posts"
                    component={PostsScreen}
                    options={{ title: 'Publicaciones' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}