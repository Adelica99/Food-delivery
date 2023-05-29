const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    shop: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    },  
    price: {
        type: Number,
        require: true
    }, 
});

const FoodModel = mongoose.model('foods', FoodSchema);

module.exports = FoodModel;