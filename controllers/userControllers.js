const User = require('../models/User');
//async error handling working
const getUser = async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
		console.log(users.length);
	} catch (err) {
		res.json({ err: 'error' });
	}
};
//async error handling working
// then not workin error handling
// const getUser = (req, res) => {
// 	User.find({ sd })
// 		.then((users) => {
// 			res.status(200).json(users);
// 			if (!users) {
// 				let error = 'error';
// 				return error;
// 			}
// 		})
// 		.catch((err) => {
// 			res.status(404).json({ status: 404, message: ' Ha ocurrido un error ' });
// 		});
// };
//then not workin error handling
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
