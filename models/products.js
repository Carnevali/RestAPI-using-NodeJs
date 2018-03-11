const Sequelize = require('sequelize');

const Products = {
    id: { 
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: false,
        defaultValue: '0.00'
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
};

module.exports = Products;