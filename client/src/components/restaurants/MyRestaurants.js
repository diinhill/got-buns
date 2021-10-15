import { Typography, Button, Container, Paper } from '@material-ui/core'
import { useHistory } from 'react-router'
import MyRestaurant from './MyRestaurant'
import AddRestaurant from './AddRestaurant'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'



const MyRestaurants = ({ restaurants }) => {

    const history = useHistory()
    console.log('restaurants:', restaurants)

    return (

        <Container>

            {restaurants.map((restaurant, i) => (

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
            ))}

            <Button variant='contained' onClick={(() => <AddRestaurant />)} type='submit' endIcon={<KeyboardArrowRightIcon />}>add new fooditem</Button>

        </Container >

    )

}
export default MyRestaurants