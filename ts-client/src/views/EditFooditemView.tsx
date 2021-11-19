import React, { useState, useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { RestaurantContext } from '../context/RestaurantContext'
import defaultBgImage from '../assets/img/chumbucket.png'
import { AuthContext } from '../context/AuthContext'
import { Restaurant } from '../@types'
import HumongousHeader from '../components/core/HumongousHeader'
import FooditemForm from '../components/fooditems/FooditemForm'

type RestaurantParams = {
    rid: string
}
type FooditemParams = {
    fid: string
}

const EditFooditemView = () => {

    const history = useHistory()
    const { rid } = useParams<RestaurantParams>()
    const { fid } = useParams<FooditemParams>()
    const { user } = useContext(AuthContext)
    const { editFooditem, getCurrentRestaurant } = useContext(RestaurantContext)
    const [newFooditem, setNewFooditem] = useState({
        photo: '', name: '', type: '', amount: '',
        purchaseDate: '', dueDate: '', price: '', swapPossible: '', reserved: ''
    })
    const [imgfile, setImgfile] = useState<File | string>('')
    const [restaurant, setRestaurant] = useState<Restaurant | undefined>()

    useEffect(() => {
        let currentRestaurant: Restaurant | undefined = user?.restaurants.find(restaurant => restaurant._id === rid)
        if (currentRestaurant)
            setRestaurant(currentRestaurant)
        else {
            fetchData(rid)
        }
        async function fetchData(rid: string) {
            setRestaurant(getCurrentRestaurant(rid))
        }
    }, [])

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const formData = new FormData()
        imgfile && formData.append('photo', imgfile)
        newFooditem.name && formData.append('name', newFooditem.name)
        newFooditem.type && formData.append('type', newFooditem.type)
        newFooditem.amount && formData.append('amount', newFooditem.amount)
        newFooditem.purchaseDate && formData.append('purchaseDate', newFooditem.purchaseDate)
        newFooditem.dueDate && formData.append('dueDate', newFooditem.dueDate)
        newFooditem.price && formData.append('price', newFooditem.price)
        newFooditem.swapPossible && formData.append('swapPossible', newFooditem.swapPossible)
        newFooditem.reserved && formData.append('reserved', newFooditem.reserved)
        try {
            editFooditem(rid, fid)
            history.push(`/users/profile/restaurants/${rid}/fooditems/${fid}`)
        } catch (error) {
            console.log('error:', error)
            history.push(`/users/profile/restaurants/${rid}/fooditems/${fid}/edit`)
        }
    }

    const handleChange = (e: React.ChangeEvent<any>) => {
        setNewFooditem({ ...newFooditem, [e.target.name]: e.target.value })
    }
    const handlePhoto = (photo: File) => {
        const fileName = photo.name
        setNewFooditem({ ...newFooditem, photo: fileName })
        setImgfile(photo)
    }

    useEffect(() => {
        document.body.classList.add('profile-page')
        window.scrollTo(0, 0)
        document.body.scrollTop = 0
        return function cleanup() {
            document.body.classList.remove('profile-page')
        }
    }, [])

    console.log('newFooditem:', newFooditem)


    return (

        restaurant ?
            <div className='wrapper'>
                <HumongousHeader
                    backgroundImage={restaurant.photo ? `http://localhost:5000/images/${restaurant.photo}` : defaultBgImage}
                    title={restaurant.name}
                    category={restaurant.town}
                    qty={restaurant.fooditems.length}
                    qtyName={restaurant.fooditems.length <= 1 ? 'Food Item' : 'Food Items'}
                    avatar={''}
                />
                <div className='section'>
                    <h3 className='title'>Update Your Food Item</h3>
                    <FooditemForm newFooditem={newFooditem}
                        handleChange={handleChange} handlePhoto={handlePhoto} handleSubmit={handleSubmit} />
                </div>
            </div>
            : null

    )
}
export default EditFooditemView