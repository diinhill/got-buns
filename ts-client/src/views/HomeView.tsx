import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Restaurant } from '../@types'
import { AuthContext } from '../context/AuthContext'

interface Props {

}

const HomeView = (props: Props) => {

    const history = useHistory()
    const [restaurants, setRestaurants] = useState<Restaurant[] | any[]>([])
    const { user } = useContext(AuthContext)

    useEffect(() => {

        (user?.restaurants?.length !== 0) ?
            setRestaurants(user.restaurants) : setRestaurants([])
    }, [user])


    return (

        <div>
            <p is-variant='h2' color='default' is-component='h4' has-text-centered>my page</p>
            <button is-contained onClick={(() => history.push('/users/profile/restaurants/add'))}><p>add new restaurant</p></button>

            {(restaurants?.length !== 0) ?
                restaurants.map((restaurant, i) => {
                    return (
                        <div className='tile is-ancestor'>
                            {restaurant ?
                                <div className='tile is-parent is-vertical' key={i}>
                                    <p>{restaurant.name}</p>
                                    <img src={`http://localhost:5000/images/${restaurant.photo}`} />
                                    {/* I need a thumbnail picture here  */}
                                    <article className='tile is-child is-vertical'>
                                        <p>{restaurant.street} {restaurant.number}</p>
                                        <p>{restaurant.postal} {restaurant.town}</p>
                                        <button onClick={(() => history.push(`/users/profile/restaurants/${restaurant._id}`))}><p>see restaurant information</p></button>
                                    </article>
                                </div>
                                : <p>loading...</p>}
                        </div>
                    )
                })
                : <p>you have no restaurants yet.</p>
            }

        </div>
    )
}

export default HomeView




