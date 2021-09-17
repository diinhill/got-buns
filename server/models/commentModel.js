import mongoose from 'mongoose'
// import Schema from 'mongoose'



const CommentSchema = new mongoose.Schema({
    type: Object,
    user: {
        type: String,
        required: true,
    },
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


