import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { UserContext } from '../context/UserContext'
import plankton from '../layout/img_files/plankton.png'
import chumbucket from '../layout/img_files/chumbucket.png'


const HomeView = () => {

    const history = useHistory()
    const { user } = useContext(AuthContext)
    const { deleteUserProfile } = useContext(UserContext)

    const handleDelete = () => {
        deleteUserProfile()
        history.push('/')
    }


    return (

        user &&
        <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user?.profession}</p>
            {user.photo ?
                <img src={`http://localhost:5000/images/${user.photo}`} alt='' />
                : <img src={plankton} alt='' />}
            <button onClick={(() => history.push('/users/profile/edit'))}><p>edit user profile</p></button>
            <button onClick={handleDelete}><p>delete user profile</p></button>
            <p>-------------------</p>

            {user.restaurants.length !== 0 ?
                <div>
                    <h3>my restaurants</h3>
                    {user.restaurants.map((restaurant, i) => {
                        return (
                            <div className='tile is-ancestor' key={i}>
                                {restaurant ?
                                    <div className='tile is-parent is-vertical' key={i}>
                                        <p>{restaurant.name}</p>
                                        {restaurant.photo ?
                                            <img src={`http://localhost:5000/images/${restaurant.photo}`} width='140' alt='' />
                                            : <img src={chumbucket} width='140' alt='' />}
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
                    })}
                </div>
                : <p>you have no restaurants yet.</p>
            }

            <button onClick={(() => history.push('/users/profile/restaurants/add'))}><p>add new restaurant</p></button>
        </div>
    )

}
export default HomeView




