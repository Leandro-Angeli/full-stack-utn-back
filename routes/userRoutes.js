const express = require('express');
const userRoutes = express.Router();
const {
	getUser,
	postUser,
	loginUser,
	logOutUser,
} = require('../controllers/userControllers');
userRoutes.get('/', getUser);

userRoutes.post('/', postUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/logout', logOutUser);

module.exports = userRoutes;
