import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { API_URL } from '@/config/config';

/* TODO: move this to a component */
type ButtonProps = {
    icon: string;
    text: string;
};

const ProfileScreen: React.FC = () => {
    const { userid } = useLocalSearchParams();
    console.error(`userId from URL: ${userid}`); // FIXME: remove

    const [user, setUser] = useState<{ name: string; username: string, userId: string } | null>(null);
    const [loading, setLoading] = useState(true);
    console.error(`user frL: ${userid}`); // FIXME: remove

    useEffect(() => {
        if (!userid) {
            console.error('Error', 'User ID is missing'); // FIXME: remove
            setLoading(false);
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch(`${API_URL}/profile/${userid}`);
                console.error(`Response status: ${response.status}`); // FIXME: remove
                const data = await response.json();
                console.error('API response data:', data); // FIXME: remove
                if (response.ok) {
                    setUser(data);
                } else {
                    console.error('Error', data.message || 'Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error', 'An unexpected error occurred.');
            } finally {
                setLoading(false);
            }
        };



        fetchUserData();
    }, [userid]);



    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
    }

    if (!user) {
        console.error(`user? ${user}, userId ${userid}`)
        return <Text style={styles.error}>User not found</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.greeting}>Hey {user.name}!</Text>
            {/*             <Image source={{ uri: user.profilePic }} style={styles.profilePic} />
 */}
            <View style={styles.buttonsContainer}>
                <View style={styles.row}>
                    <Button icon="star" text="Favorites" />
                    <Button icon="explore" text="Explore" />
                    <Button icon="star" text="Recommendations" />
                    <Button icon="note" text="Notes" />
                </View>
                <View style={styles.row}>
                    <Button icon="home" text="Homepage" />
                    <Button icon="wine" text="Wine Bars" />
                    <Button icon="recent" text="Recent" />
                    <Button icon="friends" text="Friends" />
                </View>
            </View>
        </View>
    );
};

/* FIXME: move to component asap */
const Button: React.FC<ButtonProps> = ({ icon, text }) => {
    const iconUrl = `https://api.iconify.design/mdi:${icon}.svg`; // random icons for now until design setup

    return (
        <TouchableOpacity style={styles.button}>
            <Image source={{ uri: iconUrl }} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
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
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    buttonsContainer: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        width: '22%',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        padding: 10,
    },
    buttonIcon: {
        width: 40,
        height: 40,
        marginBottom: 5,
    },
    buttonText: {
        fontSize: 12,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        color: 'red',
    },
});

export default ProfileScreen;
