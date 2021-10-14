import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../context/authContext'
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, TextField, Button, Container, Typography } from '@material-ui/core'
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
    root: {
        // backgroundColor: deepOrange[500],
    },
    field: {
        display: 'blocks',
        marginBottom: 20,
        marginTop: 20,
    }
}))




const AddFoodItem = () => {

    const classes = useStyles()
    const history = useHistory()
    const [newFooditem, setNewFooditem] = useState({ photo: '', name: '', type: '', amount: '', purchaseDate: '', dueDate: '', price: '', swapPossible: '' })
    const { id } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('photo', newFooditem.photo)
        formData.append('name', newFooditem.name)
        formData.append('type', newFooditem.type)
        formData.append('amount', newFooditem.amount)
        formData.append('purchaseDate', newFooditem.purchaseDate)
        formData.append('dueDate', newFooditem.dueDate)
        formData.append('price', newFooditem.price)
        formData.append('swapPossible', newFooditem.swapPossible)

        axios.post(`http://localhost:5000/api/fooditems/${id}/add`, formData)
            .then(res => {
                console.log(res)
                history.push('/fooditems')
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleChange = (e) => {
        setNewFooditem({ ...newFooditem, [e.target.name]: e.target.value })
    }

    const handlePhoto = (e) => {
        setNewFooditem({ ...newFooditem, photo: e.target.files[0] })
        console.log('filename:', e.target.files[0].name)
        const imgfile = document.getElementById('imgfile')
        imgfile.append(' >> ' + e.target.files[0].name)
    }


    console.log('newFooditem:', newFooditem)


    return (

        <Container /*className={classes.root}*/>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='name' type='text' name='name' onChange={handleChange} value={newFooditem.name} />
                </label>
                <label>
                    <div id='imgfile' /*id={dropbox}*/>
                        <input type='file' id='fileElem' /*multiple accept='image/*'*/ className='visually-hidden' accept='.png, .jpg, .jpeg' name='photo' onChange={handlePhoto} />
                        <label for='fileElem'>choose food picture</label>
                    </div>
                </label>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='amount' type='text' name='amount' onChange={handleChange} value={newFooditem.amount} />
                </label>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='price' type='text' name='price' onChange={handleChange} value={newFooditem.price} />
                </label>
                <div>
                    <Button className={classes.field} variant='contained' type='submit'>submit</Button>
                </div>
            </form>
        </Container>
    )
}

export default AddFoodItem