import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Text, View } from "react-native";

export default function StatCard({ title, value, icon, color }: any) {

    return (
        <View className="bg-white rounded-xl p-4 shadow-sm flex-1 mx-1">
            <View className="flex-row items-center justify-between mb-2">
                <View className={`p-2 rounded-lg ${color}`}>
                    <FontAwesome name={icon || ""} color="#ffffff" size={20} />
                </View>
                <Text className="text-2xl font-bold text-gray-900">{value}</Text>
            </View>
            <Text className="text-gray-600 text-sm">{title}</Text>
        </View>
    )
}