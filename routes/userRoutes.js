const express = require('express');
const userRoutes = express.Router();
const { getUser, postUser } = require('../controllers/userControllers');
userRoutes.get('/', getUser);

userRoutes.post('/', postUser);

module.exports = userRoutes;
