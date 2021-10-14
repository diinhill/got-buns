// move all hooks and states to views, use Fooditem mainly for rendering, handing down props
import React, { useContext, useState, useEffect } from 'react'
import { TextField, Typography, Button, Container } from '@material-ui/core'
import Fooditem from '../components/fooditems/Fooditem'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import axios from 'axios'
import AddFooditem from '../components/fooditems/AddFooditem'




const FoodView = () => {

    const [fooditems, setFooditems] = useState([])


    useEffect(() => {
        const getFooditems = async () => {
            const res = await axios.get('http://localhost:5000/api/fooditems/')
            console.log('res:', res.data)
            const data = res.data
            console.log('data:', data)
            setFooditems(data)
        }
        getFooditems()
    }, [fooditems])


    return (

        <Container>
            <Typography variant='h2' color='default' component='h4' align='center'>fooditems</Typography>
            <Button variant='contained' onClick={(() => <AddFooditem />)} type='submit' endIcon={<KeyboardArrowRightIcon />}>add new fooditem</Button>

            {fooditems ?
                fooditems.map((fooditem, i) => {
                    return (
                        <Fooditem key={i} fooditem={fooditem} />
                    )
                })
                : <Typography>loading...</Typography>
            }
        </Container>
    )
}

export default FoodView