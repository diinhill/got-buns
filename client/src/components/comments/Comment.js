import React from 'react'
import { Container, Typography, Paper } from '@material-ui/core'
import axios from 'axios'



const Comment = ({ comment }) => {


    const userId = comment.user._id
    const restaurantId = ''
    const authorName = getCommentAuthor(userId)
    const restaurantName = getCommentRestaurant(userId, restaurantId)

    const getCommentAuthor = async (uid) => {
        const res = await axios(`http://localhost:5000/api/users/${uid}`)
        const data = res.data
        console.log('data:', data)
        const authorName = data.name
        restaurantId = data.restaurant._id
        return authorName
    }

    const getCommentRestaurant = async (uid, id) => {
        const res = await axios(`http://localhost:5000/api/restaurants/${uid}:${id}`)
        const data = res.data
        console.log('data:', data)
        return data.name
    }




    return (

        <Container>
            <Paper>
                <Typography>created on: {comment.createdOn}</Typography>
                <Typography paragraph>{comment.message}</Typography>
                <Typography>likes: {comment.likes}</Typography>
                <Typography>by: {authorName}</Typography>
                <Typography>from: {restaurantName}</Typography>
            </Paper>
        </Container>
    )
}

export default Comment
