import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import AuthScreen from '../pages/AuthScreen';

// move to components later cus no need in app
export default function AuthPage() {
    const { type } = useLocalSearchParams();
    const [initialForm, setInitialForm] = useState<'login' | 'signup'>('login');

    useEffect(() => {
        if (type === 'signup') {
            setInitialForm('signup');
        } else {
            setInitialForm('login');
        }
    }, [type]);

    return <AuthScreen mode={initialForm} />;
}
