import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router'
import { Restaurant } from '../@types'
import { AuthContext } from '../context/AuthContext'
import { RestaurantContext } from '../context/RestaurantContext'

type RestaurantParams = {
    rid: string;
};


const MyRestaurantView = () => {

    const { rid } = useParams<RestaurantParams>()
    const history = useHistory()
    const { user } = useContext(AuthContext)
    const { getCurrentRestaurant } = useContext(RestaurantContext)
    const [restaurant, setRestaurant] = useState<Restaurant | undefined>()

    useEffect(() => {
        let currentRestaurant: Restaurant | undefined = user?.restaurants.find(restaurant => restaurant._id === rid)
        if (currentRestaurant)
            setRestaurant(currentRestaurant)
        else {
            fetchData(rid)
        }
        async function fetchData(rid: string) {
            setRestaurant(await getCurrentRestaurant(rid))
        }
    }, [])

    console.log(`restaurant`, restaurant)
    console.log(`user`, user)
    return (
        restaurant && user ?
            <div>
                <img src={`http://localhost:5000/images/${restaurant?.photo}`} height='140' alt='' />
                <p>{restaurant.name}</p>
                <span>
                    <p>contact</p>
                    <p>{restaurant.street} {restaurant.number}</p>
                    <p>{restaurant.postal} {restaurant.town}</p>
                    <br></br>
                    <p>phone: {restaurant.phone}</p>
                </span>

                {/* formatting address in order to create a googlemap (https://developers.google.com/maps/documentation/javascript/get-api-key#console_1)
            API key needed!
            <Map ...
            <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script> */}

                {(restaurant.admin === user._id) ?
                    <button onClick={(() => history.push(`/users/profile/restaurants/edit/${restaurant._id}`))}><p>edit restaurant information</p></button>
                    : <p>{restaurant?.admin?.name} is the admin for this restaurant</p>
                }

                <button onClick={(() => history.push(`/users/profile/restaurants/fooditems/${restaurant._id}`))}><p>my fooditems</p></button>
                <button onClick={(() => history.push(`/users/profile/restaurants/foodalerts/${restaurant._id}`))}><p>my foodalerts</p></button>
                <button onClick={(() => history.push(`/users/profile/restaurants/messages/${restaurant._id}`))}><p>my messages</p></button>
            </div> :
            <div>
                <h2>No restaurant</h2>
            </div>
    )

}
export default MyRestaurantView