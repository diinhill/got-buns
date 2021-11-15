import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router'
import { Restaurant } from '../@types'
import { AuthContext } from '../context/AuthContext'
import { RestaurantContext } from '../context/RestaurantContext'
import chumbucket from '../layout/img_files/chumbucket.png'
import food from '../layout/img_files/fooditem.jpg'

type RestaurantParams = {
    rid: string
}

type FooditemParams = {
    fid: string
}


const MyFooditemView = () => {

    const { rid } = useParams<RestaurantParams>()
    const history = useHistory()
    const { user } = useContext(AuthContext)
    const { getCurrentRestaurant, deleteRestaurant } = useContext(RestaurantContext)
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

    const handleDelete = () => {
        deleteRestaurant(rid)
        history.push('/users/profile')
    }

    console.log(`restaurant`, restaurant)
    console.log(`user`, user)


    return (

        restaurant && user ?
            <div>
                {restaurant.photo ?
                    <img src={`http://localhost:5000/images/${restaurant.photo}`} height='140' alt='' />
                    : <img src={chumbucket} height='140' alt='' />}
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

                {restaurant.admin === user._id ?
                    <div>
                        <button onClick={(() => history.push(`/users/profile/restaurants/edit/${restaurant._id}`))}><p>edit restaurant information</p></button>
                        <button onClick={handleDelete}><p>delete restaurant</p></button>
                    </div>
                    : <p>you are not the admin of this restaurant</p>
                }

                {restaurant.fooditems.length !== 0 ?
                    <div>
                        <h3>fooditems</h3>
                        {restaurant.fooditems.map((fooditem, i) => {
                            return (
                                <div className='tile is-ancestor' key={i}>
                                    {fooditem ?
                                        <div className='tile is-parent is-vertical' key={i}>
                                            <p>{fooditem.name}</p>
                                            <p>{fooditem.type}</p>
                                            {fooditem.photo ?
                                                <img src={`http://localhost:5000/images/${fooditem.photo}`} width='140' alt='' />
                                                : <img src={food} width='140' alt='' />}
                                            <article className='tile is-child is-vertical'>
                                                <p>amount available: {fooditem.amount}</p>
                                                <p>{fooditem.price}€</p>
                                                <p>swap possible?: {fooditem.swapPossible}</p>
                                                <button onClick={(() => history.push(`/users/profile/restaurants/${restaurant._id}/${fooditem._id}`))}><p>see information</p></button>
                                            </article>
                                        </div>
                                        : <p>loading...</p>}
                                </div>
                            )
                        })}
                    </div>
                    : <p>you have no fooditems yet.</p>
                }

                <button onClick={(() => history.push(`/users/profile/restaurants/addfooditem/${restaurant._id}`))}><p>add new fooditem</p></button>
                {/* <button onClick={(() => history.push(`/users/profile/restaurants/foodalerts/${restaurant._id}`))}><p>my foodalerts</p></button>
                <button onClick={(() => history.push(`/users/profile/restaurants/messages/${restaurant._id}`))}><p>my messages</p></button> */}
            </div> :

            <h2>No restaurant</h2>

    )

}
export default MyRestaurantView