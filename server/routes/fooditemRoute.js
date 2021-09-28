import express from 'express'
import fooditemModel from '../models/fooditemModel.js'


const router = express.Router();


// create a test route
router.get('/test', (req, res) => {
    res.send({ msg: 'Test route.' });
});


// get all fooditems
router.get('/all',
    (req, res) => {
        fooditemModel.find()
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
    });


// add fooditem
router.post('/',
    (req, res) => {
        const { name, type, amount, purchaseDate, dueDate, price, swapPossible, img } = req.body
        // am I only adding the parameters that the user needs to set or also those that are set automatically during doc creation or added later like comments ??
        let addFooditem = new fooditemModel({
            name,
            type,
            amount,
            purchaseDate,
            dueDate,
            price,
            swapPossible,
            img
        })
        console.log(addFooditem)
        addFooditem.save((err, files) => {
            if (err) { console.log(err) }
            res.status(201).json(files)
        })
    }
)

// update fooditem
router.put('/:id',
    (req, res) => {
        fooditemModel.findByIdAndUpdate({ _id: req.params.id }, req.body
            .then(() => {
                fooditemModel.findOne({ _id: req.params.id })
                    .then(files => {
                        res.send(files)
                    })
            })
        )
    }
)

// delete fooditem
router.delete('/:id',
    (req, res) => {
        fooditemModel.findByIdAndRemove({ _id: req.params.id })
            .then(files => {
                res.send(files)
            })
    }
)

// module.exports = router;
export default router;