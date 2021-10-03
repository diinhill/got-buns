import React, { createContext } from 'react'
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




    return (
        <UploadFileContext.Provider value={{ handleFiles }}>
            {children}
        </UploadFileContext.Provider>
    )
}