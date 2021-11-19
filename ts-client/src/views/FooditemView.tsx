import { useState, useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { Fooditem } from '../@types'
import { RestaurantContext } from '../context/RestaurantContext'
import defaultBgImage from '../assets/img/fooditem.jpg'
import HumongousHeader from '../components/core/HumongousHeader'
import FooditemDetails from '../components/fooditems/FooditemDetails'
import { Button, Container } from 'reactstrap'


type RestaurantParams = {
    rid: string
}
type FooditemParams = {
    fid: string
}


const FooditemView = () => {

    const history = useHistory()
    const { rid } = useParams<RestaurantParams>()
    const { fid } = useParams<FooditemParams>()
    const { getCurrentFooditem, deleteFooditem } = useContext(RestaurantContext)
    const [fooditem, setFooditem] = useState<Fooditem | undefined>()

    useEffect(() => {
        async function fetchData(rid: string, fid: string) {
            setFooditem(getCurrentFooditem(rid, fid))
        }
        fetchData(rid, fid)
    }, [fid])


    const handleEditFooditem = () => {
        history.push(`/users/profile/restaurants/${rid}/fooditems/${fid}/edit`)
    }
    const handleDeleteFooditem = () => {
        deleteFooditem(rid, fid)
        history.push(`/users/profile/restaurants/${rid}`)
    }

    return (

        fooditem ?
            <div className="wrapper">
                <HumongousHeader
                    backgroundImage={fooditem.photo ? `http://localhost:5000/images/${fooditem.photo}` : defaultBgImage}
                    title={fooditem.name}
                    category={fooditem.type}
                    qty={fooditem.amount}
                    qtyName={fooditem.amount <= 1 ? 'Unit' : 'Units'}
                    avatar={''}
                />
                <div className="section">
                    <Container>
                        <div className="button-container">
                            <Button
                                className="btn-round mr-1"
                                color="info"
                                onClick={handleEditFooditem}
                                size="lg"
                            >
                                Edit
                            </Button>
                        </div>
                        <div className="button-container">
                            <Button
                                className="btn-round mr-1"
                                color="info"
                                onClick={handleDeleteFooditem}
                                size="lg"
                            >
                                Delete
                            </Button>
                        </div>
                        <h3 className="title">Details</h3>
                        <FooditemDetails fooditem={fooditem} />
                    </Container>
                </div>
            </div>
            : null
    )
}
export default FooditemView