import express from 'express'
import restaurantModel from '../models/restaurantModel.js'
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
        const newRestaurant = new restaurantModel({
            name: req.body.name,
            phone: req.body.phone,
            street: req.body.street,
            number: req.body.number,
            postal: req.body.postal,
            town: req.body.town,
            photo: req.file.filename,
            users: user._id
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

// // get just one restaurant using the URL parameter
// router.get('/:id/:name',
//     (req, res) => {
//         restaurantModel
//             .findById(req.params.id)
//             // how do I have to populate to get all the data, if at all
//             .populate('name', 'phone', 'street', 'number', 'postal', 'town', 'photo')
//             .exec(function (err, restaurant) {
//                 if (err) {
//                     console.log(err)
//                     res.send(err)
//                 } else {
//                     console.log(restaurant)
//                     res.send(restaurant)
//                 }
//             })
//     }
// )

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