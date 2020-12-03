/*
** - Using the column information, this functions returns a 'map' object.
** - The key is the hero name and the value is the hero code.
*/
function getHeroesCodeAndName(columnsInfo) {
	let codeNameMap = new Map();

	columnsInfo[1].forEach((hero) => {
		let index = 0;
		if (hero != undefined)
			while (!isNaN(parseInt(hero[index])))
				index++;
		if (index != 0)
			codeNameMap.set(parseInt(hero), hero.substr(++index))
	});
	return codeNameMap;
}

/*
** - Using the rows array and the object 'map' with code as key and name as value
** this functions returns a 'map' object with the code as the key and the
** number of laps each hero takes as value.
*/
function getHeroesLapsCompleted(rowsInfo, codeNameMap) {
	let lapsCompleted;
	let codeLapMap = new Map();

	for (const code of codeNameMap) {
		lapsCompleted = 0;
		for (const row of rowsInfo) {
			if (parseInt(row[1]) === code[0] && row[2] > lapsCompleted) {
					lapsCompleted = row[2];
				codeLapMap.set(code[0], row[2]);
			}
		}
	};
	return codeLapMap;
}
/*
** - Using the rows array and the object 'map' with code as key and name as value
** this functions returns a array with all the information needed for auxiliary
** functions that will handle time information.
*/
function getLapTime(rowsInfo, codeNameMap) {
	let codeLapTimeArr = [];
	let heroesLapTimeArr = [];
	let temp = [];

	for (const code of codeNameMap) {
		heroTotalTime = 0;
		for (const row of rowsInfo) {
			if (parseInt(row[1]) === code[0]) {
				codeLapTimeArr.push([code[0], row[3], row[2], row[4]]);
			}
		}
	}
	for (const code of codeNameMap) {
		temp = [];
		codeLapTimeArr.forEach(row => {
			if (parseInt(row) === code[0])
				temp.push(row)
		})
		heroesLapTimeArr.push(temp);
	}
	return heroesLapTimeArr;
}

/*
** This function takes information from all auxiliary functions in this file
** and returns it to the caller.
*/
function getHeroesInfo(columnsInfo, rowsInfo) {
	const codeNameMap = getHeroesCodeAndName(columnsInfo);
	const amountOfHeroes = codeNameMap.size;
	const codeLapMap = getHeroesLapsCompleted(rowsInfo, codeNameMap);
	const heroesLapTimeArr = getLapTime(rowsInfo, codeNameMap);

	return {
		codeNameMap,
		amountOfHeroes,
		codeLapMap,
		heroesLapTimeArr
	}
}

module.exports = getHeroesInfo;
