const { joinHeroesInfo, getRaceBestLap } = require('./app');
const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

let uploadedFileName;

/*
** Starting the server.
*/
const app = express();

/*
** Configuring the HTTP header to avoid 'CORS errors'.
*/
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET', 'POST');
		return res.status(200).json({});
	}
	next();
});

/*
** API initial route.
*/
app.get('/', (req, res, next) => {
	res.status(200);
	res.json({
		sendFile: 'localhost:3000/send-file',
		seeAllHeroesIfno: 'localhost:3000/all-heroes-info',
		seeBestLapInfo: 'localhost:3000/best-lap-info'
	});
});

/*
** This route returns the information about each hero.
*/
app.get('/all-heroes-info', (req, res, next) => {
	res.status(200);
	console.log(joinHeroesInfo(uploadedFileName));
	res.json({
		allHeroesInfo : joinHeroesInfo(uploadedFileName),
	});
});

/*
** This route returns the information about the bast lap in the race.
*/
app.get('/best-lap-info', (req, res, next) => {
	res.status(200)
	res.json({
		bestLapInfo : getRaceBestLap(uploadedFileName),
	});
});

/* This route receives the .csv file
** Multer middleware is configured to assist in the process.
** It is important that the multpart form key has the value 'file'.
*/
app.post('/send-file', multer(multerConfig).single('file'), (req, res, next) => {

	uploadedFileName = './uploads/'+req.file.filename
	res.status(201)
	res.json({
		status: 'The file was uploaded successfully!',
		seeAllHeroesInfo: 'localhost:3000/all-heroes-info',
		seeBestLapInfo: 'localhost:3000/best-lap-info'
	});
});

/*
** If none of the routes are found an error will be generated.
*/
app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

/*
** Other errors are handled here by sending a corresponding JSON error message
*/
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;
