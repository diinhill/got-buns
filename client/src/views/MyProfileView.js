import { Typography } from '@material-ui/core'
import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/authContext'
import { Container } from '@material-ui/core'


const MyProfileView = () => {

    const [user, setUser] = useState(null)
    const [fooditemsUser, setFooditemsUser] = useState([])
    // const [userDetails, setUserDetails] = useState([])
    const { login } = useContext(AuthContext)

    // useEffect(() => {
    //     user ? 
    // }, [user])

    return (

        <Container>
            <Typography>(fetch name of restaurant)</Typography>
            <Typography>edit profile</Typography>
            <Typography>my fooditems</Typography>
            <Typography>my foodalerts</Typography>
            <Typography>my messages</Typography>
        </Container>

    )

}
export default MyProfileView