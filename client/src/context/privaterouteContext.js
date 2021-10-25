import { createContext, useState } from 'react'
import axios from 'axios'


export const PrivaterouteContext = createContext()



export const PrivaterouteContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [myFoodalerts, setMyFoodalerts] = useState([])


    const register = async (form) => {
        const response = await axios.post('http://localhost:5000/api/users/register', form)
        console.log('response:', response.data)
        return response.data
    }

    // state parameter means: email and password
    const login = async (state) => {
        const response = await axios.post('http://localhost:5000/api/users/login', state)
        console.log('login response:', response.data)
        if (response.data.token) {
            localStorage.setItem('token', response.data.token)
            return getCurrentUser()
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
        if (token) {
            return { 'Authorization': `Bearer ${token}` }
        } else {
            console.log('warning: user cannot be authenticated')
            return null
        }
    }

    const getCurrentUser = async () => {
        const currentUser = await axios.get('http://localhost:5000/api/users/profile', { headers: getAuthHeader() })
        console.log('current user:', currentUser.data)
        setUser(currentUser.data)
        return currentUser.data
    }


    const addRestaurant = async (form) => {
        const restaurant = await axios.post('http://localhost:5000/api/restaurants/', form, { headers: getAuthHeader() })
        console.log('new restaurant:', restaurant.data)
        return restaurant.data
    }

    const getCurrentRestaurant = async (rid) => {
        const currentRestaurant = await axios.get(`http://localhost:5000/api/restaurants/${rid}`)
        console.log('current restaurant:', currentRestaurant.data)
        return currentRestaurant.data
    }


    const getMyFooditems = async (rid) => {
        const fooditems = await axios.get(`http://localhost:5000/api/fooditems/${rid}`, { headers: getAuthHeader() })
        console.log('fooditems:', fooditems.data)
        return fooditems.data
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
            register, login, logout, getAuthHeader, user, setUser, getCurrentUser, addRestaurant, getCurrentRestaurant,
            getMyFooditems
            // getMyFooditems, myFooditems, setMyFooditems, getMyFoodalerts, myFoodalerts, setMyFoodalerts
        }}>
            {children}
        </PrivaterouteContext.Provider>
    )
}