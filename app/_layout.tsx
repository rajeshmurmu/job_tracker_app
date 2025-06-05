import "@/globals.css";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="(onboarding)/index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/sign-up" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/sign-in" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </QueryClientProvider>
    </>
  )
}
