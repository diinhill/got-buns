import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import HumongousHeader from '../components/core/HumongousHeader'
import { AuthContext } from '../context/AuthContext'
import { RestaurantContext } from '../context/RestaurantContext'
import defaultAvatar from '../assets/img/plankton.png'
import defaultBgImage from '../assets/img/chumbucket.png'
import RestaurantForm from '../components/restaurants/RestaurantForm'


const AddRestaurantView = () => {

    const history = useHistory()
    const { user } = useContext(AuthContext)
    const { addRestaurant } = useContext(RestaurantContext)
    const [newRestaurant, setNewRestaurant] = useState({
        photo: '', name: '', type: '', cuisineType: '',
        street: '', number: '', postal: '', town: '', phone: ''
    })
    const [imgfile, setImgfile] = useState<File | string>('')

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', newRestaurant.name)
        formData.append('type', newRestaurant.type)
        formData.append('cuisineType', newRestaurant.cuisineType)
        formData.append('street', newRestaurant.street)
        formData.append('number', newRestaurant.number)
        formData.append('postal', newRestaurant.postal)
        formData.append('town', newRestaurant.town)
        formData.append('phone', newRestaurant.phone)
        formData.append('photo', imgfile)
        // formData.append('photo', newRestaurant.photo)
        try {
            await addRestaurant(formData)
            history.push('/users/profile')
        } catch (error) {
            console.log('error:', error)
            history.push('/users/profile/restaurants/add')
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

        user ?
            <div className='wrapper'>
                <HumongousHeader
                    backgroundImage={user.restaurants[0].photo ? `http://localhost:5000/images/${user.restaurants[0].photo}` : defaultBgImage}
                    avatar={user.photo ? `http://localhost:5000/images/${user.photo}` : defaultAvatar}
                    title={user.name}
                    category={user.profession ? user.profession : ''}
                    qty={user.restaurants.length}
                    qtyName={user.restaurants.length <= 1 ? 'Restaurant' : 'Restaurants'}
                />
                <div className='section'>
                    <h3 className='title'>Add A New Restaurant</h3>
                    <RestaurantForm newRestaurant={newRestaurant}
                        handleChange={handleChange} handlePhoto={handlePhoto} handleSubmit={handleSubmit} />
                </div>
            </div>
            : null

    )
}
export default AddRestaurantView