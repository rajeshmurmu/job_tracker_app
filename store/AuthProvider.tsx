
import { fetchUser } from '@/lib/user-api-client'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { AuthContext } from './authContext'
import { useUserStore } from './store'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const { user, setUser } = useUserStore()
    const [loading, setLoading] = useState(false)

    const { data, isSuccess, isError, error, refetch } = useQuery({
        queryKey: ["me"],
        queryFn: fetchUser,
        select: (data) => data?.user,
    })

    useEffect(() => {
        if (isSuccess && data) {
            // toast(`Welcome Back ${user?.name || data.name}`)
            setUser(data)
        }

        if (isError && error) {
            console.log("Error fetching user:", error);
            refetch()
        }
    }, [data, error, isError, isSuccess, refetch, setUser, user?.name])

    return (
        <AuthContext.Provider value={{ loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}