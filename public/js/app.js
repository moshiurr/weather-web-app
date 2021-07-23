console.log("Client side javascript is loaded");

//fetching the data from the backend

const weatherForm = document.querySelector("form");
const textField = document.querySelector("input");
const p1 = document.querySelector("#p1");
const p2 = document.querySelector("#p2");

weatherForm.addEventListener("submit", e => {
	e.preventDefault();
	const loca = textField.value;

	p1.textContent = "Loading...";
	p2.textContent = "";

	fetch("/weather?address=" + loca).then(response => {
		response.json().then(data => {
			if (data.error) p1.textContent = data.error;
			else {
				p1.textContent = data.location;
				p2.textContent =
					data.weather + "  " + data.temperature + "  " + data.feels_like;
			}
		});
	});
});
