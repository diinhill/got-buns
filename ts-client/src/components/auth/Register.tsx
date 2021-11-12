import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router'
import { AuthContext } from '../../context/AuthContext'


const Register = () => {

    const history = useHistory()
    const { register } = useContext(AuthContext)
    const [newUser, setNewUser] = useState({ email: '', password: '', name: '', photo: '', profession: '' })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value })
    }
    const handlePhoto = (e: React.ChangeEvent<any>) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.files[0] })
        console.log('files:', e.target.files)
        console.log('filename:', e.target.files[0].name)
        const imgfile = document.getElementById('imgfile')
        imgfile?.append(' >> ' + e.target.files[0].name)
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('photo', newUser.photo)
        formData.append('email', newUser.email)
        formData.append('name', newUser.name)
        formData.append('password', newUser.password)
        formData.append('profession', newUser.profession)
        try {
            await register(formData)
            history.push('/login')
        } catch (error) {
            console.log('error register:', error)
            alert('registration failed')
            history.push('/register')
        }
    }

    console.log('newUser:', newUser)


    return (
        <div>
            <form encType='multipart/form-data'>
                <div className='field'>
                    <label className='label'>name</label>
                    <div className='control'>
                        <input className='input' is-outlined is-required type='text' name='name' onChange={handleChange} value={newUser.name} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>choose profile picture</label>
                    <div className='control' id='imgfile'>
                        <input className='input' is-outlined type='file' name='photo' onChange={handlePhoto} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>email</label>
                    <div className='control'>
                        <input className='input' is-outlined is-required type='email' name='email' onChange={handleChange} value={newUser.email} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>password</label>
                    <div className='control'>
                        <input className='input' is-outlined is-required type='password' name='password' onChange={handleChange} value={newUser.password} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>profession</label>
                    <div className='control'>
                        <input className='input' is-outlined type='text' name='profession' onChange={handleChange} value={newUser.profession} />
                    </div>
                </div>
                <button className='button' is-contained type='submit' onClick={handleSubmit}>submit</button>
            </form>
        </div>
    )
}

export default Register