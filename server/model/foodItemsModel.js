const mongoose = require('mongoose')
const { Schema } = mongoose



const foodItemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});
const foodItem = mongoose.model('FoodItem', foodItemSchema);
module.exports = foodItem;