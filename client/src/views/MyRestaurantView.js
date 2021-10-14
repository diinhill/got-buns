import React, { useState, useContext, useEffect } from 'react'
// import { AuthContext } from '../context/authContext'
import { useHistory, useParams } from 'react-router'
import axios from 'axios'
import MyRestaurant from '../components/restaurants/MyRestaurant'



const MyRestaurantView = () => {

    const history = useHistory()
    const [user, setUser] = useState(null)
    const [restaurant, setRestaurant] = useState([])
    const { uid, id } = useParams()

    useEffect(() => {
        fetchRestaurantData(uid, id)
    }, [uid, id])

    const fetchRestaurantData = async (uid, id) => {
        const res = await axios.get(`http://localhost:5000/api/restaurants/${uid}-${id}`)
        const data = res.data
        console.log('restaurant data:', data)
        // populate ??
        setRestaurant(data)
        history.push(`/restaurants/${id}/${data.name.replace(/\s+/g, '')}`)
    }

    return (

        <MyRestaurant restaurant={restaurant} />

    )

}
export default MyRestaurantView