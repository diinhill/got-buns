import React from 'react'
import { useHistory } from 'react-router-dom'
import orangeSpiral from './img_files/spiralOrange.png'
import bunPlanet from './img_files/bun-planet.png'



const LandingPage = () => {

    const history = useHistory()

    const handleClick = () => {
        history.push('/users/profile/restaurants')
        console.log('click')
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

export default LandingPage
