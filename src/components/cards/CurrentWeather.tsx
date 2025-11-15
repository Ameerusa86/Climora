import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

type Props = {
  coords: Coords;
};

export default function CurrentWeather({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });
  return (
    <Card
      title="Current Atmosphere Snapshot"
      className="md:pb-6"
      childrenClassName="flex flex-col items-center gap-8 2xl:justify-between"
    >
      <div className="flex flex-col gap-3 items-center">
        <div className="flex items-baseline gap-3">
          <span className="text-[0.8rem] uppercase tracking-[0.25em] text-slate-300/80">
            Now
          </span>
          <p className="text-4xl md:text-6xl font-semibold text-center drop-shadow-[0_0_18px_rgba(56,189,248,0.65)]">
            {Math.round(data.current.temp)}°F
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-black/40 px-4 py-2 border border-cyan-400/40 flex items-center gap-3">
            <WeatherIcon
              src={data.current.weather[0].icon}
              className="size-10 md:size-12"
            />
            <div className="flex flex-col">
              <span className="text-xs text-slate-300/80">Condition</span>
              <span className="capitalize text-base md:text-lg font-medium">
                {data.current.weather[0].description}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 items-center text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400/80">
          Local Time
        </p>
        <h3 className="text-2xl md:text-3xl font-semibold">
          {new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: data.timezone,
          }).format(new Date(data.current.dt * 1000))}
        </h3>
        <p className="text-[0.7rem] text-slate-400/80 max-w-xs">
          Synced with{" "}
          <span className="font-semibold text-cyan-300">{data.timezone}</span>,
          adjusted to your atmospheric reference grid.
        </p>
      </div>
      <div className="flex justify-between w-full text-xs md:text-sm mt-2">
        <div className="flex flex-col items-start gap-1">
          <p className="text-slate-400">Feels Like</p>
          <p className="font-semibold text-slate-50">
            {Math.round(data.current.feels_like)}°F
          </p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-slate-400">Humidity</p>
          <p className="font-semibold">{data.current.humidity}%</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <p className="text-slate-400">Wind</p>
          <p className="font-semibold">{data.current.wind_speed} mph</p>
        </div>
      </div>
    </Card>
  );
}
