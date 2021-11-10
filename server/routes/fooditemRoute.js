import express from 'express'
import restaurantModel from '../models/restaurantModel.js'
import { FooditemSchema } from '../models/fooditemModel.js'
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
            console.log(`photo`, photo)
            const { name, type, amount, purchaseDate, dueDate, price, swapPossible } = req.body

            const newFooditem = {
                name,
                type,
                amount,
                purchaseDate,
                dueDate,
                price,
                swapPossible,
                photo,
            }
            try {
                const currentRestaurant = await restaurantModel.findById(req.params.rid)
                console.log('current restaurant:', currentRestaurant)
                currentRestaurant?.fooditems.push(newFooditem)
                currentRestaurant.save()
                res.send(currentRestaurant.fooditems)
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
        if (user.restaurants.includes(req.params.rid))
            try {
                const currentRestaurant = await restaurantModel.findById(req.params.rid)
                console.log('current restaurant:', currentRestaurant)
                currentRestaurant?.fooditems.id(req.params.fid).set(updateBody)
                currentRestaurant.save()
                res.send(currentRestaurant.fooditems)
            } catch (error) {
                console.log('error:', error)
                res.send(error)
            }
    }
)


// get all fooditems by one restaurant using the URL parameter
router.get('/:rid/fooditems', passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const user = req.user
        console.log(`user`, user)
        if (user.restaurants.includes(req.params.rid))
            try {
                const currentRestaurant = await restaurantModel.findById(req.params.rid)
                console.log('current restaurant:', currentRestaurant)
                res.send(currentRestaurant.fooditems)
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
        if (user.restaurants.includes(req.params.rid))
            try {
                const currentRestaurant = await restaurantModel.findById(req.params.rid)
                console.log('current restaurant:', currentRestaurant)
                currentRestaurant?.fooditems.id(req.params.fid).remove()
                currentRestaurant.save()
                res.send(currentRestaurant.fooditems)
            } catch (error) {
                console.log('error:', error)
                res.send(error)
            }
    }
)

export default router