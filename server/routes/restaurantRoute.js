import express from 'express'
import fooditemModel from '../models/fooditemModel.js';
import restaurantModel from '../models/restaurantModel.js'


const router = express.Router();


// create a test route
router.get('/test', (req, res) => {
    res.send({ msg: 'Test route.' });
});


// get all restaurants
router.get('/all',
    (req, res) => {
        restaurantModel.find()
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
    });


// add restaurant
router.post('/',
    (req, res) => {
        const { name, phone, street, number, postal, img } = req.body
        // am I only adding the parameters that the user needs to set or also those that are set automatically during doc creation or added later like comments ??
        const addRestaurant = new restaurantModel({
            name,
            phone,
            street,
            number,
            postal,
            img
        })
        console.log(addRestaurant)
        addRestaurant.save((err, files) => {
            if (err) { console.log(err) }
            res.status(201).json(files)
        })
    }
)

// update restaurant
router.put('/:id',
    (req, res) => {
        fooditemModel.findByIdAndUpdate({ _id: req.params.id }, req.body)
            .then(() => {
                fooditemModel.findOne({ _id: req.params.id })
                    .then(files => {
                        res.send(files)
                    })
            })
    }
)

// delete restaurant
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