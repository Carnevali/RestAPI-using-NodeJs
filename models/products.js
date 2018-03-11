const sequelize = require('./connectDB');

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('product', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      description: {
        type: Sequelize.STRING
      },

      price: {
        type: Sequelize.DECIMAL(12,2),
        notNull: true,
        default: 0.00
      },

      stock: {
        type: Sequelize.INTEGER,
        notNull: true,
        default: 0
      },

      // Timestamps
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('product');
  }
}

const Product = sequelize.define('product', {
  id: Sequelize.INTEGER,
  description: Sequelize.STRING,
  price: Sequelize.DECIMAL(12,2),
  stock: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

sequelize.sync()
  .then(() => User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });

  User.findAll().then(users => {
    console.log(users)
  })