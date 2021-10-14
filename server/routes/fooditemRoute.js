import express from 'express'
import fooditemModel from '../models/fooditemModel.js'
import upload from '../middlewares/imgUpload.js'
import passport from 'passport'


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


// add fooditem
router.route('/:rid')
    .post(passport.authenticate('jwt', { session: false }), upload.single('photo'), (req, res) => {
        const { rid } = req.params
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
            restaurant: rid,
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
router.route('/:rid')
    .get(passport.authenticate('jwt', { session: false }), (req, res) => {
        const { rid } = req.params
        fooditemModel
            .findById({ restaurant: rid })
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
// router.put('/:id-:fodid',
//     (req, res) => {
//         fooditemModel.findByIdAndUpdate({ restaurant: req.params.id }, req.body
//             .then(() => {
//                 fooditemModel.findOne({ restaurant: req.params.id, _id: req.params.fodid })
//                     .then(files => {
//                         res.send(files)
//                     })
//             })
//         )
//     }
// )

// delete fooditem
// router.delete('/:id-:fodid',
//     (req, res) => {
//         fooditemModel.findByIdAndRemove({ restaurant: req.params.id, _id: req.params.fodid })
//             .then(files => {
//                 res.send(files)
//             })
//     }
// )

export default router