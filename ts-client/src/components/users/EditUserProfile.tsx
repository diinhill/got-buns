import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router'
import { UserContext } from '../../context/UserContext'


const EditUserProfile = () => {

    const history = useHistory()
    const { editUserProfile } = useContext(UserContext)
    const [updatedUser, setUpdatedUser] = useState({ name: '', photo: '', profession: '' })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value })
    }
    const handlePhoto = (e: React.ChangeEvent<any>) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.files[0] })
        console.log('files:', e.target.files)
        console.log('filename:', e.target.files[0].name)
        const imgfile = document.getElementById('imgfile')
        imgfile?.append(' >> ' + e.target.files[0].name)
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('photo', updatedUser.photo)
        formData.append('name', updatedUser.name)
        formData.append('profession', updatedUser.profession)
        try {
            await editUserProfile(formData)
            history.push('/users/profile')
        } catch (error) {
            console.log('error while updating user:', error)
            history.push('/users/profile')
        }
    }

    console.log('updated user:', updatedUser)


    return (

        <div>
            <form encType='multipart/form-data'>
                <div className='field'>
                    <label className='label'>name</label>
                    <div className='control'>
                        <input className='input' type='text' name='name' onChange={handleChange} value={updatedUser.name} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>choose profile picture</label>
                    <div className='control' id='imgfile'>
                        <input className='input' type='file' name='photo' onChange={handlePhoto} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>profession</label>
                    <div className='control'>
                        <input className='input' type='text' name='profession' onChange={handleChange} value={updatedUser.profession} />
                    </div>
                </div>
                <button className='button' type='submit' onClick={handleSubmit}>submit</button>
            </form>
        </div>
    )
}

export default EditUserProfile