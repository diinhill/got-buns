import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import MyUserProfile from '../components/users/MyUserProfile'
import { AuthContext } from '../context/authContext'


const MyUserProfileView = () => {

    const { user } = useContext(AuthContext)

    // useEffect(() => {
    //     fetchProfileData(uid)
    // }, [uid])

    // const fetchProfileData = async (uid) => {
    //     const res = await axios.get(`http://localhost:5000/api/users/profile`)
    //     const data = res.data
    //     console.log('user data:', data)
    //     // populate ??
    //     setUserData(data)
    // }

    return (

        <MyUserProfile user={user} />

    )

}
export default MyUserProfileView