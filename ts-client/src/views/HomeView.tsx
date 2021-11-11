import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


const HomeView = () => {

    const history = useHistory()
    const { user } = useContext(AuthContext)


    return (

        user &&
        <div>
            <p is-variant='h2' color='default' is-component='h4' has-text-centered>{user?.name}</p>
            <p is-variant='h2' color='default' is-component='h4' has-text-centered>{user?.profession}</p>
            <img src={`http://localhost:5000/images/${user?.photo}`} />

            {user.restaurants.length !== 0 ?
                user.restaurants.map((restaurant, i) => {
                    return (
                        <div className='tile is-ancestor' key={i}>
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

            <button is-contained onClick={(() => history.push('/users/profile/restaurants/add'))}><p>add new restaurant</p></button>
        </div>
    )

}
export default HomeView




