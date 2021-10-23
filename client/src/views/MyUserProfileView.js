import React, { useContext } from 'react'
import axios from 'axios'
import MyUserProfile from '../components/users/MyUserProfile'
import { PrivaterouteContext } from '../context/privaterouteContext'


const MyUserProfileView = () => {

    const { user } = useContext(PrivaterouteContext)


    return (

        <MyUserProfile user={user} />

    )

}
export default MyUserProfileView