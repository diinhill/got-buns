import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router'
import { PrivaterouteContext } from '../../context/privaterouteContext'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, TextField, Button, Container, Typography } from '@material-ui/core'


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




const Register = () => {

    const history = useHistory()
    const classes = useStyles()
    const { register } = useContext(PrivaterouteContext)
    const [newUser, setNewUser] = useState({ email: '', password: '', name: '', photo: '', profession: '' })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('photo', newUser.photo)
        formData.append('email', newUser.email)
        formData.append('name', newUser.name)
        formData.append('password', newUser.password)
        formData.append('profession', newUser.profession)

        try {
            await register(formData)
            history.push('/login')
        } catch (e) {
            alert(e.message)
        }
    }


    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value })
    }

    const handlePhoto = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.files[0] })
        console.log('files:', e.target.files)
        console.log('filename:', e.target.files[0].name)
        const imgfile = document.getElementById('imgfile')
        imgfile.append(' >> ' + e.target.files[0].name)
    }


    console.log('newUser:', newUser)


    return (

        <Container /*className={classes.root}*/>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='name' type='text' name='name' onChange={handleChange} value={newUser.name} />
                </label>
                <label>
                    <div id='imgfile'>
                        <input type='file' id='fileElem' /*multiple accept='image/*'*/ className='visually-hidden' accept='.png, .jpg, .jpeg' name='photo' onChange={handlePhoto} />
                        <label for='fileElem'>choose profile picture</label>
                    </div>
                </label>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='email' type='email' name='email' onChange={handleChange} value={newUser.email} />
                </label>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='password' type='password' name='password' onChange={handleChange} value={newUser.password} />
                </label>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' label='profession' type='text' name='profession' onChange={handleChange} value={newUser.profession} />
                </label>

                <div>
                    <Button className={classes.field} variant='contained' type='submit'>submit</Button>
                </div>
            </form>
        </Container>
    )
}

export default Register