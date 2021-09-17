import mongoose from 'mongoose'
// import Schema from 'mongoose'



export const CommentSchema = new mongoose.Schema({
    type: Object,
    restaurant: [Schema.Types.ObjectId],
    message: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        required: true,
    },
    likes: {
        type: Number,
    },
})

export default mongoose.model('comment', CommentSchema)


