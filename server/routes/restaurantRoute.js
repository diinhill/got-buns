import express from 'express'
import userModel from '../models/userModel.js'
import restaurantModel from '../models/restaurantModel.js'
import upload from '../middlewares/imgUpload.js'
import passport from 'passport'


const router = express.Router()


router.route('/')
    // get all restaurants
    .get(
        async (req, res) => {
            await restaurantModel.find().select("name type cuisineType street number postal town photo fooditems")
                .then(files => {
                    res.send(files)
                })
                .catch(err => console.log(err))
        }
    )
    // add new restaurant, then update restaurant array in userModel
    .post(passport.authenticate('jwt', { session: false }), upload.single('photo'),
        async (req, res) => {
            const user = req.user
            console.log('user:', user)
            const photo = req.file?.filename
            const { name, type, cuisineType, phone, street, number, postal, town } = req.body
            console.log('photo:', photo)
            console.log('req.body:', req.body)
            try {
                const newRestaurant = new restaurantModel({
                    name,
                    // type,
                    // cuisineType,
                    phone,
                    street,
                    number,
                    postal,
                    town,
                    photo,
                    admin: user._id,
                    fooditems: []
                })
                console.log('new restaurant:', newRestaurant)
                newRestaurant.save()

                const updatedUser = await userModel.findOneAndUpdate({
                    _id: user._id
                }, {
                    $push: { restaurants: newRestaurant?._id }
                }, {
                    new: true
                })
                console.log('updated user:', updatedUser)
                res.send(updatedUser)
            } catch (error) {
                console.log('error:', error)
                res.send(error)
            }
        }
    )

router.route('/:rid')
    // update restaurant information
    .patch(passport.authenticate('jwt', { session: false }), upload.single('photo'),
        async (req, res) => {
            const user = req.user
            const photo = req.file?.filename

            console.log(`photo`, photo)
            const updateBody = {
                ...req.body,
                photo
            }

            try {
                const updatedRestaurant = await restaurantModel.findOneAndUpdate({
                    admin: user._id,        // filter 
                    _id: req.params.rid
                },
                    updateBody              // update 
                    , {
                        new: true           // returns object AFTER update
                    })
                console.log('updated restaurant:', updatedRestaurant)
                res.send(updatedRestaurant)
            } catch (error) {
                console.log(`error`, error)
                res.send(error)
            }
        }
    )
    // get just one restaurant using the URL parameter, check for logged in user and populate accordingly
    .get(passport.authenticate('jwt', { session: false }),
        async (req, res) => {
            const user = req.user
            console.log(`user`, user)
            if (user.restaurants.includes(req.params.rid))
                restaurantModel
                    .findById(req.params.rid)
                    .populate('admin')
                    .populate('users')
                    .exec(function (err, restaurant) {
                        if (err) {
                            console.log(err)
                            res.send(err)
                        } else {
                            console.log(restaurant)
                            res.send(restaurant)
                        }
                    })
            else res.send(await restaurantModel
                .findById(req.params.rid).select("name street"))
        }
    )
    // delete restaurant
    .delete(passport.authenticate('jwt', { session: false }),
        async (req, res) => {
            const user = req.user
            console.log(`user`, user)
            try {
                const updatedUser = await userModel.findOneAndUpdate({
                    _id: user._id
                }, {
                    $pull: { restaurants: req.params.rid }
                }, {
                    new: true
                })
                console.log(`updatedUser`, updatedUser)
                res.send(await restaurantModel.findOneAndRemove({
                    admin: user._id,        // filter 
                    _id: req.params.rid
                }))
            } catch (error) {
                res.send(error)
            }

        }
    )

export default router