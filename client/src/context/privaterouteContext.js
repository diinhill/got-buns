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

    const authenticateUser = async () => {
        const response = await axios.get('http://localhost:5000/api/users/profile')
        console.log('response:', response.data)
        if (response.data.token) {
            setUser(response.data.user)
        } else {
            console.log('warning: user not authenticated')
            history.push('/login')
        }
    }

    const getMyRestaurants = async () => {
        const restaurants = []
        const response = await Promise.all(user.restaurants.map(rid => axios.get(`http://localhost:5000/api/restaurants/${rid}`)))
            .then(async (res) => Promise.all(res.map(data => restaurants.push(data))))
        console.log('restaurant data:', restaurants)
        // populate ??
        setMyRestaurants(restaurants)
    }

    const getMyFooditems = async () => {
        const res = await axios.get(`http://localhost:5000/api/fooditems/${rid}`)
        console.log('res:', res.data)
        const data = res.data
        console.log('data:', data)
        setMyFooditems(data)
    }

    const getMyFoodalerts = async () => {
        const res = await axios.get(`http://localhost:5000/api/foodalerts/${rid}`)
        console.log('res:', res.data)
        const data = res.data
        console.log('data:', data)
        setMyFoodalerts(data)
    }


    return (
        <PrivaterouteContext.Provider value={{
            authenticateUser, user, setUser, getMyRestaurants, myRestaurants, setMyRestaurants,
            getMyFooditems, myFooditems, setMyFooditems, getMyFoodalerts, myFoodalerts, setMyFoodalerts
        }}>
            {children}
        </PrivaterouteContext.Provider>
    )
}