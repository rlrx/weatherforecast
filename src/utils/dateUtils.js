function getFormattedDate() {
	const date = new Date();
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

function getForecastDate() {
	const today = new Date();
	const futureDate = new Date(today);

	futureDate.setDate(today.getDate() + 7);
	const year = futureDate.getFullYear();
	const month = String(futureDate.getMonth() + 1).padStart(2, "0");
	const day = String(futureDate.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

function getDayFromDate(dateString) {
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const date = new Date(dateString);
	return days[date.getDay()];
}

export { getFormattedDate, getForecastDate, getDayFromDate };
