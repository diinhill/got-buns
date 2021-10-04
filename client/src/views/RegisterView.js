import React, { useState, useContext } from 'react'
import Register from '../components/auth/Register'
import { UploadFileContext } from '../context/uploadFileContext'


const RegisterView = () => {

    const { handleFiles } = useContext(UploadFileContext)
    const [imgs, setImgs] = useState([])
    const [files, setFiles] = useState([])

    const dropbox = document.getElementById('dropbox')
    dropbox.addEventListener('dragenter', dragenter, false)
    dropbox.addEventListener('dragover', dragover, false)
    dropbox.addEventListener('drop', drop, false)

    function dragenter(e) {
        e.stopPropagation()
        e.preventDefault()
    }
    function dragover(e) {
        e.stopPropagation()
        e.preventDefault()
    }
    function drop(e) {
        e.stopPropagation()
        e.preventDefault()
        const dt = e.dataTransfer
        const files = dt.files

        handleFiles(files)
    }



    return (

        <div>
            <Register dropbox={dropbox} />
        </div>


    )
}
export default RegisterView