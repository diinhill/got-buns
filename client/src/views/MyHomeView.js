import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import { PrivaterouteContext } from '../context/privaterouteContext'
import { Typography, Button, Container, Paper } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'



const MyHomeView = () => {

    const history = useHistory()
    const [restaurants, setRestaurants] = useState([])
    const { user } = useContext(PrivaterouteContext)


    useEffect(() => {
        setRestaurants(user.restaurants)
    }, [user])


    return (

        <Container>
            <Typography variant='h2' color='default' component='h4' align='center'>my page</Typography>
            <Button variant='contained' onClick={(() => history.push('/users/profile/restaurants/add'))} endIcon={<KeyboardArrowRightIcon />}><Typography>add new restaurant</Typography></Button>

            {(restaurants.length !== 0) ?
                restaurants.map((restaurant, i) => {
                    return (
                        <Container>
                            {restaurant ?
                                <><Paper key={i}>
                                    <Typography>{restaurant.name}</Typography>
                                    <img src={`http://localhost:5000/images/${restaurant.photo}`} />
                                    {/* I need a thumbnail picture here  */}
                                    <br></br>
                                    <Typography>{restaurant.street} {restaurant.number}</Typography>
                                    <Typography>{restaurant.postal} {restaurant.town}</Typography>
                                    <Button onClick={(() => history.push(`/users/profile/restaurants/${restaurant._id}`))}><Typography>see restaurant information</Typography></Button>
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