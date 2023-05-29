const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    addres: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    order: {
        type: Array,
        require: true
    },
    totalPrice: {
        type: Number,
        require: true
    } 
});

const OrderModel = mongoose.model('orders', OrderSchema);

module.exports = OrderModel;