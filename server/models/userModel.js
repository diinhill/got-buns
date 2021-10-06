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
    restaurant: [Schema.Types.ObjectId],
    profession: {
        type: String,
    }
})

export default mongoose.model('user', UserSchema)


