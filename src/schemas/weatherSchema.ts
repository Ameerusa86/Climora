import { z } from "zod";

const weatherConditionSchema = z
  .object({
    id: z.number(),
    main: z.string(),
    description: z.string(),
    icon: z.string(),
  })
  .strict();

const currentSchema = z
  .object({
    dt: z.number(),
    sunrise: z.number(),
    sunset: z.number(),
    temp: z.number(),
    feels_like: z.number(),
    pressure: z.number(),
    humidity: z.number(),
    dew_point: z.number(),
    uvi: z.number(),
    clouds: z.number(),
    visibility: z.number(),
    wind_speed: z.number(),
    wind_deg: z.number(),
    wind_gust: z.number(),
    weather: z.array(weatherConditionSchema),
  })
  .strict();

const hourlyEntrySchema = z
  .object({
    dt: z.number(),
    temp: z.number(),
    feels_like: z.number(),
    pressure: z.number(),
    humidity: z.number(),
    dew_point: z.number(),
    uvi: z.number(),
    clouds: z.number(),
    visibility: z.number(),
    wind_speed: z.number(),
    wind_deg: z.number(),
    wind_gust: z.number(),
    weather: z.array(weatherConditionSchema),
    pop: z.number(),
  })
  .strict();

const dailyTempSchema = z
  .object({
    day: z.number(),
    min: z.number(),
    max: z.number(),
    night: z.number(),
    eve: z.number(),
    morn: z.number(),
  })
  .strict();

const dailyFeelsLikeSchema = z
  .object({
    day: z.number(),
    night: z.number(),
    eve: z.number(),
    morn: z.number(),
  })
  .strict();

const dailyEntrySchema = z
  .object({
    dt: z.number(),
    sunrise: z.number(),
    sunset: z.number(),
    moonrise: z.number(),
    moonset: z.number(),
    moon_phase: z.number(),
    summary: z.string(),
    temp: dailyTempSchema,
    feels_like: dailyFeelsLikeSchema,
    pressure: z.number(),
    humidity: z.number(),
    dew_point: z.number(),
    wind_speed: z.number(),
    wind_deg: z.number(),
    wind_gust: z.number(),
    weather: z.array(weatherConditionSchema),
    clouds: z.number(),
    pop: z.number(),
    rain: z.number(),
    uvi: z.number(),
  })
  .strict();

export const weatherResponseSchema = z
  .object({
    lat: z.number(),
    lon: z.number(),
    timezone: z.string(),
    timezone_offset: z.number(),
    current: currentSchema,
    hourly: z.array(hourlyEntrySchema),
    daily: z.array(dailyEntrySchema),
  })
  .strict();
