import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import MyRestaurants from '../components/restaurants/MyRestaurants'
import { AuthContext } from '../context/authContext'



const MyRestaurantsView = () => {

    const history = useHistory()
    const { user } = useContext(AuthContext)
    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        user &&
            fetchRestaurantData()
    }, [user])

    const fetchRestaurantData = async () => {
        const restaurants = []
        const response = await Promise.all(user.restaurants.map(rid => axios.get(`http://localhost:5000/api/restaurants/${rid}`)))
            .then(async (res) => Promise.all(res.map(data => restaurants.push(data))))
        console.log('restaurant data:', restaurants)
        // populate ??
        setRestaurants(restaurants)
        history.push('/users/profile/restaurants')
        // history.push(`/users/profile/restaurants/${id}/${data.name.replace(/\s+/g, '')}`)
    }

    return (

        <MyRestaurants restaurants={restaurants} />

    )

}
export default MyRestaurantsView