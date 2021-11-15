import mongoose from 'mongoose'
import Schema from 'mongoose'
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
    amount: {
        type: /*Schema.Types.Decimal128*/ Number,
        required: true,
    },
    purchaseDate: {
        type: /* Object */ Date,
        required: true,
        // day: {
        //     type: Number,
        //     min: 1,
        //     max: 31,
        //     required: true,
        // },
        // month: {
        //     type: String,
        //     required: true,
        // },
        // year: {
        //     type: Number,
        //     min: 2021,
        //     max: 2050,
        //     required: true,
        // },
    },
    dueDate: {
        type: Date,
        required: true,
        // day: {
        //     type: Number,
        //     min: 1,
        //     max: 31,
        //     required: true,
        // },
        // month: {
        //     type: String,
        //     required: true,
        // },
        // year: {
        //     type: Number,
        //     min: 2021,
        //     max: 2050,
        //     required: true,
        // },
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


export default mongoose.model('fooditem', FooditemSchema)




