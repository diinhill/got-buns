import mongoose from 'mongoose'
import Schema from 'mongoose'


const FooditemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    amount: {
        type: Schema.Types.Decimal128,
        required: true,
    },
    purchaseDate: {
        type: Object,
        required: true,
        day: {
            type: Number,
            min: 1,
            max: 31,
            required: true,
        },
        month: {
            type: String, 
            required: true,
        },
        year: {
            type: Number,
            min: 2021,
            max: 2050,
            required: true,
        },
    },
    dueDate: {
        type: Object,
        required: true,
        day: {
            type: Number,
            min: 1,
            max: 31,
            required: true,
        },
        month: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            min: 2021,
            max: 2050,
            required: true,
        },
    },
    price: {
        type: Schema.Types.Decimal128,
        required: true,
    },
    swapPossible: {
        type: Boolean,
        required: true,
    },
    reserved: {
        type: Boolean,
        required: true,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
    restaurant: {
        type: Object,
        required: true,
        unique: true,
        restaurant_id: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: true,
        },
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
    },
    img: {
        type: String,
        unique: true,
    },
    likes: {
        type: Number,
    },
    comments: [Schema.Types.ObjectId],
    // comments: {
    //     type: [CommentSchema],
    //     default: undefined,  
    // }, this would only store the information 'this is an array of schemas' in it, but not 
    // the comments themselves. I will have to point to the comments and create the path when the comment 
    // is created via the_id set by mongodb during doc creation.
})


export default mongoose.model('fooditem', FooditemSchema)




