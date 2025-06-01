import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import DatePicker, { useDefaultClassNames } from "react-native-ui-datepicker"

interface JobFormData {
    company: string
    position: string
    location: string
    status: "applied" | "interview" | "offer" | "rejected"
    appliedDate: Date
}

export default function Add() {
    const defaultClassNames = useDefaultClassNames()
    const [loading, setLoading] = useState(false)
    const [showStatusPicker, setShowStatusPicker] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false)


    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        getValues
    } = useForm<JobFormData>({
        defaultValues: {
            status: "applied",
            appliedDate: new Date(),
        },
    })

    const statusOptions = [
        { value: "applied", label: "Applied" },
        { value: "interview", label: "Interview" },
        { value: "offer", label: "Offer" },
        { value: "rejected", label: "Rejected" },
    ]

    const onSubmit = async (data: JobFormData) => {
        setLoading(true)
        try {
            console.log(data)
            Alert.alert("Success", "Job added successfully!")
        } catch (error: any) {
            Alert.alert("Error", error.message)
        } finally {
            setLoading(false)
        }
    }



    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView className="flex-1">
                <View className="px-6 pt-6">
                    <Text className="text-2xl font-bold text-gray-900 mb-6">Add New Job Application</Text>
                    <View className="my-2">
                        {/* Company Name */}
                        <View className="my-2">
                            <Text className="text-gray-700 font-medium mb-2">Company Name</Text>
                            <Controller
                                control={control}
                                name="company"
                                rules={{ required: "Company name is required" }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-base"
                                        placeholder="Enter company name"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                    />
                                )}
                            />
                            {errors.company && <Text className="text-red-500 text-sm mt-1">{errors.company.message}</Text>}
                        </View>

                        {/* Position */}
                        <View className="my-2">
                            <Text className="text-gray-700 font-medium mb-2">Position</Text>
                            <Controller
                                control={control}
                                name="position"
                                rules={{ required: "Position is required" }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-base"
                                        placeholder="Enter position title"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                    />
                                )}
                            />
                            {errors.position && <Text className="text-red-500 text-sm mt-1">{errors.position.message}</Text>}
                        </View>

                        {/* Location */}
                        <View className="my-2">
                            <Text className="text-gray-700 font-medium mb-2">Location</Text>
                            <Controller
                                control={control}
                                name="location"
                                rules={{ required: "Location is required" }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-base"
                                        placeholder="Enter location"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                    />
                                )}
                            />
                            {errors.location && <Text className="text-red-500 text-sm mt-1">{errors.location.message}</Text>}
                        </View>

                        {/* Status */}
                        <View className="my-2">
                            <Text className="text-gray-700 font-medium mb-2">Status</Text>
                            <Controller
                                control={control}
                                name="status"
                                render={({ field: { value } }) => (
                                    <TouchableOpacity
                                        onPress={() => setShowStatusPicker(!showStatusPicker)}
                                        className="bg-white border border-gray-300 rounded-lg px-4 py-3 "
                                    >
                                        <View className="relative flex-row items-center justify-between">
                                            <Text className="text-base text-gray-900">
                                                {statusOptions.find((option) => option.value === value)?.label}
                                            </Text>
                                            <FontAwesome name="caret-down" color="#6b7280" size={20} />

                                        </View>
                                    </TouchableOpacity>
                                )}
                            />

                            {showStatusPicker && (
                                <Modal
                                    animationType="fade"
                                    transparent
                                    visible={showStatusPicker}
                                    onRequestClose={() => setShowStatusPicker(false)}
                                    presentationStyle="overFullScreen"

                                >
                                    <View className="flex-1  px-4 items-center justify-center">
                                        <View className="w-full bg-white border border-gray-300 rounded-lg ">
                                            {statusOptions.map((option) => (
                                                <TouchableOpacity
                                                    key={option.value}
                                                    onPress={() => {
                                                        setValue("status", option.value as any)
                                                        setShowStatusPicker(false)
                                                    }}
                                                    className="px-4 py-3 border-b border-gray-100 last:border-b-0"
                                                >
                                                    <Text className="text-base text-gray-900">{option.label}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>
                                </Modal>

                            )}
                        </View>

                        {/* Applied Date */}
                        <View className="my-2">
                            <Text className="text-gray-700 font-medium mb-2">
                                Applied Date
                            </Text>
                            <Controller
                                control={control}
                                name="appliedDate"
                                render={({ field: { value } }) => (
                                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                        <View className="bg-white border border-gray-300 rounded-lg px-4 py-3 flex-row items-center">
                                            <FontAwesome name="calendar" color="#6b7280" size={20} />
                                            <Text className="text-base text-gray-900 ml-3">{value.toLocaleDateString()}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                            {
                                showDatePicker && (
                                    <Modal
                                        animationType="fade"
                                        transparent
                                        visible={showDatePicker}
                                        onRequestClose={() => setShowDatePicker(false)}
                                    >
                                        <View className="flex-1 justify-center items-center px-4">
                                            <DatePicker
                                                mode="single"
                                                date={getValues("appliedDate")}
                                                onChange={(dateObject) => {
                                                    setValue("appliedDate", dateObject.date as Date)
                                                    setShowDatePicker(false)
                                                }}
                                                className="bg-gray-300 p-4 rounded-lg"
                                                classNames={{
                                                    ...defaultClassNames,
                                                    selected: "bg-blue-500 text-white rounded-lg", selected_label: "text-white",
                                                    button_next: "bg-blue-500 text-white rounded-lg px-4 py-2",
                                                    button_prev: "bg-blue-500 text-white rounded-lg px-4 py-2",

                                                }}

                                            />
                                        </View>
                                    </Modal>
                                )
                            }

                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        disabled={loading}
                        className="bg-blue-600 py-4 rounded-xl shadow-md mt-8 mb-6"
                    >
                        <Text className="text-white text-lg font-semibold text-center">
                            {loading ? "Adding Job..." : "Add Job"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
