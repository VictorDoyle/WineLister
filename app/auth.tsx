import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Easing, Switch, Alert } from 'react-native';
import { API_URL } from '@/config/config';
import { useRouter, useLocalSearchParams } from 'expo-router';

const AuthScreen: React.FC = () => {
    const { type } = useLocalSearchParams();
    const [selectedForm, setSelectedForm] = useState<'login' | 'signup'>('login');
    const [formHeight] = useState(new Animated.Value(0));
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isOver21, setIsOver21] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setSelectedForm(type === 'signup' ? 'signup' : 'login');
        Animated.timing(formHeight, {
            toValue: type === 'signup' ? 300 : 200,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }, [type]);

    const handleLogin = async () => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
            const result = await response.json();
            if (response.ok) {
                const userId = result.userId;
                Alert.alert('Success', 'Login successful');
                router.push({
                    pathname: '/profile/[userid]',
                    params: { userid: userId }
                });
            } else {
                Alert.alert('Error', result.message || 'Failed to login');
            }
        } catch (error) {
            Alert.alert('Error', 'An unexpected error occurred.');
        }
    };

    const handleSignup = async () => {
        if (!isOver21 || !agreedToTerms) {
            Alert.alert('Error', 'You must confirm that you are over 21 and agree to the terms.');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    username,
                    email,
                    password,
                }),
            });
            const result = await response.json();
            console.error(`result ${result}, id ${result.userId}`);

            if (response.ok) {
                const userId = result.userId;
                if (userId) {
                    console.log('Navigating to profile with userId:', userId);
                    Alert.alert('Success', 'Signup successful');
                    router.push({
                        pathname: '/profile/[userid]',
                        params: { userid: userId }
                    });
                } else {
                    console.error('User ID is not defined');
                }

            } else {
                Alert.alert('Error', result.message || 'Failed to signup');
            }
        } catch (error) {
            Alert.alert('Error', 'An unexpected error occurred.');
        }
    };

    const renderForm = () => {
        return (
            <Animated.View style={[styles.formContainer, { height: formHeight }]}>
                {selectedForm === 'login' ? (
                    <>
                        <Text style={styles.loginPageH1}>Login</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <Text style={styles.signUpPageH1}>Sign Up</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        <View style={styles.checkboxContainer}>
                            <Switch value={isOver21} onValueChange={setIsOver21} />
                            <Text style={styles.checkboxLabel}>Yes, I am over 21</Text>
                        </View>
                        <View style={styles.checkboxContainer}>
                            <Switch value={agreedToTerms} onValueChange={setAgreedToTerms} />
                            <Text style={styles.checkboxLabel}>I agree to terms and conditions</Text>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={handleSignup}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </>
                )}
            </Animated.View>
        );
    };

    return (
        <View style={styles.container}>
            {renderForm()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    formContainer: {
        width: '80%',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 20,
        overflow: 'hidden',
    },
    loginPageH1: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    signUpPageH1: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkboxLabel: {
        marginLeft: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default AuthScreen;