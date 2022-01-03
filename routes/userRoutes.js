const express = require('express');
const userRoutes = express.Router();
const {
	getUser,
	postUser,
	loginUser,
} = require('../controllers/userControllers');
userRoutes.get('/', getUser);

userRoutes.post('/', postUser);
userRoutes.post('/login', loginUser);

module.exports = userRoutes;
