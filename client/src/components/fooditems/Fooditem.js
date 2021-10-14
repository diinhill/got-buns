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
}))



const Fooditem = ({ fooditem }) => {


    const classes = useStyles()
    const [expanded, setExpanded] = useState(false)


    console.log('fooditem:', fooditem)


    const handleExpandClick = () => {
        setExpanded(!expanded)
    }


    return (

        <Card>
            <CardHeader
                title={fooditem.name}
                subheader={<i>{fooditem.type}</i>}
            />
            <CardMedia className={classes.media} title='foodpic' align='center'>
                <img src={fooditem.photo} alt='' />
            </CardMedia>

            <CardContent>
                <Paper>
                    {/* <Typography>purchased on: {fooditem.purchaseDate}</Typography>
                    <Typography>due on: {fooditem.dueDate}</Typography> */}
                    <Typography>amount: {fooditem.amount}</Typography>
                    <Typography>price: {fooditem.price}</Typography>
                    <Typography>optional swap: {fooditem.swapPossible}</Typography>
                    <Typography>reserved: {fooditem.reserved}</Typography>

                    <Typography><i>last updated on: {fooditem.updated}</i></Typography>
                    <Typography>likes: {fooditem.likes}</Typography>
                    <IconButton aria-label='show list of comments' endIcon={<KeyboardArrowRight />}>
                        <Typography>comments: {fooditem?.comments}</Typography>
                    </IconButton>
                </Paper>
            </CardContent>

            {fooditem?.comments &&
                <CardActions disableSpacing>
                    <IconButton
                        className={clsx(classes.expand, { [classes.expandOpen]: expanded, })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label='read comments'
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