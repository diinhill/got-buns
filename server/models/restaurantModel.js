import mongoose from 'mongoose'
import Schema from 'mongoose'
import { CommentSchema } from './commentModel.js'
import { FooditemSchema } from './fooditemSchema.js'



const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
    },
    cuisineType: {
        type: String,
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
    fooditems: {
        type: [FooditemSchema],
    },
    comments: {
        type: [CommentSchema],
        default: undefined,
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    users: [{ type: Schema.Types.ObjectId, ref: 'user' }],
})

export default mongoose.model('restaurant', RestaurantSchema)


