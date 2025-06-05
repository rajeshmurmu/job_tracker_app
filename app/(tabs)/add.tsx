import { createApplication } from "@/lib/application-api-client"
import { applicationSchema } from "@/lib/applicationSchema"
import { toast } from "@/lib/toast"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from "react-native-safe-area-context"
import DatePicker, { useDefaultClassNames } from "react-native-ui-datepicker"
import { queryClient } from "../_layout"

interface JobFormData {
    company_name: string
    position: string
    location: string
    status: "Applied" | "Interview" | "Offer" | "Rejected"
    applied_date: Date
    salary?: string
    job_url?: string
    notes?: string
}

export default function Add() {
    const defaultClassNames = useDefaultClassNames()
    const [showStatusPicker, setShowStatusPicker] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false)


    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        reset
    } = useForm<JobFormData>({
        defaultValues: {
            status: "Applied",
            applied_date: new Date(),
            salary: "0",
            job_url: "",
            notes: "",
        },
        resolver: zodResolver(applicationSchema),
    })


    const { mutate, isPending, error, data, isSuccess, isError } = useMutation({
        mutationFn: createApplication,
    })

    const statusOptions = [
        { value: "Applied", label: "Applied" },
        { value: "Interview", label: "Interview" },
        { value: "Offer", label: "Offer" },
        { value: "Rejected", label: "Rejected" },
    ]

    const onSubmit = async (data: JobFormData) => {
        mutate(data)
    }

    useEffect(() => {
        if (isSuccess && data) {
            toast(data?.message || "Application added successfully")
            reset({
                status: "Applied",
                applied_date: new Date(),
            })
            // queryClient.invalidateQueries({ queryKey: ["applications"] })
            queryClient.refetchQueries({ queryKey: ["applications"] })

        }

        if (isError && error) {
            toast(error?.message || "Something went wrong")
        }
    }, [isSuccess, data, isError, error, reset])



    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView className="flex-1">
                <KeyboardAwareScrollView enableOnAndroid={true} scrollEnabled={true} >
                    <View className="px-6 pt-6">
                        <Text className="text-2xl font-bold text-gray-900 mb-6">Add New Job Application</Text>

                        <View className="my-2">
                            {/* Company Name */}
                            <View className="my-2">
                                <Text className="text-gray-700 font-medium mb-2">Company Name</Text>
                                <Controller
                                    control={control}
                                    name="company_name"
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
                                {errors.company_name && <Text className="text-red-500 text-sm mt-1">{errors.company_name.message}</Text>}
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
                                        <TouchableOpacity onPress={() => setShowStatusPicker(false)} className="flex-1">
                                            <View className="flex-1  px-4 items-center justify-center">
                                                <View className="w-full bg-blue-100 border border-gray-300 rounded-lg ">
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
                                        </TouchableOpacity>
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
                                    name="applied_date"
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
                                            <TouchableOpacity onPress={() => setShowDatePicker(false)} className="flex-1">
                                                <View className="flex-1 justify-center items-center px-4">
                                                    <DatePicker
                                                        mode="single"
                                                        date={getValues("applied_date")}
                                                        onChange={(dateObject) => {
                                                            setValue("applied_date", dateObject.date as Date)
                                                            setShowDatePicker(false)
                                                        }}
                                                        className="bg-blue-100 p-4 rounded-lg"
                                                        classNames={{
                                                            ...defaultClassNames,
                                                            selected: "bg-blue-500 text-white rounded-lg", selected_label: "text-white",
                                                            button_next: "bg-blue-500 text-white rounded-lg px-4 py-2",
                                                            button_prev: "bg-blue-500 text-white rounded-lg px-4 py-2",

                                                        }}

                                                    />
                                                </View>
                                            </TouchableOpacity>

                                        </Modal>
                                    )
                                }

                            </View>

                            {/* Salary */}
                            <View className="my-2">
                                <Text className="text-gray-700 font-medium mb-2">Salary
                                    <Text className="text-gray-400"> (Optional)</Text>
                                </Text>
                                <Controller
                                    control={control}
                                    name="salary"
                                    rules={{ required: "Company name is required" }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-base"
                                            placeholder="0"
                                            keyboardType="numeric"
                                            value={value}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                                {errors.salary && <Text className="text-red-500 text-sm mt-1">{errors.salary.message}</Text>}
                            </View>

                            {/* Job Url */}
                            <View className="my-2">
                                <Text className="text-gray-700 font-medium mb-2">Job Url
                                    <Text className="text-gray-400"> (Optional)</Text>
                                </Text>
                                <Controller
                                    control={control}
                                    name="job_url"
                                    rules={{ required: "Company name is required" }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-base"
                                            placeholder="https://example.com/carriers"
                                            value={value}
                                            keyboardType="url"
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                                {errors.job_url && <Text className="text-red-500 text-sm mt-1">{errors.job_url.message}</Text>}
                            </View>


                            {/* Notes */}
                            <View className="my-2">
                                <Text className="text-gray-700 font-medium mb-2">Notes
                                    <Text className="text-gray-400"> (Optional)</Text>
                                </Text>
                                <Controller
                                    control={control}
                                    name="notes"
                                    rules={{ required: "Company name is required" }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-base"
                                            placeholder="Notes..."
                                            value={value}
                                            multiline
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                                {errors.notes && <Text className="text-red-500 text-sm mt-1">{errors.notes.message}</Text>}
                            </View>



                        </View>

                        <TouchableOpacity
                            onPress={handleSubmit(onSubmit)}
                            disabled={isPending}
                            className="bg-blue-600 py-4 rounded-xl shadow-md mt-8 mb-6"
                        >
                            <Text className="text-white text-lg font-semibold text-center">
                                {isPending ? "Adding Application..." : "Add Application"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </ScrollView>
        </SafeAreaView>
    )
}
