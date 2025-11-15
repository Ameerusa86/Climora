import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

type Props = {
  coords: Coords;
};

export default function DailyForecast({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });

  return (
    <Card
      title="Daily Outlook"
      childrenClassName="flex flex-col gap-3 2xl:justify-between"
    >
      {data?.daily.map((day) => (
        <div
          key={day.dt}
          className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-white/5 border border-slate-500/40 hover:border-orange-400/70 hover:bg-white/10 transition-colors"
        >
          <p className="w-10 text-xs font-semibold tracking-[0.16em] uppercase text-slate-300/95">
            {new Date(day.dt * 1000).toLocaleDateString(undefined, {
              weekday: "short",
            })}
          </p>
          <WeatherIcon src={day.weather[0].icon} />
          <p className="font-semibold text-sm">{Math.round(day.temp.day)}°F</p>
          <p className="text-xs text-slate-300/85">
            <span className="text-sky-300">{Math.round(day.temp.min)}°F</span>
            <span className="mx-1 text-slate-500/80">/</span>
            <span className="text-orange-300">
              {Math.round(day.temp.max)}°F
            </span>
          </p>
        </div>
      ))}
    </Card>
  );
}
