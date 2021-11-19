import React, { useState, useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Restaurant } from '../@types'
import HumongousHeader from '../components/core/HumongousHeader'
import RestaurantForm from '../components/restaurants/RestaurantForm'
import { AuthContext } from '../context/AuthContext'
import { RestaurantContext } from '../context/RestaurantContext'
import defaultBgImage from '../assets/img/chumbucket.png'

type RestaurantParams = {
    rid: string
}

const EditRestaurantView = () => {

    const history = useHistory()
    const { rid } = useParams<RestaurantParams>()
    const { user } = useContext(AuthContext)
    const { editRestaurant, getCurrentRestaurant } = useContext(RestaurantContext)
    const [restaurant, setRestaurant] = useState<Restaurant>()
    const [newRestaurant, setNewRestaurant] = useState<Partial<Restaurant>>({
        photo: '', name: '',/*  type: '', cuisineType: '', */
        street: '', number: '', postal: '', town: '', phone: ''
    })
    const [imgfile, setImgfile] = useState<File | string>('')

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
        // newRestaurant.photo && formData.append('photo', newRestaurant.photo)
        imgfile && formData.append('photo', imgfile)
        newRestaurant.name && formData.append('name', newRestaurant.name)
        // newRestaurant.type && formData.append('type', newRestaurant.type)
        // newRestaurant.cuisineType && formData.append('cuisineType', newRestaurant.cuisineType)
        newRestaurant.street && formData.append('street', newRestaurant.street)
        newRestaurant.number && formData.append('number', newRestaurant.number)
        newRestaurant.postal && formData.append('postal', newRestaurant.postal)
        newRestaurant.town && formData.append('town', newRestaurant.town)
        newRestaurant.phone && formData.append('phone', newRestaurant.phone)

        try {
            editRestaurant(formData, rid)
            history.push('/users/profile')
        } catch (error) {
            console.log('error:', error)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewRestaurant({ ...newRestaurant, [e.target.name]: e.target.value })
    }

    const handlePhoto = (photo: File) => {
        const fileName = photo.name
        setNewRestaurant({ ...newRestaurant, photo: fileName })
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

    console.log('newRestaurant:', newRestaurant)


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
                    <h3 className='title'>Update Your Restaurant Profile</h3>
                    <RestaurantForm newRestaurant={newRestaurant}
                        handleChange={handleChange} handlePhoto={handlePhoto} handleSubmit={handleSubmit} />
                </div>
            </div>
            : null

    )
}

export default EditRestaurantView