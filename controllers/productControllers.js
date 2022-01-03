const Product = require('../models/Product');
//get products
const getProducts = (req, res) => {
	console.log(req.params);
	Product.find()
		.then((data) => res.json(data))
		.catch((err) => res.json(err));
};
const getProductsByCategory = (req, res) => {
	Product.find()
		.sort({ category: 1 })
		.then((data) => res.json(data))
		.catch((err) => res.json(err));
};
const getProductById = (req, res) => {
	Product.findById(req.params.id)
		.then((data) => res.json(data))
		.catch((err) => res.json({ error: 'producto no encontrado' }));
};
const searchProduct = (req, res) => {
	const { category, name } = req.params;
	// res.json(req.params);
	Product.find({ category, name })
		.then((data) => res.json(data))
		.catch((err) => res.json({ error: 'producto no encontrado' }));
};
//get products
// post products
const postProduct = (req, res) => {
	const { name, description, price, img, category } = req.body;

	let newProduct = new Product({
		name,
		description,
		price,
		img,
		category,
	});
	newProduct
		.save()
		.then(() => res.json({ msg: `nuevo producto  ${newProduct}` }))
		.catch((err) => res.status(400).json({ Error: 'error' }));
};
// post products
module.exports = {
	getProducts,
	postProduct,
	getProductsByCategory,
	getProductById,
	searchProduct,
};
