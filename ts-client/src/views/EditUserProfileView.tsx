import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import { UserContext } from '../context/UserContext'
import defaultBgImage from '../assets/img/chumbucket.png'
import defaultProfileImage from '../assets/img/plankton.png'
import HumongousHeader from '../components/core/HumongousHeader'
import { Button } from 'reactstrap'
import UserProfileForm from '../components/users/UserProfileForm'
import { AuthContext } from '../context/AuthContext'


const EditUserProfileView = () => {

    const history = useHistory()
    const { user } = useContext(AuthContext)
    const { editUserProfile, deleteUserProfile } = useContext(UserContext)
    const [newUser, setNewUser] = useState({ name: '', photo: '', profession: '' })
    const [imgfile, setImgfile] = useState<File | string>('')

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const formData = new FormData()
        imgfile && formData.append('photo', imgfile)
        newUser.name && formData.append('name', newUser.name)
        newUser.profession && formData.append('profession', newUser.profession)
        try {
            await editUserProfile(formData)
            history.push('/users/profile')
        } catch (error) {
            console.log('error while updating user:', error)
            history.push('/users/profile')
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

    const handleDeleteUserProfile = () => {
        deleteUserProfile()
        history.push('/login')
    }

    useEffect(() => {
        document.body.classList.add('profile-page')
        window.scrollTo(0, 0)
        document.body.scrollTop = 0
        return function cleanup() {
            document.body.classList.remove('profile-page')
        }
    }, [])

    console.log('new user:', newUser)


    return (

        user ?
            <><div className='wrapper'>
                <HumongousHeader
                    backgroundImage={user.restaurants[0]?.photo ? `http://localhost:5000/images/${user.restaurants[0].photo}` : defaultBgImage}
                    avatar={user.photo ? `http://localhost:5000/images/${user.photo}` : defaultProfileImage}
                    title={user.name}
                    category={user.profession ? user.profession : ''}
                    qty={user.restaurants.length}
                    qtyName={user.restaurants.length <= 1 ? 'Restaurant' : 'Restaurants'}
                />
                <div className='section'>
                    <h3 className='title'>Update Your User Profile</h3>
                    <UserProfileForm newUser={newUser}
                        handleChange={handleChange} handlePhoto={handlePhoto} handleSubmit={handleSubmit} />
                    <div className="button-container">
                        <Button
                            className="btn-round mr-1"
                            color="info"
                            onClick={handleDeleteUserProfile}
                            size="lg"
                        >
                            Delete User Profile
                        </Button>
                    </div>
                </div>
            </div></>
            : null

    )
}
export default EditUserProfileView

        // < div >
        //     <form encType='multipart/form-data'>
        //         <div className='field'>
        //             <label className='label'>name</label>
        //             <div className='control'>
        //                 <input className='input' type='text' name='name' onChange={handleChange} value={newUser.name} />
        //             </div>
        //         </div>
        //         <div className='field'>
        //             <label className='label'>choose profile picture</label>
        //             <div className='control' id='imgfile'>
        //                 <input className='input' type='file' name='photo' onChange={handlePhoto} />
        //             </div>
        //         </div>
        //         <div className='field'>
        //             <label className='label'>profession</label>
        //             <div className='control'>
        //                 <input className='input' type='text' name='profession' onChange={handleChange} value={newUser.profession} />
        //             </div>
        //         </div>
        //         <button className='button' type='submit' onClick={handleSubmit}>submit</button>
        //     </form>
        // </div>