import { createContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router'


export const AuthContext = createContext()



export const AuthContextProvider = ({ children }) => {

    const history = useHistory()
    const [user, setUser] = useState(null)

    // compare the provided password with the hashPassword that has been saved during registration. if they match, reroute to profile page
    const login = async ({ email, password }) => {
        const user = await fetch(`/users?email=${email}&password=${password}`)
        if (user) {
            setUser(user)
            history.push(`/users/${user._id}`)
        } else {
            console.log('wrong password?')
        }
    }

    // // The signUp function takes an email and password and uses the emailPassword authentication provider to register the user.
    // const signUp = async (email, password) => {
    //     await app.emailPasswordAuth.registerUser(email, password)
    // }

    // // The signOut function calls the logOut function on the currently logged in user
    // const signOut = () => {
    //     if (user == null) {
    //         console.warn("Not logged in, can't log out!")
    //         return
    //     }
    //     user.logOut()
    //     setUser(null)
    // }


    return (
        <AuthContext.Provider value={{ login, user }}>
            {children}
        </AuthContext.Provider>
    )
}