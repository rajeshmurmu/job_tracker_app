import JobCard from "@/components/JobCard"
import { jobs } from "@/lib/applications"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useCallback, useEffect, useState } from "react"
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Applications() {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")

    const [filteredJobs, setfilteredJobs] = useState<[] | any>([])


    const filterJobs = useCallback(() => {
        const finalJobs = jobs.filter((job) => {
            const matchesSearch =
                job?.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job?.position.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesStatus = statusFilter === "all" || job.status.toLowerCase() === statusFilter
            return matchesSearch && matchesStatus
        })

        setfilteredJobs(finalJobs)

    }, [searchQuery, statusFilter])

    useEffect(() => {
        filterJobs()
    }, [filterJobs, searchQuery, statusFilter])



    return (
        <SafeAreaView className="flex-1 bg-gray-50 ">
            <View className="px-6 pt-6 pb-4">
                <Text className="text-2xl font-bold text-gray-900 mb-6">All Jobs</Text>
                {/* Search Bar */}
                <View className="flex-row items-center bg-white rounded-xl px-4 py-3 shadow-sm mb-4">
                    <FontAwesome name="search" color="#6b7280" size={20} />
                    <TextInput
                        className="flex-1 ml-3 text-base"
                        placeholder="Search jobs..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                {/* Filter Buttons */}
                <FlatList
                    data={["all", "applied", "interview", "offer", "rejected"]}
                    renderItem={({ item }) => (
                        <View className="mr-2">
                            <TouchableOpacity
                                onPress={() => setStatusFilter(item)}
                                className={`px-4 py-2 rounded-full ${statusFilter === item ? "bg-blue-600" : "bg-white"}`}
                            >
                                <Text className={`font-semibold ${statusFilter === item ? "text-white" : "text-gray-600"}`}>
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    horizontal
                />
            </View>

            <FlatList
                data={filteredJobs}
                renderItem={({ item }) => <JobCard job={item} />}
                keyExtractor={(item) => item.id.toString()}
                initialNumToRender={10}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                ListEmptyComponent={() => (
                    <View className="items-center justify-center py-12">
                        <FontAwesome name="briefcase" color="#9ca3af" size={64} />
                        <Text className="text-gray-500 text-lg mt-4">No jobs found</Text>
                        <Text className="text-gray-400 text-center mt-2">
                            {searchQuery || statusFilter !== "all"
                                ? "Try adjusting your search or filters"
                                : "Add your first job application to get started"}
                        </Text>
                    </View>
                )}
            />


        </SafeAreaView>
    )
}
