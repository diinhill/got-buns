import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
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
    }, [])


    return (

        <Container>
            <Typography variant='h2' color='default' component='h4' align='center'>restaurants</Typography>

            {restaurants ?
                restaurants.map((restaurant, i) => {
                    return (
                        <Container>
                            <Typography>{restaurant.name}</Typography>
                            <Paper>
                                <Typography>contact</Typography>
                                <Typography>{restaurant.street} {restaurant.number}</Typography>
                                <Typography>{restaurant.postal} {restaurant.town}</Typography>
                                <br></br>
                                {/* I need to calculate the distance between user restaurant and the restaurant in the list and filter according to closest first */}
                            </Paper>
                            <img src={restaurant.photo} />
                            {/* I need this as a thumbnail  */}
                            <Button variant='contained' onClick={(() => <Restaurant key={i} restaurant={restaurant} />)} type='submit' endIcon={<KeyboardArrowRightIcon />}>see restaurant</Button>
                        </Container>
                    )
                })
                : <Typography>loading...</Typography>
            }
        </Container>

    )

}
export default RestaurantsView