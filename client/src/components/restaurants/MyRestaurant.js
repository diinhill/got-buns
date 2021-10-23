import { Typography, Button, Container, Paper } from '@material-ui/core'
import { useHistory } from 'react-router'



const MyRestaurant = ({ restaurant }) => {

    const history = useHistory()
    console.log('restaurant:', restaurant)

    return (

        restaurant ?

            <Container>
                <Typography>{restaurant?.name}</Typography>
                <Paper>
                    <Typography>contact</Typography>
                    <Typography>{restaurant?.street} {restaurant?.number}</Typography>
                    <Typography>{restaurant?.postal} {restaurant?.town}</Typography>
                    <br></br>
                    <Typography>phone: {restaurant?.phone}</Typography>
                </Paper>
                <img fullwidth src={restaurant?.photo} />

                {/* formatting address in order to create a googlemap (https://developers.google.com/maps/documentation/javascript/get-api-key#console_1)
            API key needed!
            <Map ...
            <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script> */}


                <Button onClick={(() => history.push(`/users/profile/restaurants/${restaurant._id}`))}><Typography>edit restaurant information</Typography></Button>
                <Button onClick={(() => history.push(`/users/profile/restaurants/fooditems/${restaurant._id}`))}><Typography>my fooditems</Typography></Button>
                <Button onClick={(() => history.push(`/users/profile/restaurants/foodalerts/${restaurant._id}`))}><Typography>my foodalerts</Typography></Button>
                <Button onClick={(() => history.push(`/users/profile/restaurants/messages/${restaurant._id}`))}><Typography>my messages</Typography></Button>
            </Container>

            : ''
    )

}
export default MyRestaurant