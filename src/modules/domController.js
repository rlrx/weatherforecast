import WeatherService from "./weatherService";

class DomController {
	constructor() {
		this.searchBtn = document.getElementById("search-btn");
		this.locationInput = document.getElementById("location-input");
		this.currentLocation = document.querySelector(".currentLocation");
		this.weatherTodaySection = document.querySelector(
			".weatherTodaySection"
		);
		this.weatherForecastSection = document.querySelector(
			".weatherForecastPage"
		);
		this.searchBtn.addEventListener("click", () => this.handleSearch());
		this.locationInput.addEventListener("keypress", (e) => {
			if (e.key === "Enter") this.handleSearch();
		});
	}

	async handleSearch() {
		const location = this.locationInput.value.trim();
		if (!location) return;

		try {
			const weatherData = await WeatherService.getWeatherData(location);
			console.log(weatherData);
			const processedData =
				WeatherService.processWeatherData(weatherData);
			const processedForecastData =
				WeatherService.processForecastWeatherData(weatherData);
			this.displayWeather(processedData);
			this.displayForecastWeather(processedForecastData);
		} catch (error) {
			this.displayError(error.message);
		}
	}

	displayWeather(data) {
		console.log(data);
		this.currentLocation.textContent = `${data.location}`;
		this.weatherTodaySection.innerHTML = `
			<h2 class="weather-card">${data.temp}</h2>
			<h5>${data.description}</h5>
			<h5>${data.feelsLike}</h5>
			<h5>${data.tempMax}${data.tempMin}</h5>
        `;
	}

	// forecastInfo is array of objects where each object is forecasted day info
	displayForecastWeather(forecastInfo) {
		// use a for loop to go through all objects in forecastInfo array
		// use DOM manipulation create a child div
		// set the innerHTML of the child div like in displayWeather
		for (let i = 0; i < 7; i++) {
			const forecastDay = document.createElement("div");
			forecastDay.classList.add("forecastDay");
			forecastDay.innerHTML = `
			<h5>${forecastInfo[i].day}</h5>
			<h5>${forecastInfo[i].icon}</h5>
			<h5>${forecastInfo[i].tempMax}${forecastInfo[i].tempMin}</h5>`;
			this.weatherForecastSection.appendChild(forecastDay);
		}
	}

	displayError(message) {
		this.weatherTodaySection.innerHTML = `
        <div class="error">
          <p>${message}</p>
        </div>
      `;
	}
}

export default DomController;
