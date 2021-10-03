import mongoose from 'mongoose'
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
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 10,
    },
    passwordHash: {
        type: String,
    },
    img: {
        type: String,
        unique: true,
    },
    comments: {
        type: [CommentSchema],
        default: undefined,
    },
})

export default mongoose.model('restaurant', RestaurantSchema)


