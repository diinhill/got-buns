import { createContext, useState, useEffect } from 'react'
import bcrypt from 'bcrypt'


export const AuthContext = createContext(/*null*/)



export const AuthContextProvider = ({ children }) => {


    // The signIn function takes an email and password and uses the emailPassword authentication provider to log in.
    const login = async (name, email, password) => {
        const cred = bcrypt.compareSync(password, hash)
        if (cred) {
            const user = await fetch(`/${name}/profile`)
        } else {
            console.log('wrong password?')
            const user = null
        }
        return user
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
        <AuthContext.Provider value={{ user, login }}>
            {children}
        </AuthContext.Provider>
    )
}