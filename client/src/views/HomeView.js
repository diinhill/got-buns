import '../components/style/App.css'
import bun from '../components/style/img/bun.jpg'
import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Typography, TextField, Container, FormControl, FormLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import axios from 'axios'
import { AuthContext } from '../../context/authContext'


const useStyles = makeStyles({
    field: {
        display: 'blocks',
        marginBottom: 20,
        marginTop: 20,
    },
})


const HomeView = () => {


    const classes = useStyles()
    const history = useHistory()
    const [state, setState] = useState({ email: '', password: '' })
    const { setUser, user } = useContext(AuthContext)


    // const handleClick = () => {
    //         history.push('/users/profile/restaurants')
    //         :
    //         history.push('/login')
    // }

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
            console.log('user:', user)
            history.push('/users/profile/restaurants')
        } else {
            history.push('/login')
        }
    }


    return (
        // <div className='HomeView'>
        //     <header className='HomeView-header'>
        //         <img src={bun} className='App-logo' alt='logo' />

        //         <Button className='styled.button' onClick={handleClick}>
        //             <Typography>go to my restaurants profile</Typography>
        //         </Button>
        //     </header>
        // </div>

        <Container>
            <Typography>got buns</Typography>
            <img src={bun} className='App-logo' alt='logo' />

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
export default HomeView