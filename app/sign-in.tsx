import FormField from '@/components/FormField'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignIn() {
    const [isSubmiting] = useState(false)
    const { control, handleSubmit, formState: { errors, } } = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    })

    return (
        <SafeAreaView>
            <ScrollView className='bg-white px-4'>
                <View
                    className='flex-1 items-center justify-center h-screen'
                >
                    {isSubmiting && <ActivityIndicator size="large" color="#5664f5" />}

                    <View className='w-full flex-1 items-center justify-center'>
                        <Text className='text-3xl font-bold text-center my-4'>
                            Sign In to Job Tracker
                        </Text>
                        <View className='space-y-4 w-full'>

                            <FormField
                                control={control} title={"Email"}
                                placeholder={"name@example.com"}
                            />

                            <FormField
                                control={control} title={"Password"}
                                placeholder={"********"}
                            />
                        </View>

                        <View className='mt-8 w-full'>
                            <TouchableOpacity className='w-full h-16 bg-blue-600 flex-row items-center justify-center rounded-3xl'>
                                <Text className='text-lg text-white font-bold'>Sign Up</Text>
                            </TouchableOpacity>
                        </View>

                        <View className='space-y-4 w-full'>

                            <Text onPress={() => router.replace("/sign-up")} className='text-gray-600 text-center my-4'>Don't have an account?
                                <Text className='text-secondary font-bold'> Sign Up</Text>
                            </Text>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}