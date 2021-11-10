import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import orangeSpiral from '../layout/img_files/spiralOrange.png'
import bunPlanet from '../layout/img_files/bun-planet.png'
import { AuthContext } from '../context/AuthContext'



const LandingPageView = () => {

    const history = useHistory()
    const { user } = useContext(AuthContext)

    const handleClick = () => {
        user ? history.push('/users/profile/restaurants') : history.push('/login')
    }

    return (

        <div className='App'>
            <header>
                {/* <figure>
                    <img src={orangeSpiral} onClick={handleClick} className='is-rounded' alt='' />
                </figure> */}
                <div className="bulma-overlay-mixin-parent">
                    <p className="bulma-overlay-mixin" onClick={handleClick}>got buns</p>
                </div>
                <figure>
                    <img src={bunPlanet} className='image' alt='' />
                </figure>



                {/* <Button className='styled.button' onClick={handleClick}>
                    <Typography>enter</Typography>
                </Button> */}
            </header>
        </div>
    )
}

export default LandingPageView
