import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, TextField, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import axios from 'axios'


const useStyles = makeStyles({
    field: {
        display: 'blocks',
        marginBottom: 20,
        marginTop: 20,
    }
})


const Login = () => {

    const classes = useStyles()
    const history = useHistory()
    const [state, setState] = useState({ email: '', password: '' })
    const [user, setUser] = useState(null)


    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post('http://localhost:5000/api/users/login', state)
        console.log('response:', response.data)
        if (response.data.token) {
            localStorage.setItem('token', response.data.token)
            setUser(response.data.user)
            history.push(`/users/${response.data.user._id}`)
        } else {
            history.push('/login')
        }
    }

    return (

        <Container>
            <form onSubmit={handleSubmit}>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='email' type='email' name='email' onChange={handleChange} value={state.email} />
                </label>
                <label>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='password' type='password' name='password' onChange={handleChange} value={state.password} />
                </label>
                <div>
                    <Button className={classes.field} variant='contained' /*color='default'*/ /*disableElevation*/ type='submit' /* href='#contained-buttons' */>submit</Button>
                </div>
            </form>
        </Container>
    )
}

export default Login