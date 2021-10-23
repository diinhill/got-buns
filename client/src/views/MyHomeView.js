import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import MyRestaurant from '../components/restaurants/MyRestaurant'
import { PrivaterouteContext } from '../context/privaterouteContext'
import { Typography, Button, Container, Paper } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'



const MyHomeView = () => {

    const history = useHistory()
    const { user, setMyRestaurants, getMyRestaurants, myRestaurants } = useContext(PrivaterouteContext)


    useEffect(async () => {
        user ?

            setMyRestaurants(await getMyRestaurants())
            && console.log('myRestaurants:', myRestaurants)

            :
            history.push('/login')
    }, [])


    return (

        <Container>
            <Typography variant='h2' color='default' component='h4' align='center'>my page</Typography>
            <Button variant='contained' onClick={(() => history.push('/users/profile/restaurants/add'))} endIcon={<KeyboardArrowRightIcon />}><Typography>add new restaurant</Typography></Button>

            {(myRestaurants.length !== 0) ?
                myRestaurants.map((restaurant, i) => {
                    return (
                        <Container>
                            {restaurant ?
                                <><Typography>{restaurant.name}</Typography>
                                    <Paper>
                                        <img src={restaurant.photo} />
                                        {/* I need a thumbnail picture here  */}
                                        <br></br>
                                        <Typography>{restaurant.street} {restaurant.number}</Typography>
                                        <Typography>{restaurant.postal} {restaurant.town}</Typography>
                                        <Button onClick={(() => <MyRestaurant key={i} restaurant={restaurant} />)}><Typography>see restaurant information</Typography></Button>
                                    </Paper></>

                                : <Typography>loading...</Typography>}
                        </Container>
                    )
                })
                : <Typography>you have no restaurants yet.</Typography>
            }

        </Container>

    )

}
export default MyHomeView