import React, { useState, useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { getAuthHeader } from '../utils/Helper'

type RestaurantParams = {
    rid: string
}

const AddFooditem = () => {

    const history = useHistory()
    const [newFooditem, setNewFooditem] = useState({ photo: '', name: '', type: '', amount: '', /* purchaseDate: '', dueDate: '',  */price: '', swapPossible: '' })
    const { rid } = useParams<RestaurantParams>()

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('photo', newFooditem.photo)
        formData.append('name', newFooditem.name)
        formData.append('type', newFooditem.type)
        formData.append('amount', newFooditem.amount)
        /* formData.append('purchaseDate', newFooditem.purchaseDate)
        formData.append('dueDate', newFooditem.dueDate) */
        formData.append('price', newFooditem.price)
        formData.append('swapPossible', newFooditem.swapPossible)

        try {
            await axios.patch(`http://localhost:5000/api/restaurants/${rid}/addfooditem`, formData, { headers: getAuthHeader() })
            history.push(`/users/profile/restaurants/${rid}`)
        } catch (error) {
            console.log('error:', error)
            history.push(`/users/profile/restaurants/addfooditem/${rid}`)
        }
    }

    const handleChange = (e: React.ChangeEvent<any>) => {
        setNewFooditem({ ...newFooditem, [e.target.name]: e.target.value })
    }

    const handlePhoto = (e: React.ChangeEvent<any>) => {
        setNewFooditem({ ...newFooditem, photo: e.target.files[0] })
        console.log('filename:', e.target.files[0].name)
        const imgfile = document.getElementById('imgfile')
        imgfile?.append(' >> ' + e.target.files[0].name)
    }


    console.log('newFooditem:', newFooditem)


    return (

        <div>
            <form encType='multipart/form-data'>
                <div className='field'>
                    <label className='label'>name</label>
                    <div className='control'>
                        <input className='input' required type='text' name='name' onChange={handleChange} value={newFooditem.name} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>type</label>
                    <div className='control'>
                        <div className='select'>
                            <select value={newFooditem.type} name='type' onChange={handleChange}>
                                <option value='vegetables'>vegetables</option>
                                <option value='fruits'>fruits</option>
                                <option value='breads'>breads</option>
                                <option value='dairy products'>dairy products</option>
                                <option value='other'>other</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='field'>
                    <div className='field-label'>
                        <label className='label'>swap possible?</label>
                    </div>
                    <div className='field-body'>
                        <div className='field'>
                            <div className='control'>
                                <label className='radio'>
                                    <input type='radio' name='swapPossible' value='true' onChange={handleChange} />
                                    yes
                                </label>
                                <label className='radio'>
                                    <input type='radio' name='swapPossible' value='false' onChange={handleChange} />
                                    no
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>choose food picture</label>
                    <div className='control' id='imgfile'>
                        <input className='input' is-outlined type='file' name='photo' onChange={handlePhoto} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>amount</label>
                    <div className='control'>
                        <input className='input' required type='text' name='amount' onChange={handleChange} value={newFooditem.amount} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>price</label>
                    <div className='control'>
                        <input className='input' required type='text' name='price' onChange={handleChange} value={newFooditem.price} />
                    </div>
                </div>
                <button className='button' is-contained type='submit' onClick={handleSubmit}>submit</button>
            </form>
        </div>
    )
}

export default AddFooditem