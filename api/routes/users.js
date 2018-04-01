const express = require('express');
const router = express.Router();
const checkAuth = require('../../api/middleware/check-auth');
const UsersController = require('../controllers/users');

router.post('/signup', UsersController.signUp);

router.post('/login', UsersController.login);

router.delete('/:userId', checkAuth, UsersController.deleteByUserId);

router.delete('/email/:email', checkAuth, UsersController.deleteByEmail);

module.exports = router;