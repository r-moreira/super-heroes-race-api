const { parseToMilliseconds, msToTime } = require('./milliseconds_handlers');

/*
** - The information used by the functions of this file is obtained by the
** functions of the file getHeroesInfo.js
*/

/*
** - This function returns an object of type 'map' with the code as the
** key and the total race time as the value.
*/
function handleRaceTotalTimes(amountOfHeroes, heroesLapTimeArr) {
	let codeRaceTimeMap = new Map();
	let totalTime;
	let	code;

	for (let i = 0; i < amountOfHeroes; i++) {
		totalTime = 0;
		for (const heroLaps of heroesLapTimeArr[i]) {
				totalTime += parseToMilliseconds(heroLaps[1])
			code = heroLaps[0];
		}
		codeRaceTimeMap.set(code, msToTime(totalTime));
	}
	return codeRaceTimeMap;
}

/*
** - This function returns an object of type 'map' with the code as the
** key and the heroes final position as the value.
*/
function getHeroesPosition(amountOfHeroes, codeRaceTimeMap) {
	let codeRacePositionMap = new Map();
	let raceTimeArr = Array.from(codeRaceTimeMap);

	raceTimeArr.sort((a , b) => {
		timeA =	parseToMilliseconds(a[1]);
		timeB = parseToMilliseconds(b[1]);
		return timeA - timeB;
	});

	for (let i = 0; i < amountOfHeroes; i++) {
		codeRacePositionMap.set(raceTimeArr[i][0], (i + 1));
	};
	return (codeRacePositionMap);
}

/*
** - This function returns an object of type 'map' with the code as the
** key and the heroes best lap as the value.
*/
function getHeroesBestLap(amountOfHeroes, heroesLapTimeArr) {
	let heroesBestLapMap = new Map();
	let tempArr;

	for (let i = 0; i < amountOfHeroes; i++) {
		tempArr = [];
		tempArr = heroesLapTimeArr[i];
		tempArr.sort((a, b) => {
			let timeA, timeB;
			timeA =	parseToMilliseconds(a[1]);
			timeB = parseToMilliseconds(b[1]);
			return timeA - timeB;
		});
		heroesBestLapMap.set(tempArr[0][0], tempArr[0][2])
	}
	return heroesBestLapMap;
}

/*
** - This function returns an object of type 'map' with the code as the
** key and the heroes average speed as the value.
*/
function getHeroesAverageSpeed(amountOfHeroes, heroesLapTimeArr)
{
	let codeHeroesAverageSpeedMap = new Map();
	let totalSpeed;
	let	code;
	let lapCount;
	let averageSpeed;

	for (let i = 0; i < amountOfHeroes; i++) {
		totalSpeed = 0;
		lapCount = 0;
		for (const heroLaps of heroesLapTimeArr[i]) {
			totalSpeed += parseFloat(heroLaps[3].replace(',', '.'));
			lapCount++;
			code = heroLaps[0];
		}
		averageSpeed = totalSpeed / lapCount;
		codeHeroesAverageSpeedMap.set(code, averageSpeed.toFixed(3));
	}
	return codeHeroesAverageSpeedMap;
}

/*
** This function takes information from all auxiliary functions in this file
** and returns it to the caller.
*/
function handleRaceTimes(amountOfHeroes, heroesLapTimeArr) {
	const codeRaceTimeMap = handleRaceTotalTimes(amountOfHeroes, heroesLapTimeArr);
	const codePositionMap = getHeroesPosition(amountOfHeroes, codeRaceTimeMap);
	const codeHeroesBestLapMap = getHeroesBestLap(amountOfHeroes, heroesLapTimeArr);
	const codeHeroesAverageSpeedMap = getHeroesAverageSpeed(amountOfHeroes, heroesLapTimeArr);

	return {
		codeRaceTimeMap,
		codePositionMap,
		codeHeroesBestLapMap,
		codeHeroesAverageSpeedMap
	}
}

module.exports = handleRaceTimes;
