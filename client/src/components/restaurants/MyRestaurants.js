import { Typography, Button, Container, Paper } from '@material-ui/core'
import { useHistory } from 'react-router'
import MyRestaurant from './MyRestaurant'



const MyRestaurants = ({ restaurants }) => {

    const history = useHistory()
    console.log('restaurants:', restaurants)

    return (

        restaurants.map((restaurant, i) => (

            <Container key={i}>
                <Typography>{restaurant.name}</Typography>
                <Paper>
                    <Typography>contact</Typography>
                    <Typography>{restaurant.street} {restaurant.number}</Typography>
                    <Typography>{restaurant.postal} {restaurant.town}</Typography>
                    <br></br>
                    <Typography>phone: {restaurant.phone}</Typography>
                </Paper>
                <img fullWidth src={restaurant.photo} />

                <Button onClick={(() => <MyRestaurant restaurant={restaurant} />)}><Typography>go to restaurant profile</Typography></Button>

            </Container>
        ))

    )

}
export default MyRestaurants