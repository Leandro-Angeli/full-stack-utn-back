const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { urlencoded } = require('express');

app.use(cors());
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
require('./config/db');
// app.get('/', (req, res) => {
// 	res.send('ok');
// });
// app.post('/', (req, res) => {
// 	const { name, password, email } = req.body;
// 	let user = { name, password, email };
// 	res.json(user);
// });
app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.listen(process.env.PORT, () => {
	console.log('running on port', process.env.PORT);
});
