document.addEventListener('DOMContentLoaded', () => {
	let searchField = document.getElementById('search-bar');
	let searchBtn = document.getElementById('btn-search');
	let cityHeading = document.getElementById('city');

	let weather = {
		api: '154ad2cbe7980f93e5148a9d8289e47d',
		fetchWeatherData: async function (city) {
			const response = await fetch(
				'https://api.openweathermap.org/data/2.5/weather?q=' +
					city +
					'&units=metric&appid=' +
					this.api
			);
			const data = await response.json();
			return data;
		},
	};

	function searchButtonFunctionality() {
		searchBtn.addEventListener('click', getWeatherData);
		addEventListener('keypress', (e) => {
			if (e.charCode == 13) {
				getWeatherData();
			}
		});
	}

	function getWeatherData() {
		let temp, tempMax, tempMin, feelsLike, description, wind;
		temp = document.querySelector('.temp');
		tempMax = document.querySelector('.temp-max');
		tempMin = document.querySelector('.temp-min');

		feelsLike = document.querySelector('.feels-like');

		wind = document.querySelector('.wind');
		description = document.querySelector('.description');
		icon = document.querySelector('.icon');
		weatherIconContainer = document.getElementById('sun');
		temperatureWrapper = document.getElementById('temperature');

		let weatherData = weather
			.fetchWeatherData(searchField.value)
			.then((data) => {
				wind = data.wind.speed;
				weatherIconContainer.classList.remove('hidden');
				temperatureWrapper.classList.remove('hidden');

				// INNER TEXT OF THE ELEMENTS
				cityHeading.innerText = data.name;
				temp.innerText = `Current temperature is: ${Math.round(
					data.main.temp
				)} °C`;
				tempMax.innerText = `Max. Temp: ${Math.round(data.main.temp_max)} °C `;
				tempMin.innerText = `Min. Temp: ${Math.round(data.main.temp_min)} °C`;
				feelsLike.innerText = `Feels like: ${Math.round(
					data.main.feels_like
				)} °C`;
				description.innerText = data.weather[0].description;
				wind.innerText = `Wind speed: ${data.win} km/h`;
				icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
			});
	}

	searchButtonFunctionality();
});
