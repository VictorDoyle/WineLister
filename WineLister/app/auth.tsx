import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import AuthScreen from '../components/AuthScreen';

export default function AuthPage() {
    const { type } = useLocalSearchParams(); // get the query parameter
    const [initialForm, setInitialForm] = useState<'login' | 'signup'>('login');

    useEffect(() => {
        if (type === 'signup') {
            setInitialForm('signup');
        } else {
            setInitialForm('login');
        }
    }, [type]);

    return <AuthScreen initialForm={initialForm} />;
}
