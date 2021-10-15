import React, { useContext, useState, useEffect } from 'react'
import { TextField, Typography, Button, Container } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import Foodalert from '../components/foodalerts/Foodalert'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import axios from 'axios'
import AddFoodalert from '../components/foodalerts/AddFoodalert'




const MyFoodalertsView = () => {

    const [foodalerts, setFoodalerts] = useState([])
    const { rid } = useParams()


    useEffect(() => {
        const getFoodalerts = async () => {
            const res = await axios.get(`http://localhost:5000/api/foodalerts/${rid}`)
            console.log('res:', res.data)
            const data = res.data
            console.log('data:', data)
            setFoodalerts(data)
        }
        getFoodalerts()
    }, [foodalerts])


    return (

        <Container>
            <Typography variant='h2' color='default' component='h4' align='center'>my foodalerts</Typography>
            <Button variant='contained' onClick={(() => <AddFoodalert />)} type='submit' endIcon={<KeyboardArrowRightIcon />}>create foodalert</Button>

            {foodalerts ?
                foodalerts.map((foodalert, i) => {
                    return (
                        <Foodalert key={i} foodalert={foodalert} />
                    )
                })
                : <Typography>loading...</Typography>
            }
        </Container>
    )
}

export default MyFoodalertsView