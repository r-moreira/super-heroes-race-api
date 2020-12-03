const multer = require('multer');
const path = require('path');

/**
** Here the middle is configured
** - It is defined in which directory the received files will be stored (./uploads in the root directory)
** - The name of the files
** - A limit for files (10mb)
** - File format (.csv)
**/
module.exports = {
	dest: path.resolve(__dirname, '..', '..', 'uploads'),
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, path.resolve(__dirname, "..", "..", "uploads"));
		},
		filename: (req, file, cb) => {
				fileName = `${Date.now()}-${file.originalname}`;
				cb(null, fileName);
		},
	}),
	limits: {
		fileSize: 10 * 1024 * 1024,
	},
	fileFilter: (req, file, cb) => {;
		const allowedMimes = [
			'text/csv',
			'application/csv',
			'text/x-csv',
			'application/x-csv',
			'text/x-comma-separated-values',
			'text/comma-separated-values'
		];

		if (allowedMimes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(new Error ("Invalid file type. File must be = .csv | Form-data key must be = file"));
		}
	},
};
