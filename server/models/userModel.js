import mongoose from 'mongoose'
import Schema from 'mongoose'



const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
    restaurant: [Schema.Types.ObjectId],
    profession: {
        type: String,
    }
})

export default mongoose.model('user', UserSchema)


