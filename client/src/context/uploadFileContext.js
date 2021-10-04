import React, { createContext, createThrobber } from 'react'
import RegisterView from '../views/RegisterView'


export const UploadFileContext = createContext()


export const UploadFileContextProvider = ({ children }) => {

    const handleFiles = (files) => {
        const fileList = document.getElementById('fileList')
        const file = document.getElementsById('fileElem')
        if (!files.length) {
            fileList.innerHTML = '<Typography>No files selected!</Typography>'
        } else {
            fileList.innerHTML = ''
            const list = document.createElement('ul')
            fileList.appendChild(list)
            for (let i = 0; i < files.length; i++) {
                const li = document.createElement('li')
                list.appendChild(li)
                if (!file.type.startsWith('image/')) { continue }
                const img = document.createElement('img')
                img.classList.add('obj')
                img.file = file
                img.src = URL.createObjectURL(files[i])
                img.height = 60
                img.onload = function () {
                    URL.revokeObjectURL(img.src)
                }
                li.appendChild(img)
                const info = document.createElement('span')
                info.innerHTML = files[i].name + ': ' + files[i].size + ' bytes'
                li.appendChild(info)
                files[i].addEventListener('change', sendFiles, false)
            }
        }
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
            // reader.readAsBinaryString(files[i])
        }
    }




    return (
        <UploadFileContext.Provider value={{ handleFiles }}>
            {children}
        </UploadFileContext.Provider>
    )
}