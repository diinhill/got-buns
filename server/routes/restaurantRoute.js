import express from 'express'
import bcrypt from 'bcrypt'
import restaurantModel from '../models/restaurantModel.js'


const router = express.Router()
const saltRounds = 10


// get all restaurants
router.get('/restaurants/all',
    (req, res) => {
        restaurantModel.find()
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err))
    }
)


// register as new restaurant ('/' or '/register' ??)
router.post('/',
    (req, res) => {
        const newRestaurant = new restaurantModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordHash: bcrypt.hashSync(req.body.password, saltRounds),
        })
        console.log('new restaurant:', newRestaurant)
        newRestaurant
            .save()
            .then(restaurant => {
                res.send('account successfully created')
            })
            .catch(err => {
                res.status(500).send('server error')
            })
    }
)


// get user restaurant
router.get('/profile/:name',
    (req, res) => {
        restaurantModel.findOne({
            name: req.params.name
        })
            .then(details => {
                res.send(details)
            })
            .catch(err => console.log('error while trying to get the userRestaurant profile:', err))
    }
)


// add details on restaurant profile page 
router.put('/profile/:name',
    (req, res) => {
        restaurantModel.findOneAndUpdate({
            name: req.params.name,
            phone: req.body.phone,
            street: req.body.street,
            number: req.body.number,
            postal: req.body.postal,
            img: req.body.img,
        }, req.body)
            .then(() => {
                restaurantModel.findOne({
                    name: req.params.name
                })
                    .then(files => {
                        res.send(files)
                    })
            })
    }
)

// get just one restaurant using the URL parameter
router.get('/restaurants/:id',
    (req, res) => {
        let restaurantId = req.params.id
        restaurantModel
            .findById(restaurantId)
            .populate('details')
            .exec(function (err, restaurant) {
                if (err) {
                    console.log(err)
                    res.send(err)
                } else {
                    console.log(restaurant.details)
                    res.send(restaurant)
                }
            })
    }
)

// delete restaurant
router.delete('/restaurants/:id',
    (req, res) => {
        restaurantModel.findByIdAndRemove({ _id: req.params.id })
            .then(files => {
                res.send(files)
            })
    }
)

export default router