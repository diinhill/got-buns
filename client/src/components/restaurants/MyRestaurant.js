import React, { useState, useEffect, useContext } from 'react'
import { Typography, Button, Container, Paper, CardMedia } from '@material-ui/core'
import { useHistory, useParams } from 'react-router'
import { PrivaterouteContext } from '../../context/privaterouteContext'



const MyRestaurant = () => {

    const { rid } = useParams()
    const history = useHistory()
    const { user, getCurrentRestaurant } = useContext(PrivaterouteContext)
    const [restaurant, setRestaurant] = useState([])

    useEffect(() => {

        async function fetchData(rid) {
            await getCurrentRestaurant(rid)
                .then(data => setRestaurant(data))
        }
        fetchData(rid)
    }, [rid])

    return (

        <Container>
            <CardMedia component='img' image={`http://localhost:5000/images/${restaurant?.photo}`} height='140' alt='' />
            <Typography>{restaurant?.name}</Typography>
            <Paper>
                <Typography>contact</Typography>
                <Typography>{restaurant?.street} {restaurant?.number}</Typography>
                <Typography>{restaurant?.postal} {restaurant?.town}</Typography>
                <br></br>
                <Typography>phone: {restaurant?.phone}</Typography>
            </Paper>

            {/* formatting address in order to create a googlemap (https://developers.google.com/maps/documentation/javascript/get-api-key#console_1)
            API key needed!
            <Map ...
            <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script> */}

            {(restaurant.admin === user._id) ?
                <Button onClick={(() => history.push(`/users/profile/restaurants/edit/${restaurant._id}`))}><Typography>edit restaurant information</Typography></Button>
                : <Typography>{restaurant?.admin?.name} is the admin for this restaurant</Typography>
            }

            <Button onClick={(() => history.push(`/users/profile/restaurants/fooditems/${restaurant._id}`))}><Typography>my fooditems</Typography></Button>
            <Button onClick={(() => history.push(`/users/profile/restaurants/foodalerts/${restaurant._id}`))}><Typography>my foodalerts</Typography></Button>
            <Button onClick={(() => history.push(`/users/profile/restaurants/messages/${restaurant._id}`))}><Typography>my messages</Typography></Button>
        </Container>

    )

}
export default MyRestaurant