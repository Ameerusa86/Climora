import { weatherResponseSchema } from "./schemas/weatherSchema";

const API_KEY = import.meta.env.VITE_API_KEY;

export async function getWeather(lat: number, lon: number) {
  const result = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely&appid=${API_KEY}`
  );

  const data = await result.json();
  return weatherResponseSchema.parse(data);
}
