import StatCard from "@/components/StatCard";
import { fetchApplications } from "@/lib/application-api-client";
import { toast } from "@/lib/toast";
import { useUserStore } from "@/store/store";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useEffect } from "react";
import { FlatList, Image, RefreshControl, SafeAreaView, Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context"


export default function Home() {
    const { user, setApplications } = useUserStore()
    const { data: applications, isPending, isError, error, isSuccess, refetch } = useQuery({
        queryKey: ["applications"],
        queryFn: fetchApplications,
        select: (data) => data?.applications,
        placeholderData: keepPreviousData
    })



    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return "Good Morning"
        if (hour < 18) return "Good Afternoon"
        return "Good Evening"
    }

    useEffect(() => {

        if (isSuccess && applications) {
            setApplications(applications)
            toast("Applications fetched successfully")
        }

        if (isError && error) {
            toast(error?.message || "Failed to fetch applications")
        }
    }, [applications, error, isError, isSuccess, setApplications])



    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <FlatList
                ListHeaderComponent={() => (
                    <>
                        <View className="bg-blue-600 px-6 pt-10 pb-20">
                            <View className="flex-row items-center justify-between">
                                <View className="flex-1">
                                    <Text className="text-blue-100 text-lg">{getGreeting()}</Text>
                                    <Text className="text-white text-2xl font-bold">{user?.name}</Text>
                                </View>
                                <Link href={`/profile`}>
                                    <View className="w-12 h-12 bg-blue-500 rounded-full items-center justify-center">
                                        <Image
                                            source={{ uri: user?.avatar || `https://avatar.iran.liara.run/username?username=${user?.name?.replace(" ", "+")}` }}
                                            className='w-full h-full rounded-full'
                                        />
                                    </View>
                                </Link>
                            </View>
                        </View>

                        {/* Stats Cards */}
                        <View className="px-6 -mt-6 mb-6">
                            <View className="flex-row mb-4">
                                <StatCard title="Applied" value={6} icon={"briefcase"} color="bg-blue-500" />
                                <StatCard title="Interviews" value={6} icon={"calendar"} color="bg-orange-500" />
                            </View>
                            <View className="flex-row">
                                <StatCard title="Offers" value={6} icon={"check"} color="bg-green-500" />
                                <StatCard title="Rejected" value={0} icon={"bug"} color="bg-red-500" />
                            </View>
                        </View>

                        {/* Recent Activity */}
                        <View className="px-6">
                            <Text className="text-xl font-bold text-gray-900">Recent Activity</Text>

                        </View>
                    </>
                )}
                data={applications?.length > 5 ? applications.slice(0, 5) : applications}
                keyExtractor={(item) => item?._id.toString()}
                renderItem={({ item }) => (
                    <View className="px-6 my-1">
                        <View className="flex-row items-center py-4 border-b border-gray-100 last:border-b-0 px-2 bg-white rounded-lg">
                            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                                <FontAwesome name="briefcase" color="#1e40af" size={20} />
                            </View>
                            <View className="flex-1">
                                <Text className="font-semibold text-gray-900">{item.position}</Text>
                                <Text className="text-gray-600 text-sm">{item.company_name}</Text>
                            </View>
                            <View
                                className={`px-2 py-1 rounded-full ${item?.status.toLowerCase() === "applied"
                                    ? "bg-blue-100"
                                    : item?.status.toLowerCase() === "interview"
                                        ? "bg-orange-100"
                                        : item?.status.toLowerCase() === "offer"
                                            ? "bg-green-100"
                                            : "bg-red-100"
                                    }`}
                            >
                                <Text
                                    className={`text-xs font-semibold ${item?.status.toLowerCase() === "applied"
                                        ? "text-blue-600"
                                        : item?.status.toLowerCase() === "interview"
                                            ? "text-orange-600"
                                            : item?.status.toLowerCase() === "offer"
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                >
                                    {item?.status.charAt(0).toUpperCase() + item?.status.slice(1)}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
                contentContainerClassName="pb-16"
                refreshControl={<RefreshControl refreshing={isPending} onRefresh={() => refetch()} />}
                ListEmptyComponent={() => (
                    <Text className="text-gray-500 text-center py-8">
                        No jobs tracked yet. Add your first job application!
                    </Text>
                )}

            />


        </SafeAreaView>
    )
}
