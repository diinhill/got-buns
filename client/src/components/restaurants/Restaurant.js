import { Typography, Button, Container, Paper } from '@material-ui/core'
import { useHistory } from 'react-router'



const Restaurant = ({ restaurant }) => {

    const history = useHistory()
    console.log('restaurant:', restaurant)

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

        </Container>

    )

}
export default Restaurant