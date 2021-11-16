import express from 'express'
import restaurantModel from '../models/restaurantModel.js'
import fooditemModel from '../models/fooditemModel.js'
import upload from '../middlewares/imgUpload.js'
import passport from 'passport'


const router = express.Router()



// get all fooditems
// router.get('/fooditems',
//     (req, res) => {
//         restaurantModel.find().select('fooditems')
//             .then(files => {
//                 res.send(files)
//             })
//             .catch(err => console.log(err))
//     }
// )


// add fooditem = update fooditems array of respective restaurant
router.route('/:rid/addfooditem')
    .patch(passport.authenticate('jwt', { session: false }), upload.single('photo'),
        async (req, res) => {
            const user = req.user
            const photo = req.file?.filename
            const { name, type, amount, price, swapPossible } = req.body

            const newFooditem = new fooditemModel({
                name,
                type,
                amount,
                price,
                swapPossible,
                photo,
            })
            console.log('newFooditem:', newFooditem)
            try {
                const updatedRestaurant = await restaurantModel.findOneAndUpdate({
                    _id: req.params.rid
                }, {
                    $push: { fooditems: newFooditem }
                }, {
                    new: true
                })
                console.log('updated restaurant:', updatedRestaurant)
                res.send(updatedRestaurant)
            } catch (error) {
                console.log('error:', error)
                res.send(error)
            }
        }
    )

// delete fooditem
router.delete('/:rid/fooditems/:fid', passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const user = req.user
        console.log(`user`, user)
        try {
            const updatedRestaurant = await restaurantModel.findOneAndUpdate({
                _id: req.params.rid
            }, {
                $pull: { fooditems: { _id: req.params.fid } }
            }, {
                new: true
            })
            console.log('updated restaurant:', updatedRestaurant)
            // updatedRestaurant?.fooditems.id(req.params.fid).remove()
            // updatedRestaurant.save()
            res.send(updatedRestaurant)
        } catch (error) {
            console.log('error:', error)
            res.send(error)
        }
    }
)

// get one fooditem by id
router.get('/:rid/fooditems/:fid', passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const user = req.user
        console.log('user:', user)
        try {
            const currentRestaurant = await restaurantModel.findById(req.params.rid)
            console.log('current restaurant:', currentRestaurant)
            const currentFooditem = currentRestaurant?.fooditems.id(req.params.fid)
            console.log(`currentFooditem:`, currentFooditem)
            res.send(currentFooditem)
        } catch (error) {
            console.log('error:', error)
            res.send(error)
        }
    }
)

// edit fooditem  
router.patch('/:rid/fooditems/:fid', passport.authenticate('jwt', { session: false }), upload.single('photo'),
    async (req, res) => {
        const user = req.user
        console.log(`user`, user)
        const photo = req.file?.filename
        console.log(`photo`, photo)
        const updateBody = {
            ...req.body,
            photo
        }
        try {
            const currentRestaurant = await restaurantModel.findById(req.params.rid)
            console.log('current restaurant:', currentRestaurant)
            currentRestaurant?.fooditems.id(req.params.fid).set(updateBody)
            // currentRestaurant.save()
            const updatedRestaurant = await restaurantModel.findOneAndUpdate({
                _id: req.params.rid
            }, {
                fooditems: currentRestaurant.fooditems
            }, {
                new: true
            })
            console.log('updated restaurant:', updatedRestaurant)
            res.send(updatedRestaurant)
            // res.send(currentRestaurant)
        } catch (error) {
            console.log('error:', error)
            res.send(error)
        }
    }
)


// // get all fooditems by one restaurant using the URL parameter
// router.get('/:rid/fooditems', passport.authenticate('jwt', { session: false }),
//     async (req, res) => {
//         const user = req.user
//         console.log(`user`, user)
//         if (user.restaurants.includes(req.params.rid))
//             try {
//                 const currentRestaurant = await restaurantModel.findById(req.params.rid)
//                 console.log('current restaurant:', currentRestaurant)
//                 res.send(currentRestaurant.fooditems)
//             } catch (error) {
//                 console.log('error:', error)
//                 res.send(error)
//             }
//     }
// )

export default router