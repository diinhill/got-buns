import { useState, useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { Fooditem } from '../@types'
import { RestaurantContext } from '../context/RestaurantContext'
import food from '../layout/img_files/fooditem.jpg'

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
            setFooditem(await getCurrentFooditem(rid, fid))
        }
        fetchData(rid, fid)
    }, [fid])


    const handleDeleteFooditem = (rid: string, fid: string) => {
        deleteFooditem(rid, fid)
        history.push(`/users/profile/restaurants/${rid}`)
    }

    return (

        fooditem ?
            <div className='tile is-parent is-vertical'>
                <p>{fooditem.name}</p>
                <p>{fooditem.type}</p>
                {fooditem.photo ?
                    <img src={`http://localhost:5000/images/${fooditem.photo}`} width='140' alt='' />
                    : <img src={food} width='140' alt='' />}
                <article className='tile is-child is-vertical'>
                    <p>amount available: {fooditem.amount}</p>
                    <p>{fooditem.price}€</p>
                    <p>swap possible?: {fooditem.swapPossible}</p>
                    <button onClick={(() => history.push(`/users/profile/restaurants/${rid}/fooditems/${fooditem._id}/edit`))}><p>edit</p></button>
                    <button onClick={(() => handleDeleteFooditem(rid, fooditem._id))}><p>delete</p></button>
                </article>
            </div>
            : null

    )
}

export default FooditemView