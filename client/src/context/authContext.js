import { createContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'


export const AuthContext = createContext()



export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const history = useHistory()

    const authenticateUser = async () => {
        const response = await axios.get('http://localhost:5000/api/users/profile')
        console.log('response:', response.data)
        if (response.data.token) {
            setUser(response.data.user)
        } else {
            console.log('warning: user not authenticated')
            history.push('/login')
        }
    }


    return (
        <AuthContext.Provider value={{ authenticateUser, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}