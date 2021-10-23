import React, { useState, useContext } from 'react'
import { PrivaterouteContext } from '../../context/privaterouteContext'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Logout = () => {

    const history = useHistory()
    const { logout } = useContext(PrivaterouteContext)


    const handleLogout = async (e) => {
        e.preventDefault()

        try {
            await logout()
            history.push('/login')
        } catch (e) {
            alert(e.message)
        }
    }




    return (

        <Link to='/logout' onClick={handleLogout}>Logout</Link>

    )
}

export default Logout