import { eye, eyeHide } from '@/constants/icons'
import React, { useState } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { Image, KeyboardTypeOptions, Text, TextInput, TouchableOpacity, View } from 'react-native'

interface FProps {
    title: string,
    name: string,
    otherStyles?: string,
    keyboardType?: KeyboardTypeOptions
    placeholder: string
    control: Control<FieldValues | any>

}

export default function FormField({ title, name, placeholder, otherStyles, keyboardType, control }: FProps) {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className={`my-2 ${otherStyles}`}>
            <Text className='text-base text-black font-medium pl-2'>{title}</Text>
            <View
                className='w-full px-4 bg-slatee-100 border-2 border-gray-300 rounded-2xl focus:border-secondary items-center flex-row '
            >
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <TextInput
                                className='flex-1 w-full text-base font-semibold focus:outline-none text-slate-900'
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                placeholderTextColor={"#808080"}
                                placeholder={placeholder}
                                keyboardType={keyboardType || "default"}
                                secureTextEntry={title === "Password" && !showPassword}
                            />
                            {title === 'Password' && name === 'password' && (
                                <TouchableOpacity
                                    onPress={() => setShowPassword(!showPassword)}
                                >
                                    <Image source={!showPassword ? eye : eyeHide} className='size-8' resizeMode='contain' />
                                </TouchableOpacity>
                            )}
                        </>
                    )}
                />
            </View>
        </View>
    )
}
