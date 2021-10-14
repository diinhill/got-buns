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



const MyUserProfile = ({ user }) => {


    const history = useHistory()
    const classes = useStyles()

    console.log('user:', user)



    return (

        <Card>
            <CardHeader
                title={user.name}
                subheader={<i>{user.profession}</i>}
            />
            <CardMedia className={classes.media} title='profile pic' align='center'>
                <img src={user.photo} alt='' />
            </CardMedia>

            <CardContent>
                <Paper>
                    <Button onClick={(() => history.push('/users/profile/edit'))}><Typography>edit profile</Typography></Button>
                    <Button onClick={(() => history.push('/users/profile/delete'))}><Typography>delete account</Typography></Button>
                    <Button onClick={(() => history.push('/users/profile/restaurants'))}><Typography>my restaurants</Typography></Button>
                </Paper>
            </CardContent>
        </Card >
    )
}

export default MyUserProfile