import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import userModel from '../models/userModel.js'
import upload from '../middlewares/imgUpload.js'
import restaurantModel from '../models/restaurantModel.js'


const router = express.Router()


// get all users
router.get('/',
    // passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        console.log('req:', req)
        try {
            const users = await userModel.find().select('name photo profession')
            console.log('users:', users)
            res.send(users)
        } catch (error) {
            console.log(`error`, error)
            res.send(error)
        }
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
    .post(upload.single('photo'),
        async (req, res) => {
            console.log('req.body:', req.body)
            await userModel.findOne({ email: req.body.email },
                async (err, user) => {
                    if (err) {
                        res.send(err, { success: false })
                    } else if (user) {
                        res.send(err, { msg: 'email is already used' })
                    } else {
                        bcrypt.genSalt(10, function (err, salt) {
                            bcrypt.hash(req.body.password, salt, function (err, hash) {
                                if (err) {
                                    res.send(err, { success: false })
                                } else {
                                    console.log('hash:', hash)
                                    let newUser = new userModel({
                                        photo: req.file?.filename,
                                        name: req.body.name,
                                        email: req.body.email,
                                        password: hash,
                                        profession: req.body?.profession
                                    })
                                    console.log('newUser:', newUser)
                                    newUser
                                        .save()
                                        .then(newUser => {
                                            res.send(newUser)
                                        })
                                        .catch(err => {
                                            res.send(err, { success: false })
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

// get current user profile
router.get('/profile', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const user = req.user
        console.log('user:', user)
        res.send(user)
    }
)

// // get all restaurants by user._id
// router.get('/profile/restaurants', passport.authenticate('jwt', { session: false }),
//     async (req, res) => {
//         const user = req.user
//         try {
//             const userPop = await userModel.findById(user._id).populate('restaurants')
//             res.send(userPop)
//         } catch (error) {
//             console.log(`error`, error)
//             res.send(error)
//         }
//     }
// )

// get one user profile by uid
router.get('/:uid', passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        console.log('req:', req)
        try {
            const user = await userModel.findById(req.params.uid).select('name profession photo')
            console.log('user:', user)
            res.send(user)
        } catch (error) {
            console.log(`error`, error)
            res.send(error)
        }
    }
)


// update user profile
router.patch('/profile/edit', passport.authenticate('jwt', { session: false }), upload.single('photo'),
    async (req, res) => {
        const user = req.user
        const photo = req.file?.filename
        console.log(`photo`, photo)
        const updateBody = {
            ...req.body,
            photo
        }
        try {
            const updatedUser = await userModel.findOneAndUpdate({
                _id: user._id           // filter
            },
                updateBody              // update 
                , {
                    new: true               // returns object AFTER update
                })
            console.log('updated user:', updatedUser)
            res.send(updatedUser)
        } catch (error) {
            console.log(`error`, error)
            res.send(error)
        }
    }
)


// delete current user account
router.delete('/profile/delete', passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const user = req.user
        console.log(`user`, user)
        try {
            await restaurantModel.remove({ admin: user._id })
            res.send(await userModel.findByIdAndDelete(user._id))
        } catch (error) {
            console.log('error:', error)
            res.send(error)
        }
    }
)

// delete user account by id (as admin)
router.delete('/:uid/delete', passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const user = req.user
        console.log(`user`, user)
        if (user.restaurants.includes({ admin: user._id, users: req.params.uid }))
            try {
                const user = await userModel.findById(req.params.uid)
                console.log('user:', user)
                user.delete()
                res.send(user)
            } catch (error) {
                console.log('error:', error)
                res.send(error)
            }
    }
)

export default router