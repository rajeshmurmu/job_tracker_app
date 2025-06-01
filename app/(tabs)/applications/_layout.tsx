import { Stack } from 'expo-router'
import React from 'react'

export default function _layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="[id]" options={{ headerShown: true, title: "Application Details" }} />
        </Stack>
    )
}