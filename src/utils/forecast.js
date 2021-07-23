const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${latitude},${longitude}`;

	request({ url: url, json: true }, (err, res) => {
		if (err) callback("Unable to connect to the weather api.", undefined);
		else {
			callback(undefined, {
				place: res.body.location.name,
				description: res.body.current.weather_descriptions[0],
				temperature: res.body.current.temperature,
				feels_like: res.body.current.feelslike,
			});
		}
	});
};

module.exports = forecast;
