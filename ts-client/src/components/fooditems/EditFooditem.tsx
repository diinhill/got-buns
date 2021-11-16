import React, { useState, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { RestaurantContext } from '../../context/RestaurantContext'

type RestaurantParams = {
    rid: string
}
type FooditemParams = {
    fid: string
}

const EditFooditem = () => {

    const history = useHistory()
    const { rid } = useParams<RestaurantParams>()
    const { fid } = useParams<FooditemParams>()
    const { editFooditem } = useContext(RestaurantContext)
    const [newFooditem, setNewFooditem] = useState({ photo: '', name: '', type: '', amount: '', /* purchaseDate: '', dueDate: '',  */price: '', swapPossible: '', reserved: '' })


    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const formData = new FormData()
        newFooditem.photo && formData.append('photo', newFooditem.photo)
        newFooditem.name && formData.append('name', newFooditem.name)
        newFooditem.type && formData.append('type', newFooditem.type)
        newFooditem.amount && formData.append('amount', newFooditem.amount)
        /* formData.append('purchaseDate', newFooditem.purchaseDate)
        formData.append('dueDate', newFooditem.dueDate) */
        newFooditem.price && formData.append('price', newFooditem.price)
        newFooditem.swapPossible && formData.append('swapPossible', newFooditem.swapPossible)
        newFooditem.reserved && formData.append('reserved', newFooditem.reserved)

        try {
            await editFooditem(rid, fid)
            history.push(`/users/profile/restaurants/${rid}/fooditems/${fid}`)
        } catch (error) {
            console.log('error:', error)
            history.push(`/users/profile/restaurants/${rid}/fooditems/${fid}/edit`)
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
                        <input className='input' type='text' name='name' onChange={handleChange} value={newFooditem.name} />
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
                        <input className='input' type='text' name='amount' onChange={handleChange} value={newFooditem.amount} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>price</label>
                    <div className='control'>
                        <input className='input' type='text' name='price' onChange={handleChange} value={newFooditem.price} />
                    </div>
                </div>
                <div className='field'>
                    <div className='field-label'>
                        <label className='label'>reserved?</label>
                    </div>
                    <div className='field-body'>
                        <div className='field'>
                            <div className='control'>
                                <label className='radio'>
                                    <input type='radio' name='reserved' value='true' onChange={handleChange} />
                                    yes
                                </label>
                                <label className='radio'>
                                    <input type='radio' name='reserved' value='false' onChange={handleChange} />
                                    no
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='button' is-contained type='submit' onClick={handleSubmit}>submit</button>
            </form>
        </div>
    )
}

export default EditFooditem