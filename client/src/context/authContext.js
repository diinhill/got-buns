import { createContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'


export const AuthContext = createContext()



export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const history = useHistory()

    const authenticateUser = (uid) => {
        const response = axios.get(`http://localhost:5000/api/users/${uid}`)
        console.log('response:', response)
        if (response.data.accessToken) {
            setUser(response.data.user.json())
        } else {
            console.log('warning: user not authenticated')
            history.push('/login')
        }
    }


    return (
        <AuthContext.Provider value={{ authenticateUser, user }}>
            {children}
        </AuthContext.Provider>
    )
}