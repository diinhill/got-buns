import { useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router'
import { Restaurant } from '../@types'
import { AuthContext } from '../context/AuthContext'
import { RestaurantContext } from '../context/RestaurantContext'
import defaultBgImage from '../assets/img/chumbucket.png'
import HumongousHeader from '../components/core/HumongousHeader'
import { Container, Button } from 'reactstrap'
import FooditemsList from '../components/fooditems/FooditemsList'

type RestaurantParams = {
    rid: string
}


const RestaurantView = () => {

    const { rid } = useParams<RestaurantParams>()
    const history = useHistory()
    const { user } = useContext(AuthContext)
    const { getCurrentRestaurant, deleteRestaurant } = useContext(RestaurantContext)
    const [restaurant, setRestaurant] = useState<Restaurant | undefined>()

    useEffect(() => {
        let currentRestaurant: Restaurant | undefined = user?.restaurants.find(restaurant => restaurant._id === rid)
        if (currentRestaurant)
            setRestaurant(currentRestaurant)
        else {
            fetchData(rid)
        }
        async function fetchData(rid: string) {
            setRestaurant(await getCurrentRestaurant(rid))
        }
    }, [])


    const handleEditRestaurant = () => {
        history.push(`/users/profile/restaurants/edit/${rid}`)
    }
    const handleDeleteRestaurant = () => {
        deleteRestaurant(rid)
        history.push('/users/profile')
    }
    const handleAddFooditem = () => {
        history.push(`/users/profile/restaurants/addfooditem/${rid}`)
    }

    console.log(`restaurant`, restaurant)
    console.log(`user`, user)


    return (

        restaurant && user ?
            <div className="wrapper">
                <HumongousHeader
                    backgroundImage={restaurant.photo ? `http://localhost:5000/images/${restaurant.photo}` : defaultBgImage}
                    title={restaurant.name}
                    category={restaurant.town}
                    qty={restaurant.fooditems.length}
                    qtyName={restaurant.fooditems.length <= 1 ? 'Food Item' : 'Food Items'}
                    avatar={''}
                />
                <div className="section">
                    <Container>
                        <div className="button-container">
                            <Button
                                className="btn-round mr-1"
                                color="info"
                                onClick={handleEditRestaurant}
                                size="lg"
                            >
                                Edit
                            </Button>
                        </div>
                        <div className="button-container">
                            <Button
                                className="btn-round mr-1"
                                color="info"
                                onClick={handleDeleteRestaurant}
                                size="lg"
                            >
                                Delete
                            </Button>
                        </div>
                        <FooditemsList fooditems={restaurant.fooditems} />
                        <div className="button-container">
                            <Button
                                className="btn-round mr-1"
                                color="info"
                                onClick={handleAddFooditem}
                                size="lg"
                            >
                                Add Food Item
                            </Button>
                        </div>
                    </Container>
                </div>
            </div>
            : null

    )

}
export default RestaurantView