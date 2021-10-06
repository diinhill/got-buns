import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import UserSchema from '../models/userModel.js'
import userModel from '../models/restaurantModel.js'
import authenticate from '../middlewares/auth.js'


const router = express.Router()


// get all users
router.get('/users',
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
router.post('/register', (req, res) => {
    const reqemail = req.body.email
    const reqpassword = req.body.password
    const { name } = req.body
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
                        const newUser = new UserSchema({ name, email: reqemail, password: hash })
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
                        id: user.id,
                        email: user.email
                    }
                    //sign token
                    jwt.sign(
                        payload,
                        process.env.JWT_SECRET,
                        {
                            expiresIn: process.env.JWT_EXPIRES_IN,
                        },
                        (err, token) => {
                            if (err) { res.send(err) }

                            res.status(200).json({
                                success: true,
                                token,
                                user
                            })
                        }
                    )
                } else {
                    res.status(403).send({ message: 'wrong password', success: false })
                }
            })
        } else {
            res.status(403).send({ messege: 'user does not exist', success: false })
        }
    })
})


// update user profile
router.put('/users/:id',
    (req, res) => {
        userModel.findOneAndUpdate({
            _id: req.params.id,
            name: req.body.name,
            passwordHash: bcrypt.hashSync(req.body.password, saltRounds),
            img: req.body.img,
            restaurant: restaurantModel.findById({ owner: req.params.id }),
            profession: req.body.profession,
        }, req.body)
            .then(() => {
                userModel.findOne({
                    _id: req.params.id
                })
                    .then(files => {
                        res.send(files)
                    })
            })
    }
)


// delete account
router.delete('/users/:id',
    (req, res) => {
        userModel.findByIdAndRemove({ _id: req.params.id })
            .then(files => {
                res.send(files)
            })
    }
)

export default router