import React from 'react'
import { Typography, Button, Container, Paper } from '@material-ui/core'
import { useHistory, useParams } from 'react-router'




const Foodalert = ({ foodalert }) => {

    const history = useHistory()
    console.log('foodalert:', foodalert)
    const { rid } = useParams()


    return (

        <Container>
            <Paper>
                <Typography>{foodalert.title}</Typography>
                <br></br>
                <Typography>amount: {foodalert.amount}</Typography>
                <Typography>as soon as possible? {foodalert.asap}</Typography>
                <Typography>until latest date: {foodalert.untilLatest}</Typography>
                <Typography>price: {foodalert.price}</Typography>
                <Typography>swap is possible? {foodalert.swapPossible}</Typography>
            </Paper>

            <Button onClick={(() => history.push(`/restaurants/${rid}`))}><Typography>go to restaurant that issued the alert</Typography></Button>
            {/* <Button onClick={(() => history.push(`/users/profile/foodalerts/${foodalert._id}/fooditems`))}><Typography>respond to the alert</Typography></Button> */}
        </Container>

    )
}

export default Foodalert
