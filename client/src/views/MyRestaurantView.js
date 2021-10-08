import { Typography, Button, Container, Paper } from '@material-ui/core'
import React, { useState, useContext, useEffect } from 'react'
// import { AuthContext } from '../context/authContext'
import { useHistory, useParams } from 'react-router'
import axios from 'axios'


const MyRestaurantView = () => {

    const history = useHistory()
    const [user, setUser] = useState(null)
    const [restaurant, setRestaurant] = useState([])
    const { uid, id } = useParams()

    useEffect(() => {
        fetchRestaurantData(uid, id)
    }, [uid, id])

    const fetchRestaurantData = async (uid, id) => {
        const res = await axios.get(`http://localhost:5000/api/restaurants/${uid}:${id}`)
        const data = res.data
        console.log('restaurant data:', data)
        // populate ??
        setRestaurant(data)
        history.push(`/restaurants/${id}/${data.name.replace(/\s+/g, '')}`)
    }

    return (

        <Container>
            <Typography>{restaurant.name}</Typography>
            <Paper>
                <Typography>contact</Typography>
                <Typography>{restaurant.street} {restaurant.number}</Typography>
                <Typography>{restaurant.postal} {restaurant.town}</Typography>
                <br></br>
                <Typography>phone: {restaurant.phone}</Typography>
            </Paper>
            <img fullWidth src={restaurant.photo} />

            {/* formatting address in order to create a googlemap (https://developers.google.com/maps/documentation/javascript/get-api-key#console_1)
            API key needed!
            <Map ...
            <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script> */}


            <Button onClick={(() => history.push(`/users/${uid}`))}><Typography>edit profile</Typography></Button>
            <Button onClick={(() => history.push(`/fooditems/${uid}`))}><Typography>my fooditems</Typography></Button>
            <Button onClick={(() => history.push(`/foodalerts/${uid}`))}><Typography>my foodalerts</Typography></Button>
            <Button onClick={(() => history.push(`/users/${uid}/messages`))}><Typography>my messages</Typography></Button>
        </Container>

    )

}
export default MyRestaurantView