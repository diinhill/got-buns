import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'


const Logout = () => {

    const history = useHistory()
    const { logout } = useContext(AuthContext)

    const handleLogout = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            await logout()
            history.push('/login')
        } catch (error) {
            console.log('error logout:', error)
            history.push('/logout')
        }
    }


    return (
        <Link to='/logout' onClick={handleLogout}>Logout</Link>
    )

}
export default Logout