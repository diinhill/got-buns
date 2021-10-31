import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'



const Login = () => {

    const history = useHistory()
    const { login } = useContext(AuthContext)
    const [state, setState] = useState({ email: '', password: '' })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            await login(state)
            history.push('/users/profile/restaurants')
        } catch (error) {
            console.log('error login:', error)
            history.push('/login')
        }
    }

    return (
        <div>
            <div className='field' onSubmit={handleSubmit}>
                <label className='label'>email</label>
                <div className='control'>
                    <input className='input' is-outlined required type='email' name='email' onChange={handleChange} value={state.email} />
                </div>
            </div>
            <div className='field'>
                <label className='label'>password</label>
                <div className='control'>
                    <input className='input' is-outlined required type='password' name='password' onChange={handleChange} value={state.password} />
                </div>
            </div>
            <button className='button' is-contained type='submit' onClick={handleSubmit}>submit</button>
            <button className='button' is-contained type='submit' onClick={(() => history.push('/register'))}>create new account</button>
        </div>
    )
}

export default Login
