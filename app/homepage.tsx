import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { API_URL } from '@/config/config';

/* refactor to declare file */
interface User {
    name: string;
    email: string;
    // FIXME: i gotta build id on user and actually match it here after supabase
    id: string;
}

interface HomePageProps {
    user: User;
    onSignOut: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ user, onSignOut }) => {
    const router = useRouter();
    const { userid } = useLocalSearchParams();

    const handleSignOut = async () => {
        try {
            //TODO: curl signout ensure it works
            await fetch(`${API_URL}/signout`, { method: 'POST' });
            onSignOut();
        } catch (error) {
            Alert.alert('Error', 'Failed to sign out. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome, {user.name}!</Text>
            <Text style={styles.infoText}>Email: {user.email}</Text>

            <TouchableOpacity
                style={styles.button}
            //FIXME: this is gonna need proofing
            /*     onPress={() => router.push({
                    pathname: '/profile/[userid]',
                    params: { userid: userId }
                })} */
            >
                <Text style={styles.buttonText}>Go to Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={handleSignOut}
            >
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    infoText: {
        fontSize: 18,
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default HomePage;