import mongoose from 'mongoose'
import Schema from 'mongoose'



const UserSchema = new mongoose.Schema({
    name: {
        type: String,
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
    },
    photo: {
        type: String,
    },
    restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'restaurant' }],
    profession: {
        type: String,
    },
})
UserSchema.index({ name: 'text', email: 'text' });

export default mongoose.model('user', UserSchema)


