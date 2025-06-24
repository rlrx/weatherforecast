import {
	getFormattedDate,
	getForecastDate,
	getDayFromDate,
} from "../utils/dateUtils";
import { farenheitConverter } from "../utils/farenheitCoverter";
class WeatherService {
	static async getWeatherData(city) {
		const currentDate = getFormattedDate();
		const forecastDate = getForecastDate();
		console.log(currentDate);
		try {
			const response = await fetch(
				`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${currentDate}/${forecastDate}?key=PZ9A72JXD948SMZUXA73DUS8L`
			);
			if (!response.ok) {
				throw new Error(`Weather request failed: ${response.status}`);
			}
			return await response.json();
		} catch (error) {
			console.error("Error fetching weather:", error);
			throw error;
		}
	}

	static processWeatherData(jsonData) {
		return {
			icon: jsonData.days[0].icon,
			location: `${jsonData.resolvedAddress}`,
			temp: `${farenheitConverter(jsonData.days[0].temp)}°C`,
			description: `${jsonData.days[0].description}`,
			feelsLike: `Feels like: ${farenheitConverter(
				jsonData.days[0].feelslike
			)}°C`,
			tempMax: `H: ${farenheitConverter(jsonData.days[0].tempmax)}°C | `,
			tempMin: `L: ${farenheitConverter(jsonData.days[0].tempmin)}°C`,
		};
	}

	static processForecastWeatherData(jsonData) {
		const forecastInfo = [];

		for (let i = 1; i < 8; i++) {
			forecastInfo.push({
				day: `${getDayFromDate(jsonData.days[i].datetime)}`,
				description: `${jsonData.days[i].description}`,
				icon: `${jsonData.days[i].icon}`,
				tempMax: `${farenheitConverter(jsonData.days[i].tempmax)}°C | `,
				tempMin: `${farenheitConverter(jsonData.days[i].tempmin)}°C`,
			});
		}
		console.log(forecastInfo);
		return forecastInfo;
	}
}
export default WeatherService;
