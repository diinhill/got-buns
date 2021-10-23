import express from 'express'
import restaurantModel from '../models/restaurantModel.js'
import RestaurantSchema from '../models/restaurantModel.js'
import upload from '../middlewares/imgUpload.js'
import passport from 'passport'


const router = express.Router()


// get all restaurants
router.get('/',
    (req, res) => {
        restaurantModel.find()
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err))
    }
)


// add a new restaurant 
router.route('/')
    .post(passport.authenticate('jwt', { session: false }), upload.single('photo'), (req, res) => {
        const user = req.user
        console.log('user:', user)
        const photo = req.file.filename
        const { name, phone, street, number, postal, town } = req.body
        console.log('photo:', photo)
        console.log('req.body:', req.body)
        const newRestaurant = new RestaurantSchema({
            name,
            phone,
            street,
            number,
            postal,
            town,
            photo,
            admin: user._id
            // users: id
        })
        console.log('new restaurant:', newRestaurant)
        newRestaurant
            .save()
            .then(restaurant => {
                res.send(restaurant)
            })
            .catch((err) => {
                res.send(err)
            })
    }
    )


// // update restaurant information
// router.put('/:id/:name',
//     (req, res) => {
//         restaurantModel.findOneAndUpdate({
//             _id: req.params.id,
//             name: req.body.name,
//             phone: req.body.phone,
//             street: req.body.street,
//             number: req.body.number,
//             postal: req.body.postal,
//             town: req.body.town,
//             photo: req.file.filename,
//         }, req.body)
//             .then(() => {
//                 restaurantModel.findOne({
//                     _id: req.params.id
//                 })
//                     .then(files => {
//                         res.send(files)
//                     })
//             })
//     }
// )

// get just one restaurant using the URL parameter
router.get('/:rid',
    (req, res) => {
        restaurantModel
            .findById(req.params.rid)
            .populate('admin')
            .populate('users')
            .populate('fooditems')
            .exec(function (err, restaurant) {
                if (err) {
                    console.log(err)
                    res.send(err)
                } else {
                    console.log(restaurant)
                    res.send(restaurant)
                }
            })
    }
)

// // delete restaurant
// router.delete('/:id/:name',
//     (req, res) => {
//         restaurantModel.findByIdAndRemove({ _id: req.params.id })
//             .then(files => {
//                 res.send(files)
//             })
//     }
// )

export default router