import express from 'express'
import fooditemModel from '../models/fooditemModel.js'
import upload from '../middlewares/imgUpload.js'
import passport from 'passport'


const router = express.Router()



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
        const photo = req.file.filename
        const { name, type, amount, purchaseDate, dueDate, price, swapPossible } = req.body
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
router.get('/restaurant/:rid', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { rid } = req.params
    fooditemModel
        .findById({ restaurant: rid })
        .then(files => {
            res.send(files)
        })
        .catch(err => console.log(err))
}
)


// update fooditem
router.patch('/:fid', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        fooditemModel.findByIdAndUpdate(
            req.params.fid,     // filter
            req.body            // update
        )
    }
)

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