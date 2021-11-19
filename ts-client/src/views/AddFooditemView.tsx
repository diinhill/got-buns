import React, { useState, useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { RestaurantContext } from '../context/RestaurantContext'
import defaultBgImage from '../assets/img/chumbucket.png'
import HumongousHeader from '../components/core/HumongousHeader'
import { Restaurant } from '../@types'
import { AuthContext } from '../context/AuthContext'
import FooditemForm from '../components/fooditems/FooditemForm'


type RestaurantParams = {
    rid: string
}

const AddFooditemView = () => {

    const history = useHistory()
    const { rid } = useParams<RestaurantParams>()
    const { user } = useContext(AuthContext)
    const { addFooditem, getCurrentRestaurant } = useContext(RestaurantContext)
    const [newFooditem, setNewFooditem] = useState({ photo: '', name: '', type: '', amount: '', purchaseDate: '', dueDate: '', price: '', swapPossible: '' })
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
        formData.append('name', newFooditem.name)
        formData.append('type', newFooditem.type)
        formData.append('amount', newFooditem.amount)
        formData.append('purchaseDate', newFooditem.purchaseDate)
        formData.append('dueDate', newFooditem.dueDate)
        formData.append('price', newFooditem.price)
        formData.append('swapPossible', newFooditem.swapPossible)
        formData.append('photo', imgfile)
        // formData.append('photo', newFooditem.photo)
        try {
            addFooditem(formData, rid)
            history.push(`/users/profile/restaurants/${rid}`)
        } catch (error) {
            console.log('error:', error)
            history.push(`/users/profile/restaurants/addfooditem/${rid}`)
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
                    <h3 className='title'>Create A New Food Item</h3>
                    <FooditemForm newFooditem={newFooditem}
                        handleChange={handleChange} handlePhoto={handlePhoto} handleSubmit={handleSubmit} />
                </div>
            </div>
            : null

    )
}
export default AddFooditemView