const request = require("postman-request");

const geocode = (address, callback) => {
	const url =
		"https://api.mapbox.com/geocoding/v5/mapbox.places/" +
		encodeURIComponent(address) +
		".json?access_token=" +
		process.env.MAP_BOX_KEY +
		"&limit=1";

	request({ url: url, json: true }, (err, res) => {
		if (err) callback("Unable to connect to location services", undefined);
		else if (!res.body.features[0] || res.body.features === 0)
			callback("Unable to find the places. Try another search.", undefined);
		else {
			const lat = res.body.features[0].center[1];
			const lon = res.body.features[0].center[0];
			callback(undefined, {
				latitude: lat,
				longitude: lon,
				location: res.body.features[0].place_name,
			});
		}
	});
};

module.exports = geocode;
