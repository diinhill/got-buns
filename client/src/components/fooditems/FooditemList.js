import React, { useContext, useState, useEffect } from 'react'
import { FooditemContext } from '../../context/fooditemContext'
import { Paper, TextField, Typography } from '@material-ui/core'
// import { Link } from 'react-router-dom'
// import IconButton from '@material-ui/core/IconButton'
// import RemoveIcon from '@material-ui/icons/Remove'
import { Button, Container } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles } from '@material-ui/styles'


const useStyles = makeStyles({
    field: {
        display: 'blocks',
        marginBottom: 20,
        marginTop: 20,
    }
})



const FooditemList = () => {

    const classes = useStyles()
    const { fooditems, getFooditems, createNewFooditem } = useContext(FooditemContext)
    const [body, setBody] = useState('')


    useEffect(() => {
        getFooditems()
    }, [])

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
            <Typography variant='h2' color='default' component='h4' align='center'>Fooditems</Typography>

            <TextField fullWidth variant='outlined' type="text" placeholder='name of new list' value={body} onChange={handleOnChange} />
            <Button className={classes.field} variant='contained' onClick={handleCreateNewFooditem} type='submit' endIcon={<KeyboardArrowRightIcon />}>create new fooditem</Button>

            {fooditems ?
                fooditems.map((item, i) => {
                    return (
                        <div className={classes.field} key={i}>
                            <Paper>
                                {/* <Link to={`/lists/${list?.listId}`}>
                                    <Typography>{list?.nameOfList}</Typography>
                                    <Typography>{((list?.listUpdatedOnDate).toDate().toLocaleString('en').substring(0, 14))}</Typography>
                                    <Typography>{list?.numberOfBooks}</Typography>
                                </Link>
                                <IconButton aria-label="delete this list" onClick={() => handleDeleteThisList(list)}>
                                    <RemoveIcon />
                                </IconButton> */}
                            </Paper>
                        </div>
                    )
                })
                : <Typography>loading...</Typography>
            }
        </Container>
    )
}

export default FooditemList