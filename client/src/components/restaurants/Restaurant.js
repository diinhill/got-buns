import React, { useState, useEffect, useContext } from 'react'
import { Typography, Button, Container, Paper } from '@material-ui/core'
import { useHistory, useParams } from 'react-router'
import { PrivaterouteContext } from '../../context/privaterouteContext'



const Restaurant = () => {

    const history = useHistory()
    const [restaurant, setRestaurant] = useState()
    const { rid } = useParams()
    const { getCurrentRestaurant } = useContext(PrivaterouteContext)

    useEffect(() => {

        async function fetchData(rid) {
            await getCurrentRestaurant(rid)
                .then(data => setRestaurant(data))
        }
        fetchData(rid)
    }, [rid])


    return (

        <Container>
            <Typography>{restaurant?.name}</Typography>
            <Paper>
                <Typography>contact</Typography>
                <Typography>{restaurant?.street} {restaurant?.number}</Typography>
                <Typography>{restaurant?.postal} {restaurant?.town}</Typography>
                <br></br>
                <Typography>phone: {restaurant?.phone}</Typography>
            </Paper>
            <img fullWidth src={`http://localhost:5000/images/${restaurant?.photo}`} />

            {/* formatting address in order to create a googlemap (https://developers.google.com/maps/documentation/javascript/get-api-key#console_1)
            API key needed!
            <Map ...
            <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script> */}

        </Container>

    )

}
export default Restaurant