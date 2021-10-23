import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, TextField, Container, FormControl, FormLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import axios from 'axios'
import { PrivaterouteContext } from '../../context/privaterouteContext'


const useStyles = makeStyles({
    field: {
        display: 'blocks',
        marginBottom: 20,
        marginTop: 20,
    },
})


const Login = () => {

    const classes = useStyles()
    const history = useHistory()
    const [state, setState] = useState({ email: '', password: '' })
    const { login } = useContext(PrivaterouteContext)


    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(state)
            history.push('/users/profile/restaurants')
        } catch (error) {
            console.log('error login:', error)
            history.push('/login')
        }
    }

    return (

        <Container>
            <FormControl onSubmit={handleSubmit}>
                <FormLabel>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='email' type='email' name='email' onChange={handleChange} value={state.email} />
                </FormLabel>
                <FormLabel>
                    <TextField className={classes.field} fullWidth variant='outlined' required label='password' type='password' name='password' onChange={handleChange} value={state.password} />
                </FormLabel>
                <Container>
                    <Button className={classes.field} variant='contained' /*color='default'*/ /*disableElevation*/ type='submit' /* href='#contained-buttons' */ onClick={handleSubmit}>submit</Button>
                </Container>
                <Container>
                    <Button className={classes.field} variant='contained' type='submit' onClick={(() => history.push('/register'))}>create new account</Button>
                </Container>
            </FormControl>
        </Container>
    )
}

export default Login