import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

type Props = {
  coords: Coords;
};

export default function HourlyForecast({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });
  return (
    <Card
      title="Hourly Ribbon • 48h"
      childrenClassName="flex gap-6 overflow-x-scroll scroll-track-hidden"
    >
      {data.hourly.map((hour) => (
        <div
          key={hour.dt}
          className="flex flex-col 2xl:justify-between gap-2 items-center px-3 py-2 rounded-xl bg-white/5 border border-cyan-400/10 min-w-[5.2rem] hover:border-cyan-300/60 hover:bg-white/10 transition-colors"
        >
          <p className="whitespace-nowrap text-[0.7rem] uppercase tracking-[0.18em] text-slate-400/90">
            {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
          <WeatherIcon className="2xl:size-10" src={hour.weather[0].icon} />
          <p className="2xl:scale-110 font-semibold">
            {Math.round(hour.temp)}°F
          </p>
        </div>
      ))}
    </Card>
  );
}
