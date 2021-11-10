import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import userModel from '../models/userModel.js'
import upload from '../middlewares/imgUpload.js'


const router = express.Router()


// get all users
router.get('/',
    // passport.authenticate('jwt', { session: false }),
    (req, res) => {
        console.log('req:', req)
        userModel.find()
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err))
    }
)
// search in all users
router.get('/search/:query',
    // passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            console.log(`req.params.query`, req.params.query)
            const users = await userModel.find({ $text: { $search: req.params.query } })
                .limit(10).select("name email")
            console.log(`users`, users)
            res.send(users)
        } catch (error) {
            console.log(`error`, error)
            res.send(error)
        }
    }
)
// // search in all users
// router.get('/search/:query',
//     // passport.authenticate('jwt', { session: false }),
//     async (req, res) => {

//         try {
//             console.log(`req.params.query`, req.params.query)
//             const user = await userModel.find({ $or: [{ email: req.params.query }, { name: req.params.query }] })
//             console.log(`user`, user)
//             res.send(user)
//         } catch (error) {
//             console.log(`error`, error)
//             res.send(error)
//         }

//     }
// )


// register 
router.route('/register')
    .post(upload.single('photo'), (req, res) => {
        const reqemail = req.body.email
        const reqpassword = req.body.password
        const reqname = req.body.name
        const reqprofession = req.body.profession
        const photo = req.file.filename
        console.log('photo:', photo)
        console.log('req.body:', req.body)

        userModel.findOne({ email: reqemail }, (err, user) => {
            if (err) {
                res.send(err)
            } else if (user) {
                res.send({ msg: 'email is already used' })
            } else {
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(reqpassword, salt, function (err, hash) {
                        if (err) {
                            res.send(err)
                        } else {
                            console.log('hash:', hash)
                            let newUser = new userModel({ photo: photo, name: reqname, email: reqemail, password: hash, profession: reqprofession })
                            console.log('newUser:', newUser)
                            newUser
                                .save()
                                .then(files => {
                                    res.send(files)
                                })
                                .catch(err => {
                                    res.send(err)
                                })
                        }
                    })
                })
            }
        })
    })



// login
router.post('/login', (req, res) => {
    const reqemail = req.body.email
    const reqpassword = req.body.password
    console.log(`req.body:`, req.body)
    userModel.findOne({ email: reqemail }, (err, user) => {
        if (err) {
            res.send(err)
        }
        if (user) {
            // if (user.loggedIn === false) {
            // Load hash from your password DB.
            bcrypt.compare(reqpassword, user.password, function (err, result) {
                if (result) {
                    //  create JWT payload
                    const payload = {
                        id: user._id,
                        email: user.email
                    }
                    //sign token
                    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN }, function (err, token) {
                        if (err) {
                            res.send(err)
                        } else {
                            // user.update({ loggedIn: true })
                            // user.loggedIn is still false in response
                            res.status(200).json({ success: true, token, user })
                        }
                    }
                    )
                } else {
                    res.status(403).send({ message: 'wrong password', success: false })
                }
            })
        } else {
            res.status(403).send({ message: 'user does not exist', success: false })
        }
    })
})


// get one user profile, but only after authorisation (making sure user is logged in)
router.get('/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const user = req.user
        console.log('user:', user)
        res.send(user)
    }
)


// update user profile
router.put('/profile/edit',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const user = req.user
        console.log('user:', user)
        userModel.findOneAndUpdate({
            _id: user._id,
            name: req.body.name,
            password: bcrypt.hashSync(req.body.password, saltRounds),
            photo: req.file.filename,
            profession: req.body.profession,
        }, req.body)
            .then(() => {
                userModel.findOne({
                    _id: user._id
                })
                    .then(files => {
                        res.send(files)
                    })
            })
    }
)


// delete account
router.delete('/profile/delete',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const user = req.user
        console.log('user:', user)
        userModel.findByIdAndRemove(user._id)
            .then(files => {
                res.send(files)
            })
    }
)

export default router