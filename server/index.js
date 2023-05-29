const express = require('express');
const app = express();
const mongoose = require('mongoose');
const FoodModel = require('./models/Food');
const OrderModel = require('./models/Order');

mongoose.connect('mongodb+srv://Kate:sovist1999@cluster0.lzkxtfe.mongodb.net/foodDelivery?retryWrites=true&w=majority');

const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/getShop', (req, res) => {
    FoodModel.find({shop: req.query.shop}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result);
        }
    });
});

app.post('/sendOrder', async (req, res) => {
    const order = req.body;
    const newOrder = new OrderModel(order);
    await newOrder.save();

    res.json(order);
});


app.use('/img', express.static('img'));

const server = app.listen(3001, function () {
    const host = server.address().address
    const port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});



