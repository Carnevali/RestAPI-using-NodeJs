const Sequelize = require('sequelize');
const connection = require('../connectDB');
const products = require('../models/products');

const Products = connection.define('products', {
    products
});

connection.sync().then(result => {
    new Products.create({
        
    });
});