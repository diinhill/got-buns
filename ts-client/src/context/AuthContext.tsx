import React, { useState, createContext } from 'react'
import axios from 'axios'
import { getAuthHeader } from '../components/utils/Helper'
import { AllUsers, AuthContextInterface, LoginProps } from '../@types'


export const AuthContext = createContext<AuthContextInterface>({
    user: null,
    login: () => {
        throw new Error('no login yet')
    },
    getCurrentUser: () => {
        throw new Error('no user yet')
    },
    getAuthHeader: () => {
        throw new Error('no header yet')
    }
})


const AuthContextProvider = (props: { children: React.ReactNode }) => {

    const [user, setUser] = useState<AllUsers.User | null>(null)


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


    return (
        <AuthContext.Provider value={{ user, login, getCurrentUser, getAuthHeader }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider




