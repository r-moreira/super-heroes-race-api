/*
** - This function receives a string in the format: "hh:mm:ss.xxx"
** and returns the corresponding number of milliseconds
*/
function parseToMilliseconds(hours) {

	let hour, min, sec, ms;
	let count = 0;

	for (let i = 0; i < hours.length; i++)
		if (hours[i] == ':')
			count++;
	if (count == 2) {
		hour = hours.split(':');
		min = hour[1];
		sec = hour[2].split('.');
		ms = sec[1];
	} else {
		hour = 0;
		min = hours.split(':');
		sec = min[1].split('.');
		ms = sec[1];
	}
	hour = parseInt(hour);
	min = parseInt(min);
	sec = parseInt(sec);
	ms = parseInt(ms);
	return ((hour * 60 * 60 + min * 60 + sec) * 1000 + ms);
}
/*
** - This function takes a number of milliseconds and returns a
** corresponding string in the format "hh:mm:ss.xxx".
*/
function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000))
    var seconds = parseInt((duration / 1000) % 60)
    var minutes = parseInt((duration / (1000 * 60)) % 60)
    var hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
	seconds = (seconds < 10) ? "0" + seconds : seconds;

	if (duration < 1000)
		return milliseconds;
	else if (duration < 6000)
		return seconds + "." + milliseconds;
	else if (duration < 3600000)
		return minutes + ":" + seconds + "." + milliseconds;
	return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

module.exports = { parseToMilliseconds, msToTime };
