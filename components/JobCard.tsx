import { IApplication } from "@/store/store";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const JobCard = ({ application }: { application: IApplication }) => (
    <TouchableOpacity

        className="bg-white rounded-xl p-4 shadow-sm mb-3"
    >
        <Link href={`/applications/${application._id}`}>
            <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                    <Text className="text-lg font-bold text-gray-900">{application.position}</Text>
                    <Text className="text-gray-600 text-base">{application.company_name}</Text>
                </View>
                <View
                    className={`px-3 py-1 rounded-full ${application?.status.toLowerCase() === "applied"
                        ? "bg-blue-100"
                        : application?.status.toLowerCase() === "interview"
                            ? "bg-orange-100"
                            : application?.status.toLowerCase() === "offer"
                                ? "bg-green-100"
                                : "bg-red-100"
                        }`}
                >
                    <Text
                        className={`text-sm font-semibold ${application?.status.toLowerCase() === "applied"
                            ? "text-blue-600"
                            : application?.status.toLowerCase() === "interview"
                                ? "text-orange-600"
                                : application?.status.toLowerCase() === "offer"
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}
                    >
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </Text>
                </View>
            </View>

            <View className="flex-row items-center gap-x-4">
                <View className="flex-row items-center">
                    <FontAwesome name="map-marker" color="#6b7280" size={16} />
                    <Text className="text-gray-600 text-sm ml-1">{application.location}</Text>
                </View>
                <View className="flex-row items-center">
                    <FontAwesome name="calendar" color="#6b7280" size={16} />
                    <Text className="text-gray-600 text-sm ml-1">{new Date(application.applied_date).toLocaleString("en-FR").split(",")[0].trim()}</Text>
                </View>
            </View>
        </Link>
    </TouchableOpacity>
)

export default JobCard