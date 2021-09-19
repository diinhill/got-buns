import mongoose from 'mongoose'
import Schema from 'mongoose'



export const ResponseSchema = new mongoose.Schema({
    restaurant: [Schema.Types.ObjectId],
    offer: {
        type: Object,
        selected: {
            type: Boolean.true,
            required: true,
        },
        createdOn: {
            type: Date,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        price: {
            type: Schema.Types.Decimal128,
        },
    },
    question: {
        type: Object,
        selected: {
            type: Boolean.true,
            required: true,
        },
        createdOn: {
            type: Date,
            required: true,
        },
        message: {
            type: String,
            required: true,
        }
    }
})

export default mongoose.model('response', ResponseSchema)