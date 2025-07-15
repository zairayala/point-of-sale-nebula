"use client"
import { getCurrentUser } from "@/server/auth.service"
import { UserResponse } from "@/src/schemas/auth.schema"
import { createContext, useContext, useEffect, useState } from "react"


const UserContext = createContext<UserResponse | null>(null)

export const UserClient = ({ children }: { children: React.ReactNode}) => {
    const [user, setUser] = useState<UserResponse | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getCurrentUser()
            if(user){
                setUser(user)
            }
        }
        fetchUser()
    }, [])
    
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)