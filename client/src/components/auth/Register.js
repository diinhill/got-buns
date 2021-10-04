import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../context/authContext'
import { useHistory } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, TextField, Button, Container, Typography } from '@material-ui/core'
import App from '../style/App.css'


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




const Register = ({ dropbox, img, file }) => {

    const classes = useStyles()
    const history = useHistory()
    const [state, setState] = useState({ email: '', password: '', name: '' })
    const { register, user } = useContext(AuthContext)

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const handleOnSubmit = (event) => {
        event.preventDefault()
        register(state)
    }

    useEffect(() => {
        user && history.push('/login')
    }, [user, history])

    console.log('state:', state)


    return (

        <Container /*className={classes.root}*/>
            <form onSubmit={handleOnSubmit}>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='name' type='text' name='name' onChange={handleChange} value={state.name} />
                </label>
                <label>
                    <div id={dropbox}>
                        <input type='file' id='fileElem' multiple accept='image/*' class='visually-hidden' />
                        <label for='fileElem'>select an image</label>
                        <div id='fileList'>
                            <Typography>No files selected!</Typography>
                        </div>
                    </div>
                </label>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='email' type='email' name='email' onChange={handleChange} value={state.email} />
                </label>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='password' type='password' name='password' onChange={handleChange} value={state.password} />
                </label>
                <div>
                    <Button className={classes.field} variant='contained' type='submit'>submit</Button>
                </div>
            </form>
        </Container>
    )
}

export default Register