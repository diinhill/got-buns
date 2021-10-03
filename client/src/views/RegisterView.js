import React, { useState, useContext, createThrobber } from 'react'
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
    const sendFiles = () => {
        const imgs = document.querySelectorAll('.obj')
        for (let i = 0; i < imgs.length; i++) {
            const reader = new FileReader()
            this.ctrl = createThrobber(imgs[i])
            const xhr = new XMLHttpRequest()
            this.xhr = xhr

            const self = this
            this.xhr.upload.addEventListener('progress', function (e) {
                if (e.lengthComputable) {
                    const percentage = Math.round((e.loaded * 100) / e.total)
                    self.ctrl.update(percentage)
                }
            }, false)

            xhr.upload.addEventListener('load', function (e) {
                self.ctrl.update(100)
                const canvas = self.ctrl.ctx.canvas
                canvas.parentNode.removeChild(canvas)
            }, false)
            xhr.open('POST', 'https://localhost:5000/api/')
            xhr.overrideMimeType('text/plain; charset=x-user-defined-binary')
            reader.onload = function (evt) {
                xhr.send(evt.target.result)
            }
            reader.readAsBinaryString(files[i])
        }
    }


    return (

        <div>
            <Register dropbox={dropbox} img={img} file={file} />
        </div>


    )
}
export default RegisterView