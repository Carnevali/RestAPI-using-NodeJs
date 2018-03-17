const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../../models/order');
const Product = require('../../models/product');

router.get('/', (req, res, next) => {
    Order.find()
           .select("product quantity _id")
           .exec()
           .then(orders => {
        const response = {
            count: orders.length,
            orders: orders.map(order => {
                return {
                    quantity: order.quantity,
                    product: order.product,
                    _id: order._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/' + order._id
                    }
                }
            })
        }

        if (response.count >= 0) {
            res.status(200).json(response);
        } else {
            res.status(200).json({
                message: "No entries found"
            });
        } 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    Product.findById(req.body.productId)
            .then(product => {
                if (product) {
                    const order = new Order({
                        _id: new mongoose.Types.ObjectId(),
                        quantity: req.body.quantity,
                        product: req.body.productId
                    });
        
                    return order.save();
                } else {
                    return res.status(404).json({
                        message: "Product not found!"
                    });
                }
            })
            .then(result => {
                res.status(201).json({
                    message: 'Created order successfully',
                    createdOrder: {
                        quantity: result.quantity,
                        product: result.product,
                        _id: result._id,
                        request: {
                            type: "GET",
                            url: 'http://localhost:3000/orders/' + result._id
                        }
                    }
                });    
            })
            .catch(err => {
                console.log(err);

                res.status(500).json({
                    error: err
                });    
            });
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id)
            .select('product quantity _id')
            .exec().then(order => {
            res.status(200).json({
                order: order,
                request: {
                    type: "GET",
                    url: 'http://localhost:3000/orders'
                }
            });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

    res.status(200).json({
        message: 'Order details',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order deleted',
        orderId: req.params.orderId
    });
});

module.exports = router;