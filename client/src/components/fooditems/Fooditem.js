import React, { useState, useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Paper } from '@material-ui/core'
import Comment from '../comments/Comment.js'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'




const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        background: 'linear-gradient(90deg, transparent 24%, #ff0000 25%, #ff0000 30%, transparent 31%, transparent 39%, #ff0000 40%, #ff0000 45%, transparent 45%), linear-gradient(180deg, transparent 24%, #ff0000 25%, #ff0000 30%, transparent 31%, transparent 39%, #ff0000 40%, #ff0000 45%, transparent 45%)',
        backgroundSize: '2em 2em',
        backgroundColor: '#f9f9ff',
        opacity: '0.55',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    header: {
        backgroundColor: '#f9f9ff',
    }
}))



const Fooditem = ({ fooditem }) => {


    const classes = useStyles()
    const [expanded, setExpanded] = useState(false)


    console.log('fooditem:', fooditem)


    const handleExpandClick = () => {
        setExpanded(!expanded)
    }


    return (

        <Card className={classes.root}>
            <CardHeader className={classes.header}
                title={fooditem.name}
                subheader={<i>{fooditem.type}</i>}
            />
            <CardMedia className={classes.media} title='foodpic' align='center'>
                <img src={fooditem.photo} alt='' />
            </CardMedia>

            <CardContent>
                <Paper>
                    <Typography>purchased on: {fooditem.purchaseDate.day}th {fooditem.purchaseDate.month} {fooditem.purchaseDate.year}</Typography>
                    <Typography>due on: {fooditem.dueDate.day}th {fooditem.dueDate.month} {fooditem.dueDate.year}</Typography>
                    <Typography>amount: {fooditem.amount}</Typography>
                    <Typography>price: {fooditem.price} €</Typography>
                    <Typography>optional swap: {fooditem.swapPossible}</Typography>
                    <Typography>reserved: {fooditem.reserved}</Typography>

                    <Typography><i>last updated on: {fooditem.updated}</i></Typography>
                    <Typography>likes: {fooditem.likes}</Typography>
                </Paper>
            </CardContent>

            {fooditem?.comments &&
                <CardActions disableSpacing>
                    <IconButton
                        className={clsx(classes.expand, { [classes.expandOpen]: expanded, })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label='see comments'
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
            }
            {fooditem?.comments &&
                <Collapse in={expanded} timeout='auto' unmountOnExit>
                    <CardContent>
                        {fooditem.comments.map((comment, i) => {
                            return (
                                <Comment key={i} comment={comment} />
                            )
                        })}
                    </CardContent>
                </Collapse >
            }
        </Card >
    )
}

export default Fooditem