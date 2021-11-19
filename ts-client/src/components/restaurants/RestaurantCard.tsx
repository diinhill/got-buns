import React, { useContext } from "react"
import { useHistory } from "react-router"
import { Card, Container, Row, Col } from "reactstrap"
import { Restaurant } from "../../@types"
import { AuthContext } from "../../context/AuthContext"

interface Props {
    restaurant: Restaurant
}


const RestaurantCard: React.FC<Props> = ({ restaurant }) => {

    const history = useHistory()
    const { user } = useContext(AuthContext)


    return (

        <div>
            <Col md="4">
                <Card
                    className="card-background card-raised"
                    data-background-color=""
                    style={{ backgroundImage: `url(http://localhost:5000/images/${restaurant.photo})` || `url(${require("../../assets/img/chumbucket.png")}` }}
                >
                    <div className="info">
                        <i><h5 className="info-title">{`${restaurant.type}: ${restaurant.cuisineType} cuisine`}</h5></i>
                        <div className="description">
                            <h4 className="info-title">{restaurant.name}</h4>
                            <p>
                                {`${restaurant.street} ${restaurant.town}`}
                            </p>
                            <a
                                className="ml-3"
                                onClick={() => (user?.restaurants.find(res => res._id === restaurant._id)) ?
                                    history.push(`/users/profile/restaurants/${restaurant._id}`) : history.push(`/restaurants/${restaurant._id}`)}
                            >
                                More
                            </a>
                        </div>
                    </div>
                </Card>
            </Col>
        </div>

    )
}
export default RestaurantCard










