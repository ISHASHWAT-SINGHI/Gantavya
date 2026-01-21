'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Check localStorage on mount
        const storedUser = localStorage.getItem('gantavya_user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    }, [])

    const login = (userData) => {
        localStorage.setItem('gantavya_user', JSON.stringify(userData))
        setUser(userData)
        router.push('/dashboard')
    }

    const logout = () => {
        localStorage.removeItem('gantavya_user')
        setUser(null)
        router.push('/login')
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
