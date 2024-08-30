import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Easing,
    Switch,
} from 'react-native';

interface AuthScreenProps {
    initialForm: 'login' | 'signup';
}

const AuthScreen: React.FC<AuthScreenProps> = ({ initialForm }) => {
    const [selectedForm, setSelectedForm] = useState<'login' | 'signup' | null>(null);
    const [formHeight] = useState(new Animated.Value(0));

    // idk yet wel see how to actually add these requidd checkboxes
    const [isOver21, setIsOver21] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    useEffect(() => {
        setSelectedForm(initialForm);
        Animated.timing(formHeight, {
            // 300 good atm, probs change to dynamic value == height of contents
            toValue: 300,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }, [initialForm]);

    const renderForm = () => {
        if (!selectedForm) return null;

        return (
            <Animated.View style={[styles.formContainer, { height: formHeight }]}>
                {selectedForm === 'login' ? (
                    <>
                        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
                        <TextInput style={styles.input} placeholder="Password" secureTextEntry />
                    </>
                ) : (
                    <>
                        <TextInput style={styles.input} placeholder="Name" />
                        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
                        <TextInput style={styles.input} placeholder="Password" secureTextEntry />
                        <View style={styles.checkboxContainer}>
                            <Switch value={isOver21} onValueChange={setIsOver21} />
                            <Text style={styles.checkboxLabel}>Yes, I am over 21</Text>
                        </View>
                        <View style={styles.checkboxContainer}>
                            <Switch value={agreedToTerms} onValueChange={setAgreedToTerms} />
                            <Text style={styles.checkboxLabel}>I agree to terms and conditions</Text>
                        </View>
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
});

export default AuthScreen;