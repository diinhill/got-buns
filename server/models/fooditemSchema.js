import mongoose from 'mongoose'
import { CommentSchema } from './commentModel.js'


export const FooditemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    restaurantID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    amount: {
        type: /*Schema.Types.Decimal128*/ Number,
        required: true,
    },
    purchaseDate: {
        type: Date,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    price: {
        type: /*Schema.Types.Decimal128*/ Number,
        required: true,
    },
    swapPossible: {
        type: Boolean,
        required: true,
    },
    reserved: {
        type: Boolean,
        required: true,
        default: false,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
    photo: {
        type: String,
    },
    likes: {
        type: Number,
    },
    comments: {
        type: [CommentSchema],
        default: undefined,
        //  this is creating a subcollection (nesting) in my collection, which is preferable because I don't need these
        // particular comments anywhere else in my app.
    },
})


// export default mongoose.model('fooditem', FooditemSchema)




