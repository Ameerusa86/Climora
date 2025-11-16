import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAirPollution } from "../api";
import type { Coords } from "../types";

interface AirQualityDrawerProps {
  coords: Coords;
}

const aqiLabel = (aqi: number) => {
  switch (aqi) {
    case 1:
      return "Good";
    case 2:
      return "Fair";
    case 3:
      return "Moderate";
    case 4:
      return "Poor";
    case 5:
      return "Very Poor";
    default:
      return "Unknown";
  }
};

export default function AirQualityDrawer({ coords }: AirQualityDrawerProps) {
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["airPollution", coords.lat, coords.lon],
    queryFn: () => getAirPollution({ lat: coords.lat, lon: coords.lon }),
    enabled: open,
  });

  const record = data?.list?.[0];
  const components = record?.components;
  const aqi = record?.main.aqi;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed right-4 bottom-4 z-1001 rounded-full bg-cyan-500 text-slate-900 px-4 py-2 text-xs sm:text-sm font-semibold shadow-lg hover:bg-cyan-400 transition-colors"
      >
        Air quality
      </button>

      <div
        className={`pointer-events-none fixed inset-y-0 right-0 z-1000 flex justify-end transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pointer-events-auto w-full max-w-xs sm:max-w-sm bg-slate-950/95 border-l border-cyan-500/30 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-cyan-300/80">
                Air quality
              </p>
              {aqi && (
                <p className="text-sm text-slate-200">
                  Index:{" "}
                  <span className="font-semibold text-cyan-300">{aqi}</span>{" "}
                  <span className="text-xs text-slate-400">
                    ({aqiLabel(aqi)})
                  </span>
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-white/10 px-2 py-1 text-xs text-slate-200 hover:bg-white/5"
            >
              Close
            </button>
          </div>

          <div className="px-4 py-4 text-xs text-slate-300 space-y-4">
            {isLoading && <p>Loading air quality…</p>}
            {isError && (
              <p className="text-red-400">Failed to load air data.</p>
            )}

            {!isLoading && !isError && components && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-[0.7rem]">
                  <Metric
                    label="PM2.5"
                    value={components.pm2_5}
                    unit="µg/m³"
                    highlight
                  />
                  <Metric
                    label="PM10"
                    value={components.pm10}
                    unit="µg/m³"
                    highlight
                  />
                  <Metric label="O₃" value={components.o3} unit="µg/m³" />
                  <Metric label="NO₂" value={components.no2} unit="µg/m³" />
                  <Metric label="SO₂" value={components.so2} unit="µg/m³" />
                  <Metric label="CO" value={components.co} unit="µg/m³" />
                  <Metric label="NH₃" value={components.nh3} unit="µg/m³" />
                  <Metric label="NO" value={components.no} unit="µg/m³" />
                </div>

                <p className="text-[0.68rem] text-slate-400/80 leading-relaxed">
                  PM2.5 and PM10 are the most critical health indicators. Lower
                  values are better. Sensitive groups (kids, elderly, asthma)
                  should avoid prolonged outdoor exposure when these are
                  elevated.
                </p>
              </div>
            )}

            {!isLoading && !isError && !components && (
              <p>No air quality data available for this location.</p>
            )}
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-999 bg-black/40 backdrop-blur-md"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}

interface MetricProps {
  label: string;
  value: number;
  unit: string;
  highlight?: boolean;
}

function Metric({ label, value, unit, highlight }: MetricProps) {
  return (
    <div
      className={`rounded-lg border px-2 py-1.5 flex flex-col gap-0.5 ${
        highlight
          ? "border-cyan-400/60 bg-cyan-500/5"
          : "border-white/5 bg-white/0"
      }`}
    >
      <span className="text-[0.62rem] uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <span className="text-[0.8rem] font-semibold text-slate-50">
        {value.toFixed(1)}{" "}
        <span className="text-slate-400 text-[0.6rem]">{unit}</span>
      </span>
    </div>
  );
}
