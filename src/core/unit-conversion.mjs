export function convertTemperature(value, unit) {
  if (unit === "C") {
    return value * 9/5 + 32; // Convert Celsius to Fahrenheit
  }
  return value; // Assume Fahrenheit by default
}
