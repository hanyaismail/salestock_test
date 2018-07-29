const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: './public/uploads',
	filename: function(req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
})

module.exports = multer({
	storage: storage,
	fileFilter: function(req, file, cb) {
		checkFileType(file, cb);
	},
	limits: {fileSize: 2000000}
}).single('pict');

function checkFileType(file, cb) {
	const fileTypes = /jpeg|jpg|png|gif/;
	const extname = fileTypes.test(path.extname(file.originalname));
	const mimetype = fileTypes.test(file.mimetype)

	if(extname && mimetype) {
		return cb(null, true)
	} else {
		cb('Error: file must be image!')
	}
}