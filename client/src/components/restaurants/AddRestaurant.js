import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../context/authContext'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, TextField, Button, Container, Typography } from '@material-ui/core'
import { FormControl, FormLabel, FormControlLabel, RadioGroup, InputLabel, MenuItem, Select, Radio } from '@material-ui/core'
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




const AddRestaurant = () => {

    const classes = useStyles()
    const history = useHistory()
    const [newRestaurant, setNewRestaurant] = useState({ photo: '', name: '', street: '', number: '', postal: '', town: '', phone: '' })

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('photo', newRestaurant.photo)
        formData.append('name', newRestaurant.name)
        formData.append('street', newRestaurant.street)
        formData.append('number', newRestaurant.number)
        formData.append('postal', newRestaurant.postal)
        formData.append('town', newRestaurant.town)
        formData.append('phone', newRestaurant.phone)

        axios.post('http://localhost:5000/api/restaurants/', formData)
            .then(res => {
                console.log(res)
                history.push('/users/profile/restaurants')
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleChange = (e) => {
        setNewRestaurant({ ...newRestaurant, [e.target.name]: e.target.value })
    }

    const handlePhoto = (e) => {
        setNewRestaurant({ ...newRestaurant, photo: e.target.files[0] })
        console.log('filename:', e.target.files[0].name)
        const imgfile = document.getElementById('imgfile')
        imgfile.append(' >> ' + e.target.files[0].name)
    }


    console.log('newRestaurant:', newRestaurant)


    return (

        <Container /*className={classes.root}*/>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='name' type='text' name='name' onChange={handleChange} value={newRestaurant.name} />
                </label>
                <label>
                    <div id='imgfile' /*id={dropbox}*/>
                        <input type='file' id='fileElem' /*multiple accept='image/*'*/ className='visually-hidden' accept='.png, .jpg, .jpeg' name='photo' onChange={handlePhoto} />
                        <label for='fileElem'>choose restaurant picture</label>
                    </div>
                </label>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='street' type='text' name='street' onChange={handleChange} value={newRestaurant.street} />
                </label>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='number' type='text' name='number' onChange={handleChange} value={newRestaurant.number} />
                </label>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='postal' type='text' name='postal' onChange={handleChange} value={newRestaurant.postal} />
                </label>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='town' type='text' name='town' onChange={handleChange} value={newRestaurant.town} />
                </label>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='phone' type='text' name='phone' onChange={handleChange} value={newRestaurant.phone} />
                </label>
                <div>
                    <Button className={classes.field} variant='contained' type='submit'>submit</Button>
                </div>
            </form>
        </Container>
    )
}

export default AddRestaurant