import _config from '@/config/appConfig'
import { logoutUser } from '@/lib/auth-api-client'
import { toast } from '@/lib/toast'
import { deleteAvatar, updateUser } from '@/lib/user-api-client'
import { useUserStore } from '@/store/store'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useMutation } from '@tanstack/react-query'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { queryClient } from '../_layout'

const avatarDir = FileSystem.documentDirectory + "avatar/"

export default function Profile() {
    const { user, setUser, setRefreshToken, setAccessToken, setIsLoggedin, setOnboardingCompleted, accessToken } = useUserStore()
    const [name, setName] = useState(user?.name)
    const [password, setPassword] = useState("")
    const [passwordModalOpen, setPasswordModalOpen] = useState(false)
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false)
    const [avatar, setAvatar] = useState(user?.avatar)
    const [isUploading, setIsUploading] = useState(false)


    const { mutate: userUpdateMutate, data: userUpdateData, isPending: isUserUpdatePending, isSuccess: isUserUpdateSuccess, isError: isUserUpdateError, error: UpdateError } = useMutation({
        mutationFn: updateUser,
    });

    const {
        mutate: deleteAvatarMutate,
        data: deleteAvatarData,
        isSuccess: isSuccessDeleteAvatar,
        isError: isErrorDeleteAvatar,
        error: deleteAvatarError,
        isPending: isPendingDeleteAvatar,
    } = useMutation({
        mutationFn: deleteAvatar,
    });


    const handleUpdateProfile = () => {
        if (name !== user?.name && password !== "" && name !== "") {
            userUpdateMutate({ name, current_password: password })
            return
        }
        setPassword("")
        setPasswordModalOpen(false)
    }

    const { mutate, isPending, data, isError, error, isSuccess } = useMutation({
        mutationFn: logoutUser,

    })

    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Logout",
                style: "destructive",
                onPress: () => mutate(),
            },
        ])
    }

    const ensureDirExists = async () => {
        const dirInfo = await FileSystem.getInfoAsync(avatarDir);
        if (!dirInfo.exists) {
            await FileSystem.makeDirectoryAsync(avatarDir, { intermediates: true });
        }
    };

    // Upload avatar image

    const uploadAvatarImage = async (uri: string) => {
        try {
            setIsUploading(true)
            const apiUrl = `${_config.server_base_url}/api/v1/users/me/avatar`
            const response = await FileSystem.uploadAsync(
                apiUrl,
                uri,
                {
                    httpMethod: "PUT",
                    fieldName: 'avatar',
                    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${accessToken}`,
                    },

                },

            )

            if (response.status !== 200) {
                throw new Error("Failed to upload image")
            }
            toast("Image uploaded successfully")
            queryClient.refetchQueries({ queryKey: ["me"] })
        } catch (error) {
            toast("Failed to upload image")
            console.log("Error uploading image", error)
        } finally {
            setIsUploading(false)
            await FileSystem.deleteAsync(uri)
        }
    }

    // Save image to file system
    const saveImageToFileSystem = async (uri: string, ext: string) => {
        await ensureDirExists();
        const filename = new Date().getDate() + ext;
        const dest = avatarDir + filename;
        await FileSystem.copyAsync({ from: uri, to: dest });

    };


    // Capture image using camera
    const captureAvatar = async () => {
        let image = await ImagePicker.launchCameraAsync({
            mediaTypes: ["livePhotos"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        })

        if (image.canceled) {
            toast("Image selection canceled")
            return
        }

        if (!image.canceled) {
            setAvatar(image.assets[0].uri)

            // Save image to file system
            setIsUploading(true)
            await saveImageToFileSystem(image.assets[0].uri, image.assets[0].fileName?.split(".")?.[1] || ".jpg")
            uploadAvatarImage(image.assets[0].uri)


        }
    }

    // Select image from galary
    const pickAvatar = async () => {
        let image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        })

        if (image.canceled) {
            toast("Image selection canceled")
            return
        }

        if (!image.canceled) {
            setAvatar(image.assets[0].uri)

            // Save image to file system
            setIsUploading(true)
            await saveImageToFileSystem(image.assets[0].uri, image.assets[0].mimeType! || ".jpg")
            uploadAvatarImage(image.assets[0].uri)
        }
    }

    // For updating profile
    useEffect(() => {
        if (isUserUpdateSuccess && userUpdateData) {
            toast(userUpdateData?.message || "Profile updated successfully")
            setUser(userUpdateData.user)
        }

        if (isUserUpdateError && UpdateError) {
            toast(UpdateError?.message || "Failed to update Profile")
        }
    }, [isUserUpdateSuccess, userUpdateData, isUserUpdateError, UpdateError, setUser])

    // For logout
    useEffect(() => {
        if (isSuccess && data) {
            toast(data?.message || "Logout successful")
            setIsLoggedin(false)
            setUser(null)
            setRefreshToken(null)
            setAccessToken(null)
            setOnboardingCompleted(false)
            router.replace("/(onboarding)")
        }

        if (isError && error) {
            toast(error?.message || "Logout failed")
            setOnboardingCompleted(false)
            setIsLoggedin(false)
            setUser(null)
            router.replace("/(onboarding)")
        }
    }, [data, error, isError, isSuccess, setAccessToken, setIsLoggedin, setOnboardingCompleted, setRefreshToken, setUser])

    // For deleting avatar
    useEffect(() => {
        if (isSuccessDeleteAvatar && deleteAvatarData) {
            toast("Avatar Deleted successfully")
            queryClient.refetchQueries({ queryKey: ["me"] })
            setAvatar(null)
        }
        if (isErrorDeleteAvatar && deleteAvatarError) {
            toast("Failed to delete avatar")
        }
    }, [isErrorDeleteAvatar, isSuccessDeleteAvatar, deleteAvatarData, deleteAvatarError, user?.avatar])

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView className="flex-1">
                <View className="px-6 pt-6 py-4">
                    <Text className="text-2xl font-bold text-gray-900 mb-6">Profile</Text>

                    {/* Profile Picture */}
                    <View className="items-center mb-8">
                        <View className="relative w-24 h-24 bg-blue-600 rounded-full items-center justify-center mb-4">
                            {(isUploading || isPendingDeleteAvatar) && (
                                <View className='absolute top-0 left-0 h-full w-full z-10  bg-black/55 rounded-full border-2 border-white flex justify-center items-center'>
                                    <ActivityIndicator color="white" size="small" />
                                </View>
                            )}
                            <Image
                                source={{ uri: avatar || `https://avatar.iran.liara.run/username?username=${user?.name}` }}
                                className='w-full h-full rounded-full'
                            />
                            <View className='absolute bottom-0 right-0 z-20 bg-blue-100 rounded-full border-2 border-white'>
                                <TouchableOpacity disabled={isUploading} onPress={() => setIsAvatarModalOpen(true)} className="bg-blue-100 p-2 rounded-full">
                                    <FontAwesome name='camera' color="#1e40af" size={10} />
                                </TouchableOpacity>
                            </View>

                            {/* Avatar Actions Modal */}
                            <Modal
                                statusBarTranslucent
                                visible={isAvatarModalOpen}
                                animationType="fade"
                                transparent={true}
                                onRequestClose={() => setIsAvatarModalOpen(false)}
                            >
                                <TouchableOpacity onPress={() => setIsAvatarModalOpen(false)} className="flex-1 bg-black/55" activeOpacity={1}>

                                    <View className="flex-1  px-4 items-center justify-center">
                                        <View className="w-full bg-black/80 p-4 border border-gray-300 rounded-lg ">
                                            <View className="flex-row items-center justify-center gap-x-8 p-4">
                                                <View>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setIsAvatarModalOpen(false)
                                                            captureAvatar()
                                                        }}
                                                        className="bg-neutral-200 p-4 rounded-full"
                                                    >
                                                        <FontAwesome name="camera" color="#1e40af" size={20} />
                                                    </TouchableOpacity>
                                                    <Text className="text-white text-center font-bold">Capture</Text>
                                                </View>

                                                <View>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setIsAvatarModalOpen(false)
                                                            pickAvatar()
                                                        }}
                                                        className="bg-neutral-200 p-4 rounded-full"
                                                    >
                                                        <FontAwesome name="photo" color="#1e40af" size={20} />
                                                    </TouchableOpacity>
                                                    <Text className="text-white text-center font-bold">Choose</Text>
                                                </View>

                                                <View>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setIsAvatarModalOpen(false)
                                                            deleteAvatarMutate()
                                                        }}
                                                        className="bg-neutral-200 p-4 px-5 rounded-full"
                                                    >
                                                        <FontAwesome name="trash" color="#1e40af" size={20} />
                                                    </TouchableOpacity>
                                                    <Text className="text-white text-center font-bold">Delete</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                            </Modal>
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
                                    <Text className="flex-1 ml-3 text-base text-gray-600" numberOfLines={1}>{user?.email}</Text>
                                </View>
                                <Text className="text-gray-500 text-sm mt-1">Email cannot be changed</Text>
                            </View>
                        </View>

                        {/* Update Button */}
                        <TouchableOpacity
                            onPress={() => {
                                if (name !== user?.name && name !== "") {
                                    setPasswordModalOpen(true)
                                } else {
                                    toast("Edit Your Name And Try Again")
                                }
                            }}
                            disabled={isUserUpdatePending}
                            className="bg-blue-600 py-3 rounded-lg mt-6"
                        >
                            <Text className="text-white text-base font-semibold text-center">
                                {isUserUpdatePending ? "Updating..." : "Update Profile"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Account Actions */}
                    <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
                        <Text className="text-lg font-bold text-gray-900 mb-4">Account</Text>

                        <TouchableOpacity disabled={isUserUpdatePending || isPending} onPress={handleLogout} className="flex-row items-center py-3">
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

                    {/* Password Input Modal */}

                    <Modal
                        visible={passwordModalOpen}
                        onRequestClose={() => setPasswordModalOpen(false)}
                        animationType="slide"
                        transparent={true}
                    >
                        <TouchableOpacity onPress={() => setPasswordModalOpen(false)} className="flex-1">
                            <View className="flex-1  px-4 items-center justify-center">
                                <View className="w-full bg-black/80  rounded-lg p-6">

                                    <View className="space-y-4">
                                        <View>
                                            <Text className="text-blue-500 font-medium mb-1">Enter Your Password to Update Profile</Text>
                                            <View className="flex-row items-center bg-gray-50 border border-gray-300 rounded-lg px-4 ">
                                                <FontAwesome name="lock" color="#6b7280" size={20} />
                                                <TextInput
                                                    className="flex-1 ml-3 text-base"
                                                    placeholder="Enter your current password"
                                                    secureTextEntry
                                                    value={password}
                                                    onChangeText={setPassword}
                                                />
                                            </View>
                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        onPress={handleUpdateProfile}
                                        className="bg-blue-600 py-3 rounded-lg mt-6"
                                    >
                                        <Text className="text-white text-base font-semibold text-center">
                                            Continue
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
