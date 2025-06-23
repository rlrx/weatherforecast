export function farenheitConverter(farenheitValue) {
	const numValue = parseFloat(farenheitValue);
	const celsius = (numValue - 32) * (5 / 9);
	return celsius.toFixed(0);
}
