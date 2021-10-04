import express from 'express'
import restaurantModel from '../models/restaurantModel.js'


const router = express.Router()


// get all restaurants
router.get('/restaurants',
    (req, res) => {
        restaurantModel.find()
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err))
    }
)


// add a new restaurant 
router.post('/restaurants',
    (req, res) => {
        const newRestaurant = new restaurantModel({
            name: req.body.name,
            phone: req.body.phone,
            street: req.body.street,
            number: req.body.number,
            postal: req.body.postal,
            img: req.body.img,
        })
        console.log('new restaurant:', newRestaurant)
        newRestaurant
            .save()
            .then(() => {
                res.send('restaurant successfully added')
            })
            .catch(err => {
                res.status(500).send('server error')
            })
    }
)

// update restaurant information
router.put('/restaurants/:id/:name',
    (req, res) => {
        restaurantModel.findOneAndUpdate({
            _id: req.params.id,
            name: req.body.name,
            phone: req.body.phone,
            street: req.body.street,
            number: req.body.number,
            postal: req.body.postal,
            img: req.body.img,
        }, req.body)
            .then(() => {
                restaurantModel.findOne({
                    _id: req.params.id
                })
                    .then(files => {
                        res.send(files)
                    })
            })
    }
)

// get just one restaurant using the URL parameter
router.get('/restaurants/:id/:name',
    (req, res) => {
        restaurantModel
            .findById(req.params.id)
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
router.delete('/restaurants/:id/:name',
    (req, res) => {
        restaurantModel.findByIdAndRemove({ _id: req.params.id })
            .then(files => {
                res.send(files)
            })
    }
)

export default router