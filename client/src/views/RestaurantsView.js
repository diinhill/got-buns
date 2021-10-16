import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import AddRestaurant from '../components/restaurants/AddRestaurant'
import Restaurant from '../components/restaurants/Restaurant'
import { Typography, Button, Container, Paper } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'



const RestaurantsView = () => {

    const history = useHistory()
    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        const getRestaurants = async () => {
            const res = await axios.get('http://localhost:5000/api/restaurants/')
            console.log('res:', res.data)
            const data = res.data
            console.log('data:', data)
            setRestaurants(data)
        }
        getRestaurants()
    }, [restaurants])


    return (

        <Container>
            <Typography variant='h2' color='default' component='h4' align='center'>restaurants</Typography>
            <Button variant='contained' onClick={(() => <AddRestaurant />)} type='submit' endIcon={<KeyboardArrowRightIcon />}>add new restaurant</Button>

            {restaurants ?
                restaurants.map((restaurant, i) => {
                    return (
                        <Restaurant key={i} restaurant={restaurant} />
                    )
                })
                : <Typography>loading...</Typography>
            }
        </Container>

    )

}
export default RestaurantsView