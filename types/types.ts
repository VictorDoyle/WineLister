// src/types/types.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    index: undefined; // skip params in homepage/index
    auth: { mode: 'login' | 'signup' }; // auth needs to know login or signup to show form properly
    homepage: undefined; // idk yet maybe later inject region/uid/different versions
    profile: { userId: string }; // userId param to show specific profiles
};

export type HomePageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'homepage'>;
export type AuthNavigationProp = NativeStackNavigationProp<RootStackParamList, 'auth'>;
export type ProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, 'profile'>;
