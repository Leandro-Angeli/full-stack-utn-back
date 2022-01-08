const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

//POST REQUEST
const saltRounds = 10;
const postUser = (req, res) => {
	const { name, password, email, last_name, phone } = req.body;
	User.findOne({ email }).then((user) => {
		if (user) {
			res.status(500).json({ error: 'ya existe usuario' });
		} else {
			bcrypt.genSalt(saltRounds, function (err, salt) {
				bcrypt.hash(password, salt, function (err, hash) {
					if (err) {
						res.status(500).json({ err: 'error en la encriptacion' });
					} else {
						let newUser = new User({
							name,
							password: hash,
							email,
							last_name,
							phone,
						});
						newUser
							.save()
							.then(() =>
								res.status(200).json({ msg: `nuevo usuario ${newUser}` })
							)
							.catch((err) => res.status(400).json({ Error: err }));
					}
				});
			});
		}
	});
};
const loginUser = async (req, res) => {
	const { password, email } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		res.json({ error: 'usuario no encontrado' });
	} else {
		const isMatch = await bcrypt.compare(password, user.password);
		// console.log(user.password);
		// console.log(password);
		if (isMatch) {
			const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
				expiresIn: 60 * 60,
			});
			// console.log(token);
			//RES COOKI GOES FIRST THEN RES.JSON//
			res.cookie('jwt', token, {
				expires: new Date(Date.now() + 60000),
				// secure:true,
				// httpOnly:true
			});
			res.json({ usuario: user, token: token });
			//RES COOKI GOES FIRST THEN RES.JSON//
		} else {
			res.json({ error: 'datos incorrectos', token: 'null' });
		}
	}
};
const logOutUser = async (req, res) => {
	res.clearCookie('jwt');
	res.json({ msg: 'logout' });
};

//POST REQUEST
module.exports = { getUser, postUser, loginUser, logOutUser };
