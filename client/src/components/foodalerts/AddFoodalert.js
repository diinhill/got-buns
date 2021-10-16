import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../context/authContext'
import { useHistory, useParams } from 'react-router-dom'
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




const AddFoodalert = () => {

    const classes = useStyles()
    const history = useHistory()
    const { rid } = useParams()
    const [newFoodalert, setnewFoodalert] = useState({ title: '', amount: '', asap: '', untilLatest: '', price: '', swapPossible: '' })

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', newFoodalert.title)
        formData.append('amount', newFoodalert.amount)
        formData.append('asap', newFoodalert.asap)
        formData.append('untilLatest', newFoodalert.untilLatest)
        formData.append('price', newFoodalert.price)
        formData.append('swapPossible', newFoodalert.swapPossible)

        axios.post(`http://localhost:5000/api/foodalerts/${rid}`, formData)
            .then(res => {
                console.log(res)
                history.push(`/users/profile/restaurants/foodalerts/${rid}`)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleChange = (e) => {
        setnewFoodalert({ ...newFoodalert, [e.target.name]: e.target.value })
    }

    console.log('newFoodalert:', newFoodalert)


    return (

        <Container /*className={classes.root}*/>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='title' type='text' name='title' onChange={handleChange} value={newFoodalert.title} />
                </label>
                <FormControl component="fieldset">
                    <FormLabel component="legend">swap possible?</FormLabel>
                    <RadioGroup aria-label='swapPossible' name='swapPossible' value={newFoodalert.swapPossible} onChange={handleChange}>
                        <FormControlLabel value='false' control={<Radio />} label='no' />
                        <FormControlLabel value='true' control={<Radio />} label='yes' />
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset">
                    <FormLabel component="legend">as soon as possible?</FormLabel>
                    <RadioGroup aria-label='asap' name='asap' value={newFoodalert.asap} onChange={handleChange}>
                        <FormControlLabel value='false' control={<Radio />} label='no' />
                        <FormControlLabel value='true' control={<Radio />} label='yes' />
                    </RadioGroup>
                </FormControl>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='amount' type='text' name='amount' onChange={handleChange} value={newFoodalert.amount} />
                </label>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='untilLatest' type='text' name='untilLatest' onChange={handleChange} value={newFoodalert.untilLatest} />
                </label>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='price' type='text' name='price' onChange={handleChange} value={newFoodalert.price} />
                </label>
                <div>
                    <Button className={classes.field} variant='contained' type='submit'>submit</Button>
                </div>
            </form>
        </Container>
    )
}

export default AddFoodalert