import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import UserSchema from '../models/userModel.js'
import userModel from '../models/restaurantModel.js'
import authenticate from '../middlewares/auth.js'
import upload from '../middlewares/imgUpload.js'


const router = express.Router()


// get all users
router.get('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        console.log('req:', req)
        userModel.find()
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err))
    }
)


// register 
router.route('/register').post(upload.single('photo'), (req, res) => {
    const reqemail = req.body.email
    const reqpassword = req.body.password
    const { name } = req.body.name
    const photo = req.file.filename
    console.log('photo:', photo)
    console.log('req.body:', req.body)

    UserSchema.findOne({ email: reqemail }, (err, user) => {
        if (err) {
            res.send(err)
        }
        if (user) {
            res.send({ msg: 'email is already used' })
        } else {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(reqpassword, salt, function (err, hash) {
                    if (err) {
                        res.send(err)
                    } else {
                        console.log('hash:', hash)
                        const newUser = new UserSchema({ photo, name, email: reqemail, password: hash })
                        newUser
                            .save()
                            .then((user) => {
                                res.send(user)
                            })
                            .catch((err) => {
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
    console.log(`req,body`, req.body)
    UserSchema.findOne({ email: reqemail }, (err, user) => {
        if (err) {
            res.send(err)
        }
        if (user) {
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
        console.log(`user`, user)
        res.send(user)
        // userModel.findById({ _id: req.params.uid }, (err, user, token) => {
        //     if (err) {
        //         res.status(404).json({ error: 'user does not exist' })
        //     } else {
        //         res.send(user)
        //         res.send(token)
        //     }
        // })
    }
)


// update user profile
router.put('/:uid',
    (req, res) => {
        userModel.findOneAndUpdate({
            _id: req.params.uid,
            name: req.body.name,
            password: bcrypt.hashSync(req.body.password, saltRounds),
            photo: req.file.filename,
            restaurant: restaurantModel.findById({ user: req.params.uid }),
            profession: req.body.profession,
        }, req.body)
            .then(() => {
                userModel.findOne({
                    _id: req.params.uid
                })
                    .then(files => {
                        res.send(files)
                    })
            })
    }
)


// delete account
router.delete('/:uid',
    (req, res) => {
        userModel.findByIdAndRemove({ _id: req.params.uid })
            .then(files => {
                res.send(files)
            })
    }
)

export default router