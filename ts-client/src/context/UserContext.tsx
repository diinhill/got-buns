import axios from 'axios'
import React, { createContext, useContext } from 'react'
import { UserContextInterface } from '../@types'
import { getAuthHeader } from '../components/utils/Helper'
import { AuthContext } from './AuthContext'



export const UserContext = createContext<UserContextInterface>({
    editUserProfile: (state: FormData) => {
        throw new Error('restaurant was not added')
    },
    deleteUserProfile: () => {
        throw new Error('user profile could not be deleted')
    },
    // getUserWithRestaurants: () => {
    //     throw new Error('user could not be populated with restaurants')
    // },
    getAuthHeader: () => {
        throw new Error('no header yet')
    }
})


const UserContextProvider = (props: { children: React.ReactNode }) => {

    const { getCurrentUser } = useContext(AuthContext)


    const editUserProfile = async (state: FormData) => {
        const updatedUser = await axios.patch('http://localhost:5000/api/users/profile/edit', state, { headers: getAuthHeader() })
        console.log('updatedUser:', updatedUser.data)
        getCurrentUser()
        return updatedUser.data
    }

    const deleteUserProfile = async () => {
        const deletedUser = await axios.delete('http://localhost:5000/api/users/profile/delete', { headers: getAuthHeader() })
        console.log('deleted user:', deletedUser)
        localStorage.removeItem('token')
        getCurrentUser()
        return deletedUser
    }

    // const addUserToRestaurant = async (uid: string) => {

    // }

    // const removeUserFromRestaurant = async (uid: string) => {

    // }


    return (

        <UserContext.Provider value={{ editUserProfile, deleteUserProfile, getAuthHeader }}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserContextProvider
