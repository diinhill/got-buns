// move all hooks and states to views, use Fooditem mainly for rendering, handing down props
import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { TextField, Typography, Button, Container } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Fooditem from '../components/fooditems/Fooditem'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import axios from 'axios'
import AddFooditem from '../components/fooditems/AddFooditem'




const FooditemsView = () => {

    const [fooditems, setFooditems] = useState([])
    const history = useHistory()


    useEffect(() => {
        const getFooditems = async () => {
            const res = await axios.get('http://localhost:5000/api/fooditems/')
            console.log('res:', res.data)
            setFooditems(res.data)
        }
        getFooditems()
    }, [])


    return (

        <Container>
            <Typography variant='h2' color='default' component='h4' align='center'>fooditems</Typography>
            <Button variant='contained' onClick={(() => history.push('/fooditems/add'))} type='submit' endIcon={<KeyboardArrowRightIcon />}>add new fooditem</Button>

            {fooditems ?
                fooditems.map((fooditem, i) => {
                    return (
                        <Card>
                            <CardHeader title={fooditem.name} subheader={<i>{fooditem.type}</i>} />
                            <CardMedia title='foodpic' align='center'>
                                <img src={fooditem.photo} alt='' />
                            </CardMedia>
                            <Button variant='contained' onClick={(() => <Fooditem key={i} fooditem={fooditem} />)} type='submit' endIcon={<KeyboardArrowRightIcon />}>see fooditem</Button>
                        </Card >
                    )
                })
                : <Typography>loading...</Typography>
            }
        </Container>
    )
}

export default FooditemsView