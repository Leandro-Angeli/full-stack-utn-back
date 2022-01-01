const mongoose = require('mongoose');
//Schema

const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		name: { type: String },
		email: { type: String },
		password: { type: String },
	},
	{ versionKey: false }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;
