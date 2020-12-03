const fs = require('fs');

/*
** This function parses the .csv file.
** Return a bi-dimensional array containing the header, rows and columuns data
*/
function csvParser(filePathAndName) {

	let fileData;
	let fileRows;
	let headerInfo;
	let rowsInfo = [];
	let columnsInfo = [];

	/*
	** Reading the file.
	*/
	fileData = fs.readFileSync(filePathAndName, 'utf8', (err) => {
		if (err) return console.log(err);
	});

	/*
	** Getting header info.
	*/
	fileRows = fileData.split('\n')
	headerInfo = fileRows[0].split(';');

	/*
	** Getting rows info.
	*/
	for (rows of fileRows) {
		rowsInfo.push(rows.split(';'));
	}

	/*
	** Getting columns info
	*/
	for (let i = 0; i < rowsInfo[0].length; i++) {
		columnsInfo.push([]);
	}
	for (let column = 0; column < rowsInfo[0].length; column++) {
		for (let row = 0; row < fileRows.length; row++)
			columnsInfo[column].push(rowsInfo[row][column]);
	}

	/*
	** Returns the parse information to the caller.
	*/
	return {
		headerInfo,
		rowsInfo,
		columnsInfo
	}
};

module.exports = csvParser;
