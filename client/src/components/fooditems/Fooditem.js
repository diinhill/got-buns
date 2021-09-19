import React, { useState, useContext, useEffect } from 'react'
import { FooditemContext } from '../../context/fooditemContext'
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
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
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



const Fooditem = () => {


    // am I also going to take the fooditem_id in the url to point at the right object within my collection and display it ?
    // then I would need two get functions in the fooditemContext: 1. get just one fooditem, 2. get all fooditems after update/change
    const { urlkey } = useParams()
    const [fooditem, setNewFooditem] = useState()
    const { getFooditem } = useContext(FooditemContext)
    const classes = useStyles()
    const [expanded, setExpanded] = useState(false)


    useEffect(() => {
        setNewFooditem(await getFooditem(urlkey))
    }, [urlkey])

    console.log('fooditem:', mergedAuthorInfo)


    // const handleExpandClick = () => {
    //     setExpanded(!expanded)
    // }


    return (

        <Card>
            <CardHeader
                title={fooditem?.name}
            // subheader={(`${mergedAuthorInfo?.birth_date} - ${mergedAuthorInfo?.death_date}`) || "We didn't bother looking up the author's birth date."}
            />
            {/* <CardMedia className={classes.media} title='portrait author' align='center'>
                {mergedAuthorInfo?.photos ?
                    <img src={`https://covers.openlibrary.org/a/id/${mergedAuthorInfo?.photos[0]}-M.jpg`} />
                    :
                    mergedAuthorInfo?.name && <Avatar variant='square' aria-label='author' className={classes.avatar}>{mergedAuthorInfo?.name[0]}</Avatar>
                }
            </CardMedia>

            <CardContent>
                <Paper>
                    <Typography>{`This author has written ${mergedAuthorInfo?.work_count || "an unknown number of"} book(s) so far.`}</Typography>
                    <Typography><i>{mergedAuthorInfo?.top_work}</i>{" is considered to be the author's finest work." || "We have no clue what the author's finest work might be."}</Typography>
                    <IconButton aria-label='show all books' endIcon={<KeyboardArrowRight />}>
                        <Link to={`/authors/${authorKey}/books/all`}>
                            see all books
                        </Link>
                    </IconButton>
                </Paper>
            </CardContent>

            <CardActions disableSpacing>
                <div>
                    {mergedAuthorInfo?.bio &&
                        <IconButton
                            className={clsx(classes.expand, { [classes.expandOpen]: expanded, })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    }
                </div>
            </CardActions>

            <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent>
                    {/* <Typography paragraph>Method:</Typography> */}
            {/* <Typography paragraph>
                {mergedAuthorInfo?.bio?.value || mergedAuthorInfo?.bio}
            </Typography>
        </CardContent>
            </Collapse > * /} */}
        </Card >
    )
}

export default Fooditem