const express = require('express');
const userRoutes = express.Router();
const {
	getUser,
	postUser,
	loginUser,
	logOutUser,
	deleteUser,
} = require('../controllers/userControllers');
userRoutes.get('/', getUser);

userRoutes.post('/', postUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/logout', logOutUser);
userRoutes.delete('/:id', deleteUser);

module.exports = userRoutes;
