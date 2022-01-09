const multer = require('multer');
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '../front/public/assets/products_img');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname.replace(/\s/g, '_'));
	},
});
const upload = multer({ storage });
module.exports = upload;
