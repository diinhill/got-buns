import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import HumongousHeader from '../components/core/HumongousHeader'
import { AuthContext } from '../context/AuthContext'
import LoginForm from '../components/users/LoginForm'
import { Button } from 'reactstrap'
import defaulProfileImage from '../assets/img/plankton.png'
import defaultBgImage from '../assets/img/chumbucket.png'



const LoginView = () => {

    const history = useHistory()
    const { login, user } = useContext(AuthContext)
    const [newUser, setNewUser] = useState({ email: '', password: '' })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            login(newUser)
            history.push('/users/profile')
        } catch (error) {
            console.log('error login:', error)
            alert('wrong login details')
            history.push('/login')
        }
    }

    useEffect(() => {
        document.body.classList.add('profile-page')
        window.scrollTo(0, 0)
        document.body.scrollTop = 0
        return function cleanup() {
            document.body.classList.remove('profile-page')
        }
    }, [])

    return (

        <div className='wrapper'>
            <HumongousHeader
                backgroundImage={defaultBgImage}
                avatar={''}
                title={''}
                category={''}
                qty={''}
                qtyName={''}
            />
            <div className='section'>
                <h3 className='title'>Sign In</h3>
                <LoginForm newUser={newUser}
                    handleChange={handleChange} handleSubmit={handleSubmit} />
                <div className='section'>
                    <div className="button-container">
                        <Button
                            className="btn-round mr-1"
                            color="info"
                            onClick={(() => history.push('/register'))}
                            size="lg"
                        >
                            Register
                        </Button>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default LoginView

        // <div>
        //     <div className='field'>
        //         <label className='label'>email</label>
        //         <div className='control'>
        //             <input className='input' is-outlined required type='email' name='email' onChange={handleChange} value={state.email} />
        //         </div>
        //     </div>
        //     <div className='field'>
        //         <label className='label'>password</label>
        //         <div className='control'>
        //             <input className='input' is-outlined required type='password' name='password' onChange={handleChange} value={state.password} />
        //         </div>
        //     </div>
        //     <button className='button' is-contained type='submit' onClick={handleSubmit}>submit</button>
        //     <button className='button' is-contained type='submit' onClick={(() => history.push('/register'))}>create new account</button>
        // </div>

