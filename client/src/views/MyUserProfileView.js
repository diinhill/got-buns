import React, { useState, useContext, useEffect } from 'react'
// import { AuthContext } from '../context/authContext'
import { useParams } from 'react-router'
import axios from 'axios'
import MyUserProfile from '../components/users/MyUserProfile'


const MyUserProfileView = () => {

    const [userData, setUserData] = useState(null)
    const { uid } = useParams()

    useEffect(() => {
        fetchProfileData(uid)
    }, [uid])

    const fetchProfileData = async (uid) => {
        const res = await axios.get(`http://localhost:5000/api/users/${uid}`)
        const data = res.data.json()
        console.log('user data:', data)
        // populate ??
        setUserData(data)
    }

    return (

        <MyUserProfile userData={userData} />

    )

}
export default MyUserProfileView