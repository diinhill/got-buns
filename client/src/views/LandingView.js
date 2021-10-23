import '../components/style/App.css'
import bun from '../components/style/img/bun.jpg'
import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Typography, TextField, Container, FormControl, FormLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import axios from 'axios'


const useStyles = makeStyles({
    field: {
        display: 'blocks',
        marginBottom: 20,
        marginTop: 20,
    },
})


const LandingView = () => {


    const classes = useStyles()
    const history = useHistory()


    const handleClick = () => {
        history.push('/users/profile/restaurants')
    }




    return (

        <div className='HomeView'>
            <header className='HomeView-header'>
                <Typography>got buns</Typography>
                <img fullwidth src={bun} className='App-logo' alt='logo' />

                <Button className='styled.button' onClick={handleClick}>
                    <Typography>enter</Typography>
                </Button>
            </header>
        </div>

        // <Container>
        //     <Typography>got buns</Typography>
        //     <img src={bun} className='App-logo' alt='logo' />
        // </Container>
    )
}
export default LandingView