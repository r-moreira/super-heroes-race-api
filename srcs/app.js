const csvParser = require('./utils/csvParser');
const getHeroesInfo = require('./utils/getHeroesInfo');
const handleRaceTimes = require('./utils/handleRaceTimes');
const { parseToMilliseconds } = require('./utils/milliseconds_handlers');

/*
** The API main function
** - Joins all information about each superhero in a object.
*/
function joinHeroesInfo(fileName) {

	/*
	** Object where the information to be sent to the server will be stored.
	*/
	const heroesData = {};

	/*
	** - Calls an auxiliary function that parses the .csv file and
	** returns the information about rows and columns.
	*/
	const { columnsInfo, rowsInfo } = csvParser(fileName);
	/*
	** Calling auxiliary functions to add information to the object.
	** - These functions will return objects of type 'map'.
	** - Map objects will have the hero's code as key and a value to be added
	** to the previously created object.
	*/

	const {
		codeNameMap,
		amountOfHeroes,
		codeLapMap,
		heroesLapTimeArr
	}  = getHeroesInfo(columnsInfo, rowsInfo);

	const {
		codeRaceTimeMap,
		codePositionMap,
		codeHeroesBestLapMap,
		codeHeroesAverageSpeedMap
	 } = handleRaceTimes(amountOfHeroes, heroesLapTimeArr);

	/*
	** - As all objects 'maps' will have the hero's code as key to return the expected
	** - value, we'll use the heroes code to iterate over all maps, and then add
	** - the values to the object.
	*/
	mapCodes = codeNameMap.keys();
	for (i = 0; i < amountOfHeroes; i++) {
		let codes = mapCodes.next().value;
		heroesData[codeNameMap.get(codes)] = {
			heroCode: codes,
			heroName: codeNameMap.get(codes),
			heroFinalPosition: codePositionMap.get(codes),
			lapsCompleted: codeLapMap.get(codes),
			totalRaceTime: codeRaceTimeMap.get(codes),
			heroBestLap: codeHeroesBestLapMap.get(codes),
			heroAverageSpeed: codeHeroesAverageSpeedMap.get(codes)
		};
	}
	module.exports = { columnsInfo, rowsInfo }

	/*
	** The object containing all hero data is returned to the server.
	*/
	console.log(heroesData);
	return heroesData;
};

getHeroesInfo('log.csv');

/*
** This is another important function.
** It returns the data for the best lap of the race.
*/
function getRaceBestLap(fileName) {

	/*
	** - Calls an auxiliary function that parses the .csv file and
	** returns the information about rows and columns.
	*/
	const { columnsInfo, rowsInfo } = csvParser(fileName);

	/*
	** - Calls an auxiliary function that returns information about the race
	*/
	const { codeNameMap, heroesLapTimeArr } = getHeroesInfo(columnsInfo, rowsInfo);

	/*
	** - The array with race information is arranged in ascending order according
	** to the fastest laps.
	*/
	for (heroesLaps of heroesLapTimeArr) {
		heroesLaps.sort((a, b) => {
			let timeA, timeB;
			timeA =	parseToMilliseconds(a[1]);
			timeB = parseToMilliseconds(a[1]);
			return timeA - timeB;
		});
	}

	/*
	** - This array stores the best lap of each hero
	*/
	const bestLaps = heroesLapTimeArr[0];

	/*
	** - Using the previous array, an object is created containing the information
	** of the best lap of the race
	*/
	const bestLap = {
		by: codeNameMap.get(bestLaps[0][0]),
		lapNumber: bestLaps[0][2],
		lapTime: bestLaps[0][1],
		averageSpeed: bestLaps[0][3]
	}

	/*
	** Returns the object to the server.
	*/
	return bestLap;
}

module.exports = joinHeroesInfo;
module.exports = getRaceBestLap;
