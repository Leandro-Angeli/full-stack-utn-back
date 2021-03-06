const mongoose = require('mongoose');
//Schema

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
	{
		name: { type: String },
		description: { type: String },
		price: { type: Number },

		category: { type: String },
	},
	{ versionKey: false }
);

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;
