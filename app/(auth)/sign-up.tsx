import FormField from '@/components/FormField'
import { registerUser } from '@/lib/auth-api-client'
import { signUpSchema } from '@/lib/authSchema'
import { toast } from '@/lib/toast'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from '@tanstack/react-query'
import { router } from 'expo-router'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignUp() {
    const { control, handleSubmit, formState: { errors, }, reset } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        resolver: zodResolver(signUpSchema),
    })

    const { mutate, isPending, isSuccess, isError, error, data } = useMutation({
        mutationFn: registerUser,
        onSuccess: () => reset(),
    })

    const onSubmit = (data: any) => {
        mutate({ ...data, confirmPassword: data.password })
    }

    useEffect(() => {
        if (isSuccess && data) {
            toast(data?.message || "Signup successful")
            router.replace("/sign-in")
        }

        if (isError && error) {
            toast(error?.message || "Signup failed")
        }
    }, [data, error, isError, isSuccess])

    return (
        <SafeAreaView>
            <ScrollView className='bg-white px-4'>
                <View
                    className='flex-1 items-center justify-center h-screen'
                >

                    <View className='w-full flex-1 items-center justify-center'>
                        {isPending && <ActivityIndicator size="large" color="#5664f5" />}
                        <View>
                            <FontAwesome name="briefcase" color="#1e40af" size={100} />
                        </View>
                        <Text className='text-3xl font-bold text-center my-4'>
                            Sign Up to Job Tracker
                        </Text>
                        <View className='space-y-4 w-full'>
                            <FormField
                                control={control}
                                title={"Name"}
                                name={"name"}
                                placeholder={"John Doe"}
                            />
                            {errors.name && <Text className="text-red-500 text-sm mt-1">{errors.name?.message}</Text>}

                            <FormField
                                control={control}
                                title={"Email"}
                                name={"email"}
                                keyboardType='email-address'
                                placeholder={"name@example.com"}
                            />

                            {errors.email && <Text className="text-red-500 text-sm mt-1">{errors.email?.message}</Text>}



                            <FormField
                                control={control}
                                title={"Password"}
                                name={"password"}
                                placeholder={"********"}
                            />
                            {errors.password && <Text className="text-red-500 text-sm mt-1">{errors.password?.message}</Text>}

                        </View>

                        <View className='mt-8 w-full'>
                            <TouchableOpacity disabled={isPending} onPress={handleSubmit(onSubmit)} className='w-full py-3 bg-blue-600 flex-row items-center justify-center rounded-2xl'>
                                <Text className='text-lg text-white font-bold'>Sign Up</Text>
                            </TouchableOpacity>
                        </View>

                        <View className='space-y-4 w-full'>

                            <Text className='text-gray-600 text-center my-4'>Already have an account?
                                <Text onPress={() => router.replace("/sign-in")} className='text-secondary font-bold'> Sign In</Text>
                            </Text>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}