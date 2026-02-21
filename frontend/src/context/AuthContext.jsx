/**
 * AuthContext - Contexte d'authentification
 */

import { createContext, useContext, useEffect, useState } from 'react'
import { login as apiLogin, register as apiRegister } from '../services/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser))
            } catch (e) {
                localStorage.removeItem('user')
            }
        }
        setLoading(false)
    }, [])

    const login = async (username, password) => {
        setError(null)
        setLoading(true)

        try {
            const response = await apiLogin(username, password)

            if (response.success) {
                setUser(response.user)
                localStorage.setItem('user', JSON.stringify(response.user))
                return { success: true }
            } else {
                setError(response.message)
                return { success: false, message: response.message }
            }
        } catch (err) {
            const message = 'Erreur de connexion au serveur'
            setError(message)
            return { success: false, message }
        } finally {
            setLoading(false)
        }
    }

    const register = async (userData) => {
        setError(null)
        setLoading(true)

        try {
            const response = await apiRegister(userData)

            if (response.success) {
                setUser(response.user)
                localStorage.setItem('user', JSON.stringify(response.user))
                return { success: true }
            } else {
                setError(response.message)
                return { success: false, message: response.message }
            }
        } catch (err) {
            const message = "Erreur lors de l'inscription"
            setError(message)
            return { success: false, message }
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    const isAuthenticated = !!user

    const value = {
        user,
        loading,
        error,
        isAuthenticated,
        login,
        register,
        logout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth doit être utilisé dans un AuthProvider')
    }
    return context
}

export default AuthContext
