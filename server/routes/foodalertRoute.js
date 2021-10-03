import express from 'express'
import foodalertModel from '../models/foodalertModel.js'


const router = express.Router()


// get all foodalerts
router.get('/foodalerts/all',
    (req, res) => {
        foodalertModel.find()
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err))
    })


// add foodalert
router.post('/foodalerts',
    (req, res) => {
        const { title, amount, asap, untilLatest, price, swapPossible } = req.body
        // am I only adding the parameters that the user needs to set or also those that are set automatically during doc creation or added later like comments ??
        let addFoodalert = new foodalertModel({
            title,
            amount,
            asap,
            untilLatest,
            price,
            swapPossible
        })
        console.log(addFoodalert)
        addFoodalert.save((err, files) => {
            if (err) { console.log(err) }
            res.status(201).json(files)
        })
    }
)

// get just one foodalter using the URL parameter
router.get('/foodalerts/:id',
    (req, res) => {
        let foodalertId = req.params.id
        foodalertModel
            .findById(foodalertId)
            .populate('details')
            .exec(function (err, foodalert) {
                if (err) {
                    console.log(err)
                    res.send(err)
                } else {
                    console.log(foodalert.details)
                    res.send(foodalert)
                }
            })
    }
)

// update foodalert
router.put('/foodalerts/:id',
    (req, res) => {
        foodalertModel.findByIdAndUpdate({ _id: req.params.id }, req.body
            .then(() => {
                foodalertModel.findOne({ _id: req.params.id })
                    .then(files => {
                        res.send(files)
                    })
            })
        )
    }
)

// delete foodalert
router.delete('/foodalerts/:id',
    (req, res) => {
        foodalertModel.findByIdAndRemove({ _id: req.params.id })
            .then(files => {
                res.send(files)
            })
    }
)

// module.exports = router;
export default router;