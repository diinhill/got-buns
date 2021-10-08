import React, { useState, useContext } from 'react'
// import { AuthContext } from '../../context/authContext'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Logout = () => {

    const history = useHistory()
    const [user, setUser] = useState()
    const [token, setToken] = useState()
    // const { logout } = useContext(AuthContext)

    const handleLogout = (e) => {
        e.preventDefault()
        const res = axios.get(`http://localhost:5000/api/users/${user._id}`, token)
        const data = res.data
        console.log('data:', data)
        console.log('user:', data.user)
        console.log('token:', data.token)
        setUser(null)
        setToken(null)
        history.push('/login')
    }


    return (

        <Link to='/logout' onClick={handleLogout}>Logout</Link>

    )
}

export default Logout