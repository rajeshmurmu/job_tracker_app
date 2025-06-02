import { useUserStore } from '@/store/store';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Redirect, router } from 'expo-router';
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';



export default function OnboardingScreen() {
  const { onboardingCompleted, isLoggedin, setOnboardingCompleted } = useUserStore()

  if (onboardingCompleted && isLoggedin) {
    return <Redirect href="/(tabs)" />
  }

  if (onboardingCompleted && !isLoggedin) {
    return <Redirect href="/sign-in" />
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6">
        <View className="items-center mb-12">
          <FontAwesome name="briefcase" color="#1e40af" size={100} />
          <Text className="text-4xl font-bold text-gray-900 mt-6">JobTracker</Text>
          <Text className="text-xl text-gray-600 mt-2 text-center">Manage Your Job Applications Effortlessly</Text>
        </View>

        <View className="w-full space-y-6 mb-12">
          <View className="flex-row items-center">
            <View className="bg-blue-100 p-3 rounded-full mr-4">
              <MaterialIcons name="note-add" size={24} color="#1e40af" />

            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-900">Track Applications</Text>
              <Text className="text-gray-600">Keep track of all your job applications in one place</Text>
            </View>
          </View>

          <View className="flex-row items-center my-4">
            <View className="bg-blue-100 p-3 rounded-full mr-4">
              <Entypo name="bar-graph" color="#1e40af" size={24} />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-900">Monitor Progress</Text>
              <Text className="text-gray-600">See your application status and interview progress</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <View className="bg-blue-100 p-3 rounded-full mr-4">
              <FontAwesome name="briefcase" color="#1e40af" size={24} />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-900">Stay Organized</Text>
              <Text className="text-gray-600">Never miss a follow-up or interview again</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            router.push("/sign-up")
            setOnboardingCompleted(true)
          }}
          className="bg-blue-600 w-full py-4 rounded-xl shadow-md">
          <Text className="text-white text-lg font-semibold text-center">Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
