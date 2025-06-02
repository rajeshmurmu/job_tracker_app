import { fetchApplication } from "@/lib/application-api-client"
import { toast } from "@/lib/toast"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useQuery } from "@tanstack/react-query"
import { useLocalSearchParams } from "expo-router"
import { useEffect } from "react"
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"

export default function ApplicationDetail() {
    const { id } = useLocalSearchParams()
    const { data: application, isError, isPending, isLoading, isFetching, error } = useQuery({
        queryKey: ["application", id],
        queryFn: async () => await fetchApplication(id),
        select: (data) => data?.application,
    })

    const handleDelete = () => {
        Alert.alert("Delete Job", "Are you sure you want to delete this job application?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",

            },
        ])
    }

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case "applied":
                return "bg-blue-100 text-blue-600"
            case "interview":
                return "bg-orange-100 text-orange-600"
            case "offer":
                return "bg-green-100 text-green-600"
            case "rejected":
                return "bg-red-100 text-red-500"
            default:
                return "bg-gray-100 text-gray-600"
        }
    }

    useEffect(() => {
        if (isError || error) {
            toast(error?.message || "Failed to fetch application details")
        }
    }, [error, isError])


    if (isLoading || isFetching || isPending) {
        return (
            <SafeAreaView className="flex-1 bg-gray-50">
                <ScrollView className="flex-1">
                    <View className="px-6 pt-6 justify-center items-center min-h-[80vh]">
                        <ActivityIndicator size="large" color="#1e40af" />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView className="flex-1">
                <View className="px-6 pt-6">
                    {/* Header */}
                    <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
                        <View className="items-center mb-4">
                            <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-3">
                                <FontAwesome name="briefcase" color="#1e40af" size={32} />
                            </View>
                            <Text className="text-2xl font-bold text-gray-900 text-center">{application?.position}</Text>
                            <Text className="text-lg text-gray-600 text-center">{application?.company_name}</Text>
                        </View>

                        <View className={`px-4 py-2 rounded-full self-center ${getStatusColor(application?.status)}`}>
                            <Text className={`font-semibold ${getStatusColor(application?.status)}`}>{application?.status.charAt(0).toUpperCase() + application?.status.slice(1)}</Text>
                        </View>
                    </View>

                    {/* Details */}
                    <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
                        <Text className="text-lg font-bold text-gray-900 mb-4">Job Details</Text>

                        <View className="">
                            <View className="flex-row items-center my-2">
                                <FontAwesome name="map-marker" color="#6b7280" size={20} />
                                <View className="ml-3">
                                    <Text className="text-sm text-gray-500">Location</Text>
                                    <Text className="text-base text-gray-900">{application?.location}</Text>
                                </View>
                            </View>

                            <View className="flex-row items-center my-2">
                                <FontAwesome name="calendar" color="#6b7280" size={20} />
                                <View className="ml-3">
                                    <Text className="text-sm text-gray-500">Applied Date</Text>
                                    <Text className="text-base text-gray-900">{new Date(application?.applied_date).toLocaleString("en-FR").split(",")[0]}</Text>
                                </View>
                            </View>

                            <View className="flex-row items-center my-2">
                                <FontAwesome name="briefcase" color="#6b7280" size={20} />
                                <View className="ml-3">
                                    <Text className="text-sm text-gray-500">Status</Text>
                                    <Text className="text-base text-gray-900">
                                        {application?.status.charAt(0).toUpperCase() + application?.status.slice(1)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View className="my-3">
                        <TouchableOpacity className="bg-blue-600 py-4 rounded-xl shadow-md flex-row items-center justify-center my-2">
                            <FontAwesome name="pencil" color="#ffffff" size={20} />
                            <Text className="text-white text-lg font-semibold ml-2">Edit Job</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleDelete}
                            className="bg-red-600 py-4 rounded-xl shadow-md flex-row items-center justify-center my-2"
                        >
                            <FontAwesome name="trash" color="#ffffff" size={20} />
                            <Text className="text-white text-lg font-semibold ml-2">Delete Job</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
