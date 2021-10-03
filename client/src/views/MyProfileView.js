import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/authContext'


const MyProfileView = () => {

    const [user, setUser] = useState(null)
    const [fooditemsUser, setFooditemsUser] = useState([])
    // const [userDetails, setUserDetails] = useState([])
    const { login } = useContext(AuthContext)

    useEffect(() => {
        user ? 
    }, [user])

    return (




    )

}
export default MyProfileView