// move all hooks and states to views, use Fooditem mainly for rendering, handing down props

import React, { useContext, useState, useEffect } from 'react'
import { FooditemContext } from '../context/fooditemContext'
import { Paper, TextField, Typography } from '@material-ui/core'
import Fooditem from '../components/fooditems/Fooditem'
import { Button, Container } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'




const FoodView = () => {

    const { createNewFooditem } = useContext(FooditemContext)
    const [fooditems, setFooditems] = useState([])
    const [body, setBody] = useState('')

    const getFooditems = async () => {
        const fooditems = await fetch(`http://localhost:3000/api/fooditems/all`)
        console.log('fooditems:', fooditems)
        setFooditems(fooditems.json())
    }

    useEffect(() => {
        getFooditems()
    }, [fooditems])


    console.log('updated fooditemlist:', fooditems)


    const handleOnChange = (e) => {
        setBody(e.target.value)
    }
    const handleCreateNewFooditem = () => {
        createNewFooditem(body)
        getFooditems()
    }




    return (

        <Container>
            <Typography variant='h2' color='default' component='h4' align='center'>fooditems</Typography>

            <TextField fullWidth variant='outlined' type="text" placeholder='name of new fooditem' value={body} onChange={handleOnChange} />
            <Button variant='contained' onClick={handleCreateNewFooditem} type='submit' endIcon={<KeyboardArrowRightIcon />}>add new fooditem</Button>

            {fooditems ?
                fooditems.map((item, i) => {
                    return (
                        <div /*className={classes.field}*/ key={i}>
                            <Paper>
                                <Fooditem fooditem={item} />
                            </Paper>
                        </div>
                    )
                })
                : <Typography>loading...</Typography>
            }
        </Container>
    )
}

export default FoodView