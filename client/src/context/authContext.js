import { createContext } from 'react'
import { useHistory, useParams } from 'react-router'
import axios from 'axios'


export const AuthContext = createContext()



export const AuthContextProvider = ({ children }) => {

    const { uid } = useParams()
    const history = useHistory()

    const authenticateUser = () => {
        const res = axios.get(`http://localhost:5000/api/users/${uid}`)
        const data = res.data
        console.log('data:', data)
        console.log('user:', data.user)
        if (data.token) {
            const token = data.token
            console.log('token:', token)
            return token
        } else {
            console.log('warning: user not authenticated')
            history.push('/login')
        }
    }


    return (
        <AuthContext.Provider value={{ authenticateUser }}>
            {children}
        </AuthContext.Provider>
    )
}