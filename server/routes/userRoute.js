import express from 'express'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import restaurantModel from '../models/restaurantModel.js'


const router = express.Router()
const saltRounds = 10


// get all users
router.get('/users',
    (req, res) => {
        restaurantModel.find()
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err))
    }
)


// register 
router.post('/register',
    (req, res) => {
        const newUser = new userModel({
            email: req.body.email,
            // password: req.body.password,
            passwordHash: bcrypt.hashSync(req.body.password, saltRounds),
            img: req.body.img,
        })
        console.log('new user:', newUser)
        newUser
            .save()
            .then(() => {
                res.send('account successfully created')
            })
            .catch(err => {
                res.status(500).send('server error')
            })
    }
)


// login
router.post('/login',
    (req, res) => {
        userModel.findOne({
            email: req.query.email,
        })
            .then((user, err) => {
                if (bcrypt.compareSync(req.query.password, user.hashPassword)) {
                    res.send(user)
                } else {
                    console.log('error:', err)
                    res.send(err)
                }
            })
    }
)


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