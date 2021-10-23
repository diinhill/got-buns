import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import MyRestaurant from '../components/restaurants/MyRestaurant'
import AddRestaurant from '../components/restaurants/AddRestaurant'
import { AuthContext } from '../context/authContext'
import { Typography, Button, Container, Paper } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'



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
    }

    return (

        <Container>
            <Typography variant='h2' color='default' component='h4' align='center'>my restaurants</Typography>
            <Button variant='contained' onClick={(() => <AddRestaurant />)} type='submit' endIcon={<KeyboardArrowRightIcon />}>add new restaurant</Button>

            {restaurants ?
                restaurants.map((restaurant, i) => {
                    return (
                        <Container>
                            <Typography>{restaurant.name}</Typography>
                            <Paper>
                                <Typography>{restaurant.street} {restaurant.number}</Typography>
                                <Typography>{restaurant.postal} {restaurant.town}</Typography>
                                <br></br>
                            </Paper>
                            <img src={restaurant.photo} />
                            {/* I need a thumbnail picture here */}
                            <Button onClick={(() => <MyRestaurant key={i} restaurant={restaurant} />)}><Typography>see restaurant information</Typography></Button>
                        </Container>
                    )
                })
                : <Typography>loading...</Typography>
            }

        </Container>

    )

}
export default MyRestaurantsView