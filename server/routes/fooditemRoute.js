import express from 'express'
import fooditemModel from '../models/fooditemModel'


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
        const { name, type, amount } = req.body
        let addFooditem = new fooditemModel({
            name,
            country,
            img
        })
        console.log(addFooditem)
        addFooditem.save((err, files) => {
            if (err) { console.log(err) }
            res.status(201).json(files)
        })
    });


// module.exports = router;
export default router;