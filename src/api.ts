import { AirPollutionSchema } from "./schemas/airPollutionSchema";
import { GeocodeSchema } from "./schemas/GeocodeSchema";
import { weatherSchema } from "./schemas/weatherSchema";

const API_KEY = import.meta.env.VITE_API_KEY;

export async function getWeather({ lat, lon }: { lat: number; lon: number }) {
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=${API_KEY}`
  );
  const data = await res.json();
  return weatherSchema.parse(data);
}

export async function getGeocode(location: string) {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    location
  )}&limit=1&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Geocode request failed (${res.status}) for location: ${location}`
    );
  }
  const data = await res.json();
  return GeocodeSchema.parse(data);
}

export async function getReverseGeocode({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) {
  const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Reverse geocode failed (${res.status}) for ${lat},${lon}`);
  }
  const data = await res.json();
  return GeocodeSchema.parse(data);
}

export async function getAirPollution({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) {
  const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Air pollution request failed (${res.status}) for ${lat},${lon}`
    );
  }
  const data = await res.json();
  return AirPollutionSchema.parse(data);
}
