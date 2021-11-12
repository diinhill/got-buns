import React, { useState, createContext, useEffect } from 'react'
import axios from 'axios'
import { getAuthHeader } from '../components/utils/Helper'
import { AllUsers, AuthContextInterface, LoginProps, RegisterProps } from '../@types'



export const AuthContext = createContext<AuthContextInterface>({
    user: null,
    register: () => {
        throw new Error('no register yet')
    },
    login: (state: LoginProps) => {
        throw new Error('no login yet')
    },
    getCurrentUser: () => {
        throw new Error('no user yet')
    },
    getAuthHeader: () => {
        throw new Error('no header yet')
    },
    logout: () => {
        throw new Error('no logout possible')
    }
})



const AuthContextProvider = (props: { children: React.ReactNode }) => {

    const [user, setUser] = useState<AllUsers.User | null>(null)

    useEffect(() => {
        getCurrentUser()
    }, [])

    const register = async (state: RegisterProps) => {
        const response = await axios.post('http://localhost:5000/api/users/register', state)
        console.log('register response:', response.data)
        return response.data
    }
    const login = async (state: LoginProps) => {
        const response: any = await axios.post('http://localhost:5000/api/users/login', state)
        console.log('login response:', response.data)
        if (response.data.token) {
            localStorage.setItem('token', response.data.token)
            return getCurrentUser()
        } else {
            return null
        }
    }
    const getCurrentUser = async () => {
        const currUser = await axios.get('http://localhost:5000/api/users/profile', { headers: getAuthHeader() })
        console.log('current user:', currUser.data)
        setUser(currUser.data)
        return currUser.data
    }
    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }


    return (
        <AuthContext.Provider value={{ user, register, login, getCurrentUser, getAuthHeader, logout }}>
            {props.children}
        </AuthContext.Provider>
    )

}
export default AuthContextProvider




