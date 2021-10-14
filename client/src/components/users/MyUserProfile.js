import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import { Paper, Button, Typography } from '@material-ui/core'
import { useHistory } from 'react-router'



const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
}))



const MyUserProfile = ({ userData }) => {


    const history = useHistory()
    const classes = useStyles()

    console.log('userData:', userData)



    return (

        <Card>
            <CardHeader
                title={userData.name}
                subheader={<i>{userData.profession}</i>}
            />
            <CardMedia className={classes.media} title='profile pic' align='center'>
                <img src={userData.photo} alt='' />
            </CardMedia>

            <CardContent>
                <Paper>
                    <Button onClick={(() => history.push(`/users/${userData._id}/edit`))}><Typography>edit profile</Typography></Button>
                    <Button onClick={(() => history.push(`/restaurants/${userData._id}-${userData.restaurant}`))}><Typography>my restaurant</Typography></Button>
                    <Button onClick={(() => history.push(`/fooditems/${userData._id}`))}><Typography>my fooditems</Typography></Button>
                    <Button onClick={(() => history.push(`/foodalerts/${userData._id}`))}><Typography>my foodalerts</Typography></Button>
                    <Button onClick={(() => history.push(`/users/${userData._id}/messages`))}><Typography>my messages</Typography></Button>
                </Paper>
            </CardContent>
        </Card >
    )
}

export default MyUserProfile