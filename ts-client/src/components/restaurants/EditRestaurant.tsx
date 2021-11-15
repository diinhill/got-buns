import React, { useState, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { RestaurantContext } from '../../context/RestaurantContext'

type RestaurantParams = {
    rid: string
}

const EditRestaurant = () => {

    const history = useHistory()
    const { rid } = useParams<RestaurantParams>()
    const { editRestaurant } = useContext(RestaurantContext)
    const [newRestaurant, setNewRestaurant] = useState({ photo: '', name: '', street: '', number: '', postal: '', town: '', phone: '' })

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const formData = new FormData()
        newRestaurant.photo && formData.append('photo', newRestaurant.photo)
        newRestaurant.name && formData.append('name', newRestaurant.name)
        newRestaurant.street && formData.append('street', newRestaurant.street)
        newRestaurant.number && formData.append('number', newRestaurant.number)
        newRestaurant.postal && formData.append('postal', newRestaurant.postal)
        newRestaurant.town && formData.append('town', newRestaurant.town)
        newRestaurant.phone && formData.append('phone', newRestaurant.phone)

        try {
            await editRestaurant(formData, rid)
            history.push('/users/profile')
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
                        <input className='input' type='text' name='name' onChange={handleChange} value={newRestaurant.name} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>choose restaurant picture</label>
                    <div className='control' id='imgfile'>
                        <input className='input' type='file' name='photo' /* accept='.png, .jpg, .jpeg' */ onChange={handlePhoto} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>street</label>
                    <div className='control'>
                        <input className='input' type='text' name='street' onChange={handleChange} value={newRestaurant.street} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>number</label>
                    <div className='control'>
                        <input className='input' type='text' name='number' onChange={handleChange} value={newRestaurant.number} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>postal</label>
                    <div className='control'>
                        <input className='input' type='text' name='postal' onChange={handleChange} value={newRestaurant.postal} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>town</label>
                    <div className='control'>
                        <input className='input' type='text' name='town' onChange={handleChange} value={newRestaurant.town} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>phone</label>
                    <div className='control'>
                        <input className='input' type='text' name='phone' onChange={handleChange} value={newRestaurant.phone} />
                    </div>
                </div>
                <button className='button' type='submit' onClick={handleSubmit}>submit</button>
            </form>
        </div>
    )
}

export default EditRestaurant