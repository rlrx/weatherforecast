import WeatherService from "./weatherService";

class DomController {
	constructor() {
		this.searchBtn = document.getElementById("search-btn");
		this.locationInput = document.getElementById("location-input");
		this.currentLocation = document.querySelector(".currentLocation");
		this.weatherTodaySection = document.querySelector(
			".weatherTodaySection"
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
			this.displayWeather(processedData);
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

	displayError(message) {
		this.weatherTodaySection.innerHTML = `
        <div class="error">
          <p>${message}</p>
        </div>
      `;
	}
}

export default DomController;
