import FormField from '@/components/FormField'
import { loginUser } from '@/lib/auth-api-client'
import { signInSchema } from '@/lib/authSchema'
import { toast } from '@/lib/toast'
import { useUserStore } from '@/store/store'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { router } from 'expo-router'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignIn() {
    const { setIsLoggedin, setUser, setAccessToken, setRefreshToken } = useUserStore()

    const { control, handleSubmit, formState: { errors, }, reset } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(signInSchema)
    })

    const { mutate, isPending, isSuccess, isError, error, data } = useMutation({
        mutationFn: loginUser,
        onSuccess: () => reset(),
    })

    const onSubmit = (data: any) => {
        mutate(data)
    }

    useEffect(() => {
        if (isSuccess && data) {
            toast(data?.message || "Login successful")
            setIsLoggedin(true)
            setUser(data?.user)
            setAccessToken(data?.accessToken)
            setRefreshToken(data?.refreshToken)
            router.replace("/")
        }

        if (isError && error) {
            toast(error?.message || "Login failed")
        }
    }, [data, error, isError, isSuccess, setAccessToken, setIsLoggedin, setRefreshToken, setUser])

    return (
        <SafeAreaView>
            <KeyboardAwareScrollView className='bg-white px-4' enableOnAndroid={true} scrollEnabled={true} >


                <View
                    className='flex-1 items-center justify-center h-screen'
                >

                    <View className='w-full flex-1 items-center justify-center'>
                        {isPending && <ActivityIndicator size="large" color="#5664f5" />}
                        <View>
                            <FontAwesome name="briefcase" color="#1e40af" size={100} />
                        </View>
                        <Text className='text-3xl font-bold text-center my-4'>
                            Sign In to Job Tracker
                        </Text>
                        <View className='space-y-4 w-full'>

                            <FormField
                                control={control}
                                title={"Email"}
                                keyboardType='email-address'
                                name={"email"}
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
                                <Text className='text-lg text-white font-bold'>Sign In</Text>
                            </TouchableOpacity>
                        </View>

                        <View className='space-y-4 w-full'>

                            <Text onPress={() => router.replace("/sign-up")} className='text-gray-600 text-center my-4'>Don&apos;t have an account?
                                <Text className='text-secondary font-bold'> Sign Up</Text>
                            </Text>

                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}