import { createContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'


export const PrivaterouteContext = createContext()



export const PrivaterouteContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [myRestaurants, setMyRestaurants] = useState([])
    const [myFooditems, setMyFooditems] = useState([])
    const [myFoodalerts, setMyFoodalerts] = useState([])
    const history = useHistory()


    const register = async (form) => {
        const response = await axios.post('http://localhost:5000/api/users/register', form)
        console.log('response:', response.data)
        return response.data
    }

    // state parameter is here: email and password
    const login = async (state) => {
        const response = await axios.post('http://localhost:5000/api/users/login', state)
        console.log('response:', response.data)
        if (response.data.token) {
            // localStorage.setItem('token', response.data.token)
            // const authHeader = new Headers('Authorization', `Bearer ${response.data.token}`)
            setUser(response.data.user)
            console.log('user:', response.data.user)

            // localStorage.setItem('user', JSON.stringify(response.data))
            localStorage.setItem('token', response.data.token)
            return response.data
        } else {
            return null
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    const getAuthHeader = () => {
        const token = localStorage.getItem('token')
        console.log('token:', token)
        if (user && token) {
            return { 'Authorization': `Bearer ${token}` }
        } else {
            console.log('warning: user cannot be authenticated')
            return null
        }
    }

    const addRestaurant = async (form) => {
        const response = await axios.post('http://localhost:5000/api/restaurants/', (form, { headers: getAuthHeader() }))
        console.log('response:', response.data)
        return response.data
    }

    const getMyRestaurants = async () => {
        if ((user.restaurants).length !== 0) {
            const restaurants = []
            await Promise.all((user.restaurants).map(rid => axios.get(`http://localhost:5000/api/restaurants/${rid}`, { headers: getAuthHeader() })))
                .then(async (response) => Promise.all(response.map(data => restaurants.push(data))))
            console.log('restaurant data:', restaurants)
            return restaurants
        } else {
            return []
        }
    }

    const getMyFooditems = async (rid) => {
        const res = await axios.get(`http://localhost:5000/api/fooditems/${rid}`)
        console.log('res:', res.data)
        const data = res.data
        console.log('data:', data)
        setMyFooditems(data)
        return data
    }

    const getMyFoodalerts = async (rid) => {
        const res = await axios.get(`http://localhost:5000/api/foodalerts/${rid}`)
        console.log('res:', res.data)
        const data = res.data
        console.log('data:', data)
        setMyFoodalerts(data)
        return data
    }


    return (
        <PrivaterouteContext.Provider value={{
            register, login, logout, getAuthHeader, addRestaurant, user, setUser, getMyRestaurants, myRestaurants, setMyRestaurants,
            getMyFooditems, myFooditems, setMyFooditems, getMyFoodalerts, myFoodalerts, setMyFoodalerts
        }}>
            {children}
        </PrivaterouteContext.Provider>
    )
}