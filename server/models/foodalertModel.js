import mongoose from 'mongoose'
import Schema from 'mongoose'
import { ResponseSchema } from './responseModel'



const FoodalertSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Schema.Types.Decimal128,
    },
    asap: {
        type: Boolean,
        required: true,
    },
    untilLatest: {
        type: Date,
        required: true,
    },
    price: {
        type: Schema.Types.Decimal128,
    },
    swapPossible: {
        type: Boolean,
    },
    resolved: {
        type: Boolean,
        required: true,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
    restaurant: [Schema.Types.ObjectId],
    responses: {
        type: [ResponseSchema],
        default: undefined,
    },
})

export default mongoose.model('foodalert', FoodalertSchema)