import mongoose from 'mongoose'
import Schema from 'mongoose'
import { CommentSchema } from './commentModel.js'



const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    street: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    postal: {
        type: Number,
        required: true,
    },
    town: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
    comments: {
        type: [CommentSchema],
        default: undefined,
    },
    user: [Schema.Types.ObjectId],
    fooditems: [Schema.Types.ObjectId],
})

export default mongoose.model('restaurant', RestaurantSchema)


