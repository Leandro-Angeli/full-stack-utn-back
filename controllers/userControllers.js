const User = require('../models/User');

const getUser = (req, res) => {
	res.send('on');
};

const postUser = (req, res) => {
	const { name, password, email } = req.body;

	let newUser = new User({
		name,
		password,
		email,
	});
	newUser
		.save()
		.then(() => res.json({ msg: `nuevo usuario ${newUser}` }))
		.catch((err) => res.status(400).json({ Error: err }));
};
module.exports = { getUser, postUser };
