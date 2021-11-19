import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import HumongousHeader from '../components/core/HumongousHeader'
import { AuthContext } from '../context/AuthContext'
import defaultBgImage from '../assets/img/chumbucket.png'
import UserProfileForm from '../components/users/UserProfileForm'


const RegisterView = () => {

    const history = useHistory()
    const { register } = useContext(AuthContext)
    const [newUser, setNewUser] = useState({ email: '', password: '', name: '', photo: '', profession: '' })
    const [imgfile, setImgfile] = useState<File | string>('')


    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const formData = new FormData()
        // formData.append('photo', newUser.photo)
        formData.append('photo', imgfile)
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value })
    }

    const handlePhoto = (photo: File) => {
        const fileName = photo.name
        setNewUser({ ...newUser, photo: fileName })
        setImgfile(photo)
    }

    useEffect(() => {
        document.body.classList.add('profile-page')
        window.scrollTo(0, 0)
        document.body.scrollTop = 0
        return function cleanup() {
            document.body.classList.remove('profile-page')
        }
    }, [])

    console.log('newUser:', newUser)


    return (

        <><div className='wrapper'>
            <HumongousHeader
                backgroundImage={defaultBgImage}
                avatar=''
                title={''}
                qty={''}
                qtyName={''}
                category={''}
            />
            <div className='section'>
                <h3 className='title'>Create A User Profile</h3>
                <UserProfileForm newUser={newUser}
                    handleChange={handleChange} handlePhoto={handlePhoto} handleSubmit={handleSubmit} />
            </div>
        </div></>

    )
}
export default RegisterView


            // <div>
            //     <form encType='multipart/form-data'>
            //         <div className='field'>
            //             <label className='label'>name</label>
            //             <div className='control'>
            //                 <input className='input' is-outlined is-required type='text' name='name' onChange={handleChange} value={newUser.name} />
            //             </div>
            //         </div>
            //         <div className='field'>
            //             <label className='label'>choose profile picture</label>
            //             <div className='control' id='imgfile'>
            //                 <input className='input' is-outlined type='file' name='photo' onChange={handlePhoto} />
            //             </div>
            //         </div>
            //         <div className='field'>
            //             <label className='label'>email</label>
            //             <div className='control'>
            //                 <input className='input' is-outlined is-required type='email' name='email' onChange={handleChange} value={newUser.email} />
            //             </div>
            //         </div>
            //         <div className='field'>
            //             <label className='label'>password</label>
            //             <div className='control'>
            //                 <input className='input' is-outlined is-required type='password' name='password' onChange={handleChange} value={newUser.password} />
            //             </div>
            //         </div>
            //         <div className='field'>
            //             <label className='label'>profession</label>
            //             <div className='control'>
            //                 <input className='input' is-outlined type='text' name='profession' onChange={handleChange} value={newUser.profession} />
            //             </div>
            //         </div>
            //         <button className='button' is-contained type='submit' onClick={handleSubmit}>submit</button>
            //     </form>
            // </div>