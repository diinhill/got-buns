import mongoose from 'mongoose'
// import Schema from 'mongoose'



const RestaurantSchema = new mongoose.Schema({
    type: Object,
    // restaurant_id: {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     unique: true,
    // },
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
    img: {
        type: String,
        unique: true,
    },
})

export default mongoose.model('restaurant', RestaurantSchema)


