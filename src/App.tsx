import { useEffect, useState } from "react";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import CurrentWeather from "./components/cards/CurrentWeather";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import Map from "./components/Map";
import AirQualityDrawer from "./components/AirQualityDrawer";
import type { Coords } from "./types";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
import { useQuery } from "@tanstack/react-query";
import { getGeocode, getReverseGeocode } from "./api";

function App() {
  const [coordinates, setCoords] = useState<Coords>({
    lat: 35.99,
    lon: -79.99,
  });
  const [mapType] = useState<"basic-dark" | "basic-light">("basic-dark");
  const [location, setLocation] = useState<string>("New York");
  const [cityName, setCityName] = useState<string>("New York");

  const { data } = useQuery({
    queryKey: ["geocode", location],
    queryFn: () => getGeocode(location),
    enabled: location !== "custom",
  });

  const coords: Coords =
    location === "custom" || !data || data.length === 0
      ? coordinates
      : { lat: data[0].lat, lon: data[0].lon };

  const displayLat = Number(coords.lat.toFixed(2));
  const displayLon = Number(coords.lon.toFixed(2));

  const onMapClick = (lat: number, lon: number) => {
    setCoords({ lat, lon });
    setLocation("custom");
  };

  // Sync cityName when a dropdown city is selected
  useEffect(() => {
    if (location !== "custom" && data && data.length > 0) {
      const name = data[0].name;
      if (name) setCityName(name);
    }
  }, [location, data]);

  // Reverse geocode when user clicks on the map (custom location)
  useEffect(() => {
    if (location !== "custom") return;

    const { lat, lon } = coordinates;
    getReverseGeocode({ lat, lon })
      .then((result) => {
        if (result && result.length > 0) {
          const place = result[0];
          const labelParts = [place.name, place.state, place.country].filter(
            Boolean
          );
          setCityName(labelParts.join(", "));
        } else {
          setCityName("");
        }
      })
      .catch(() => {
        setCityName("");
      });
  }, [location, coordinates.lat, coordinates.lon]);

  return (
    <main className="relative min-h-screen text-slate-50 overflow-x-hidden">
      <AirQualityDrawer coords={coords} />
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-10 lg:py-12 flex flex-col gap-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-[fade-in_0.8s_ease-out_forwards]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 border border-cyan-400/40 pill-gradient">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
              <p className="text-xs font-semibold tracking-[0.2em] uppercase">
                Live Atmosphere Engine
              </p>
            </div>
            <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Climora
              <span className="block text-base md:text-lg font-normal text-slate-300 mt-2 max-w-xl">
                Hyper-vivid weather intelligence with cinematic gradients and
                crystal-clear insights.
              </span>
            </h1>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <div className="tag-pill flex items-center gap-2">
              <span className="h-1.5 w-6 rounded-full pill-gradient" />
              <span>Nowcasting • Hourly • Daily</span>
            </div>
            <p className="text-xs text-slate-300/80 max-w-xs text-left md:text-right">
              Coordinates locked on{" "}
              <span className="font-semibold text-cyan-300">{displayLat}°</span>
              ,
              <span className="font-semibold text-orange-300">
                {" "}
                {displayLon}°
              </span>
              {cityName && (
                <span className="ml-1 text-slate-200/90">
                  in{" "}
                  <span className="font-semibold text-cyan-200">
                    {cityName}
                  </span>
                </span>
              )}
            </p>
          </div>
        </header>

        <LocationDropdown location={location} setLocation={setLocation} />

        <div className="w-full rounded-2xl overflow-hidden">
          <Map coords={coords} onMapClick={onMapClick} mapType={mapType} />
        </div>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <CurrentWeather coords={coords} />
          <AdditionalInfo coords={coords} />
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <HourlyForecast coords={coords} />
          <DailyForecast coords={coords} />
        </section>

        <footer className="mt-2 flex items-center justify-between text-[0.7rem] text-slate-400/80">
          <p>Created by Ameer Hasan.</p>
          <p className="hidden sm:block">
            Climora · Your favorite weather companion
          </p>
        </footer>
      </div>
    </main>
  );
}

export default App;
