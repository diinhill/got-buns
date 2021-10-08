import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../context/authContext'
import { useHistory } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, TextField, Button, Container, Typography } from '@material-ui/core'
import App from '../style/App.css'
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




const Register = (/*{ dropbox, img, file }*/) => {

    const classes = useStyles()
    const history = useHistory()
    const [newUser, setNewUser] = useState({ email: '', password: '', name: '', photo: '' })
    // const { register, user } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('photo', newUser.photo)
        formData.append('email', newUser.email)
        formData.append('name', newUser.name)
        formData.append('password', newUser.password)

        axios.post('http://localhost:5000/api/users/register', formData)
            .then(res => {
                console.log(res)
                // do I reroute to login here or setUser(user) ??
                history.push('/login')
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value })
    }

    const handlePhoto = (e) => {
        setNewUser({ ...newUser, photo: e.target.files[0] })
        console.log('filename:', e.target.files[0].name)
        const imgfile = document.getElementById('imgfile')
        imgfile.append(' >> ' + e.target.files[0].name)
    }

    // const handleOnSubmit = (event) => {
    //     event.preventDefault()
    //     register(state)
    // }

    // useEffect(() => {
    //     user && history.push('/login')
    // }, [user, history])

    console.log('newUser:', newUser)


    return (

        <Container /*className={classes.root}*/>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='name' type='text' name='name' onChange={handleChange} value={newUser.name} />
                </label>
                <label>
                    <div id='imgfile' /*id={dropbox}*/>
                        <input type='file' id='fileElem' /*multiple accept='image/*'*/ class='visually-hidden' accept='.png, .jpg, .jpeg' name='photo' onChange={handlePhoto} />
                        <label for='fileElem'>choose profile picture</label>
                    </div>
                </label>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='email' type='email' name='email' onChange={handleChange} value={newUser.email} />
                </label>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='password' type='password' name='password' onChange={handleChange} value={newUser.password} />
                </label>
                <div>
                    <Button className={classes.field} variant='contained' type='submit'>submit</Button>
                </div>
            </form>
        </Container>
    )
}

export default Register