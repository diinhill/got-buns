import mongoose, { Schema } from 'mongoose'



const fooditemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});
const fooditem = mongoose.model('fooditem', fooditemSchema);
export default fooditem



