import express from 'express'
import fooditemModel from '../models/fooditemModel.js'
import upload from '../middlewares/imgUpload.js'


const router = express.Router()


// create a test route
router.get('/test', (req, res) => {
    res.send({ msg: 'Test route.' })
})


// get all fooditems
router.get('/',
    (req, res) => {
        fooditemModel.find()
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err))
    }
)


// // get all fooditems by one restaurant
// router.get('/profile/:name/fooditems',
//     (req, res) => {
//         const name = req.params.name
//         fooditemModel.find({
//             // restaurant.name
//         })
//     }
// )


// add fooditem
router.route('/:id/add').post(upload.single('photo'), (req, res) => {
    const { restaurant } = req.params.id
    const { photo } = req.file.filename
    const { name, type, amount, purchaseDate, dueDate, price, swapPossible } = req.body
    // am I only adding the parameters that the user needs to set or also those that are set automatically during doc creation or added later like comments ??
    let addFooditem = new fooditemModel({
        name,
        type,
        amount,
        purchaseDate,
        dueDate,
        price,
        swapPossible,
        restaurant,
        photo
    })
    console.log(addFooditem)
    addFooditem.save((err, files) => {
        if (err) { console.log(err) }
        res.status(201).json(files)
    })
}
)

// get all fooditems by one restaurant using the URL parameter
router.get('/:id',
    (req, res) => {
        const { restaurant } = req.params.id
        fooditemModel
            .findById(restaurant)
            // populate with data how ??
            .populate('details')
            .exec(function (err, fooditem) {
                if (err) {
                    console.log(err)
                    res.send(err)
                } else {
                    console.log(fooditem.details)
                    res.send(fooditem)
                }
            })
    }
)

// update fooditem
router.put('/:id-:fodid',
    (req, res) => {
        fooditemModel.findByIdAndUpdate({ restaurant: req.params.id }, req.body
            .then(() => {
                fooditemModel.findOne({ restaurant: req.params.id, _id: req.params.fodid })
                    .then(files => {
                        res.send(files)
                    })
            })
        )
    }
)

// delete fooditem
router.delete('/:id-:fodid',
    (req, res) => {
        fooditemModel.findByIdAndRemove({ restaurant: req.params.id, _id: req.params.fodid })
            .then(files => {
                res.send(files)
            })
    }
)

export default router