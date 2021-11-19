import { useContext } from "react"
import { useHistory } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
import LoginView from "../../views/LoginView"


const Logout = () => {
    const history = useHistory()
    const { logout } = useContext(AuthContext)
    try {
        logout()
    } catch (error) {
        console.log('error logout:', error)
    }
    return <LoginView />
}
export default Logout

