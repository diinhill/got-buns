import React, { useContext } from 'react'
import axios from 'axios'
import MyUserProfile from '../components/users/MyUserProfile'
import { AuthContext } from '../context/authContext'


const MyUserProfileView = () => {

    const { user } = useContext(AuthContext)


    return (

        <MyUserProfile user={user} />

    )

}
export default MyUserProfileView