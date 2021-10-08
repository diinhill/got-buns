import { Typography, Button } from '@material-ui/core'
import { useState } from 'react'
import { useHistory } from 'react-router'
import '../components/style/App.css'
import bun from '../components/style/img/bun.jpg'


const HomeView = () => {

    const history = useHistory()
    const [user, setUser] = useState(null)


    const handleClick = () => {
        user ?
            (user.restaurant_id ?
                // it might be better to have the user._id as url parameter, especially while adding a restaurant
                history.push(`/restaurants/${user._id}:${user.restaurant._id}`)
                :
                history.push(`/restaurants/${user._id}/register`)
            )
            :
            history.push('/login')
    }

    return (
        <div className='HomeView'>
            <header className='HomeView-header'>
                <img src={bun} className='App-logo' alt='logo' />

                <Button className='styled.button' onClick={handleClick}>
                    <Typography>go to my restaurant profile</Typography>
                </Button>
                {/* <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a> */}
            </header>
        </div>
    )
}
export default HomeView