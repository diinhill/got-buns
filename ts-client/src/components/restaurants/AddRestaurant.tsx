import React, { useState, useContext, useEffect, ChangeEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { RestaurantContext } from '../../context/RestaurantContext'



const AddRestaurant = () => {

    const history = useHistory()
    const { addRestaurant } = useContext(RestaurantContext)
    const [newRestaurant, setNewRestaurant] = useState({ photo: '', name: '', street: '', number: '', postal: '', town: '', phone: '' })

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('photo', newRestaurant.photo)
        formData.append('name', newRestaurant.name)
        formData.append('street', newRestaurant.street)
        formData.append('number', newRestaurant.number)
        formData.append('postal', newRestaurant.postal)
        formData.append('town', newRestaurant.town)
        formData.append('phone', newRestaurant.phone)

        try {
            await addRestaurant(formData)
            history.push('/users/profile/restaurants')
        } catch (error) {
            console.log('error:', error)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewRestaurant({ ...newRestaurant, [e.target.name]: e.target.value })
    }

    const handlePhoto = (e: React.ChangeEvent<any>) => {
        setNewRestaurant({ ...newRestaurant, photo: e.target.files[0] })
        console.log('filename:', e.target.files[0].name)
        const imgfile = document.getElementById('imgfile')
        imgfile?.append(' >> ' + e.target.files[0].name)
    }


    console.log('newRestaurant:', newRestaurant)


    return (

        <div>
            <form encType='multipart/form-data'>
                <div className='field'>
                    <label className='label'>name</label>
                    <div className='control'>
                        <input className='input' is-outlined required type='text' name='name' onChange={handleChange} value={newRestaurant.name} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>choose restaurant picture</label>
                    <div className='control' id='imgfile'>
                        <input className='input' is-outlined type='file' name='photo' /* accept='.png, .jpg, .jpeg' */ onChange={handlePhoto} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>street</label>
                    <div className='control'>
                        <input className='input' is-outlined required type='text' name='street' onChange={handleChange} value={newRestaurant.street} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>number</label>
                    <div className='control'>
                        <input className='input' is-outlined required type='text' name='number' onChange={handleChange} value={newRestaurant.number} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>postal</label>
                    <div className='control'>
                        <input className='input' is-outlined required type='text' name='postal' onChange={handleChange} value={newRestaurant.postal} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>town</label>
                    <div className='control'>
                        <input className='input' is-outlined required type='text' name='town' onChange={handleChange} value={newRestaurant.town} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>phone</label>
                    <div className='control'>
                        <input className='input' is-outlined required type='text' name='phone' onChange={handleChange} value={newRestaurant.phone} />
                    </div>
                </div>
                <button className='button' is-contained type='submit' onClick={handleSubmit}>submit</button>
            </form>
        </div>
    )
}

export default AddRestaurant