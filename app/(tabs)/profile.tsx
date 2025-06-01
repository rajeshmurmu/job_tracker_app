import FontAwesome from '@expo/vector-icons/FontAwesome'
import React, { useState } from 'react'
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Profile() {
    const [name, setName] = useState("Rajesh Murmu")
    const [loading, setLoading] = useState(false)
    const handleUpdateProfile = async () => {

        setLoading(true)
        try {
            Alert.alert("Success", "Profile updated successfully!")
        } catch (error: any) {
            Alert.alert("Error", error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Logout",
                style: "destructive",
                onPress: () => console.log("Logout Pressed"),
            },
        ])
    }
    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView className="flex-1">
                <View className="px-6 pt-6 py-4">
                    <Text className="text-2xl font-bold text-gray-900 mb-6">Profile</Text>

                    {/* Profile Picture */}
                    <View className="items-center mb-8">
                        <View className="relative w-24 h-24 bg-blue-600 rounded-full items-center justify-center mb-4">
                            <Image
                                source={{ uri: `https://avatar.iran.liara.run/username?username=Rajesh+Murmu` }}
                                className='w-full h-full rounded-full'
                            />
                            <View className='absolute bottom-0 right-0  bg-blue-100 rounded-full border-2 border-white'>
                                <TouchableOpacity className="bg-blue-100 p-2 rounded-full">
                                    <FontAwesome name='camera' color="#1e40af" size={10} />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                    {/* Profile Form */}
                    <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
                        <Text className="text-lg font-bold text-gray-900 mb-4">Personal Information</Text>

                        <View className="space-y-4">
                            <View>
                                <Text className="text-gray-700 font-medium mb-1">Display Name</Text>
                                <View className="flex-row items-center bg-gray-50 border border-gray-300 rounded-lg px-4 ">
                                    <FontAwesome name="user" color="#6b7280" size={20} />
                                    <TextInput
                                        className="flex-1 ml-3 text-base"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChangeText={setName}
                                    />
                                </View>
                            </View>

                            <View className='my-4'>
                                <Text className="text-gray-700 font-medium mb-1">Email</Text>
                                <View className="flex-row items-center bg-gray-100 border border-gray-300 rounded-lg px-4 py-3">
                                    <FontAwesome name="envelope" color="#6b7280" size={20} />
                                    <Text className="flex-1 ml-3 text-base text-gray-600">{"guest@example.com"}</Text>
                                </View>
                                <Text className="text-gray-500 text-sm mt-1">Email cannot be changed</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={handleUpdateProfile}
                            disabled={loading}
                            className="bg-blue-600 py-3 rounded-lg mt-6"
                        >
                            <Text className="text-white text-base font-semibold text-center">
                                {loading ? "Updating..." : "Update Profile"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Account Actions */}
                    <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
                        <Text className="text-lg font-bold text-gray-900 mb-4">Account</Text>

                        <TouchableOpacity onPress={handleLogout} className="flex-row items-center py-3">
                            <FontAwesome name="sign-out" color="#ef4444" size={20} />
                            <Text className="text-red-500 text-base font-medium ml-3">Logout</Text>
                        </TouchableOpacity>
                    </View>

                    {/* App Info */}
                    <View className="bg-white rounded-xl p-6 shadow-sm">
                        <Text className="text-lg font-bold text-gray-900 mb-4">About</Text>
                        <Text className="text-gray-600 text-base">JobTracker v1.0.0</Text>
                        <Text className="text-gray-500 text-sm mt-1">Track your job applications with ease</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
