import AuthProvider from '@/store/AuthProvider';
import { useUserStore } from '@/store/store';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {

    const { isLoggedin, onboardingCompleted } = useUserStore()
    if (!isLoggedin || !onboardingCompleted) return <Redirect href="/(onboarding)" />

    return (
        <AuthProvider>
            <Tabs screenOptions={{ tabBarInactiveTintColor: '#1c1c1c', tabBarActiveTintColor: '#2563eb', headerShown: false, }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color }) =>
                            <Entypo name="home" size={24} color={color} />
                    }}
                />
                <Tabs.Screen
                    name="applications"
                    options={{
                        title: 'Applications',
                        popToTopOnBlur: true,
                        tabBarIcon: ({ color }) =>
                            <Entypo name="briefcase" size={24} color={color} />
                    }}
                />

                <Tabs.Screen
                    name="add"
                    options={{
                        title: 'Add',
                        tabBarIcon: ({ color }) =>
                            <MaterialIcons name="note-add" size={24} color={color} />
                    }}
                />

                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({ color }) =>
                            <FontAwesome name="user" size={24} color={color} />
                    }}
                />
            </Tabs>
        </AuthProvider>
    )
}
