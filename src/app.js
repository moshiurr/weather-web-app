//first pull out core modules
const path = require("path");

// then pull out npm modules
const express = require("express"); // this is a funiton itself

const hbs = require("hbs");

require("dotenv").config();

const port = process.env.PORT || 3000;

//requiring the function for collecting the weather data
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express(); // we just call the express constructor with out any param

const publicDir = path.join(__dirname, "../public");

//the default path/folder for hbs is 'views' in the root express static directory
app.set("view engine", "hbs");

//this is our custom directory for the views
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.set("views", viewsPath); //setting the custom path for views

//registering the handle bar paritals
hbs.registerPartials(partialPath);

//this for serving static html file using path module
app.use(express.static(publicDir));

// get() takes two params, first route, second a function for what to do when its called

app.get("/", (req, res) => {
	//res.send('<h1>Weather</h1>');//this route will never gonna execute, because express.static() is overriding the call

	//render can render any hbs file to the screen if no html file is found
	res.render("index", {
		title: "Weather App",
		name: "Alif",
		footerName: "Moshiur Rahman",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		message: "Do you need any help? feel free to reach out",
		title: "Help",
		footerName: "Moshiur Rahman",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		footerName: "Moshiur Rahman",
	});
});

app.get("/weather", (req, res) => {
	const address = req.query.address;
	if (!address) {
		return res.send({
			error: "Address not provided",
		});
	}

	geocode(address, (err, { latitude, longitude, location } = {}) => {
		if (err) {
			return res.send({
				error: err,
			});
		}

		forecast(
			latitude,
			longitude,
			(error, { description, temperature, feels_like } = {}) => {
				if (error) return res.send({ error });
				const ans = {
					location: location,
					weather: description,
					temperature: temperature,
					feels_like: feels_like,
					address: address,
				};

				res.send(ans);
			}
		);
	});
});

app.get("/help/*", (req, res) => {
	res.render("error", {
		title: "404",
		error_message: "Help article not found",
		footerName: "Moshiur Rahman",
	});
});

//for 404 error, it should be always at the bottom
app.get("*", (req, res) => {
	res.render("error", {
		title: "404",
		error_message: "Page not found",
		footerName: "Moshiur Rahman",
	});
});

app.listen(port, () => {
	console.log("Server is up and running on port " + port);
});
