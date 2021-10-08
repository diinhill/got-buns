import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/authContext'
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
    // const { login } = useContext(AuthContext)
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)


    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const res = axios.post('http://localhost:5000/api/users/login', state)
        const data = res.data
        console.log('data:', data)
        const user = data.user
        console.log('user:', user)
        const token = data.token
        console.log('token:', token)
        setUser(user)
        setToken(token)
        history.push(`/users/${user._id}`)
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