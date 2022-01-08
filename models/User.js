const mongoose = require('mongoose');
//Schema

const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		name: { type: String },
		last_name: { type: String },
		phone: { type: String },
		email: { type: String },
		password: { type: String },
	},
	{ versionKey: false }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;
