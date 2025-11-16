import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAirPollution } from "../api";
import type { Coords } from "../types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

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
        <div className="pointer-events-auto w-full max-w-xs sm:max-w-sm bg-slate-900/95 border-l border-slate-800/80 shadow-2xl">
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
              <TooltipProvider delayDuration={150}>
                <div className="space-y-3 text-[0.7rem]">
                  <PollutantRow
                    label="CO"
                    value={components.co}
                    unit="µg/m³"
                    min={0}
                    max={15400}
                    description="Carbon monoxide from fuel burning. High levels reduce oxygen delivery in the body."
                  />
                  <PollutantRow
                    label="NO"
                    value={components.no}
                    unit="µg/m³"
                    min={0}
                    max={80}
                    description="Nitric oxide, a short-lived gas linked to combustion and traffic emissions."
                  />
                  <PollutantRow
                    label="NO₂"
                    value={components.no2}
                    unit="µg/m³"
                    min={0}
                    max={200}
                    description="Nitrogen dioxide irritates airways and worsens asthma at elevated levels."
                  />
                  <PollutantRow
                    label="O₃"
                    value={components.o3}
                    unit="µg/m³"
                    min={0}
                    max={180}
                    description="Ground‑level ozone forms from sunlight + pollution and can reduce lung function."
                  />
                  <PollutantRow
                    label="SO₂"
                    value={components.so2}
                    unit="µg/m³"
                    min={0}
                    max={350}
                    description="Sulfur dioxide from burning fuels; can trigger breathing difficulties."
                  />
                  <PollutantRow
                    label="PM2.5"
                    value={components.pm2_5}
                    unit="µg/m³"
                    min={0}
                    max={75}
                    highlight
                    description="Fine particles that reach deep into the lungs and bloodstream. Most important for health."
                  />
                  <PollutantRow
                    label="PM10"
                    value={components.pm10}
                    unit="µg/m³"
                    min={0}
                    max={150}
                    highlight
                    description="Coarser dust and particles that irritate eyes, nose, and throat."
                  />
                  <PollutantRow
                    label="NH₃"
                    value={components.nh3}
                    unit="µg/m³"
                    min={0}
                    max={200}
                    description="Ammonia, mainly from agriculture, contributing to particle formation."
                  />

                  <p className="text-[0.68rem] text-slate-400/80 leading-relaxed">
                    PM2.5 and PM10 are the most critical health indicators.
                    Lower values are better. Sensitive groups (kids, elderly,
                    asthma) should avoid prolonged outdoor exposure when these
                    are elevated.
                  </p>
                </div>
              </TooltipProvider>
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

interface PollutantRowProps {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  description: string;
  highlight?: boolean;
}

function PollutantRow({
  label,
  value,
  unit,
  min,
  max,
  description,
  highlight,
}: PollutantRowProps) {
  const ratio = Math.max(0, Math.min(1, value / max));
  const sliderPos = `${ratio * 100}%`;

  const bandLabel =
    value <= max * 0.2
      ? "Good"
      : value <= max * 0.4
      ? "Fair"
      : value <= max * 0.6
      ? "Moderate"
      : value <= max * 0.8
      ? "Poor"
      : "Very Poor";

  return (
    <div
      className={`rounded-2xl bg-slate-800/70 border border-slate-700/80 px-3 py-2.5 space-y-2 shadow-sm ${
        highlight ? "ring-1 ring-cyan-400/60" : ""
      }`}
    >
      <div className="flex items-center justify-between text-[0.7rem] font-medium text-slate-100">
        <div className="flex items-center gap-1.5">
          <span>{label}</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="h-4 w-4 rounded-full border border-slate-500/80 bg-slate-900/60 text-[0.6rem] flex items-center justify-center text-slate-300 hover:border-cyan-400/80 hover:text-cyan-200"
              >
                i
              </button>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-xs leading-relaxed">
              {description}
            </TooltipContent>
          </Tooltip>
        </div>
        <span>
          {value.toFixed(2)}
          <span className="ml-1 text-[0.6rem] text-slate-400">{unit}</span>
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="relative h-1.5 rounded-full bg-slate-700/80 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-linear-to-r from-emerald-400 via-yellow-300 to-rose-400"
            style={{ width: sliderPos }}
          />
        </div>
        <div className="flex justify-between text-[0.6rem] text-slate-400">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>

      <div className="flex items-center gap-1 text-[0.6rem] mt-1">
        {(["Good", "Fair", "Moderate", "Poor", "Very Poor"] as const).map(
          (labelBand) => (
            <span
              key={labelBand}
              className={`px-1.5 py-0.5 rounded-full border text-[0.58rem] capitalize ${
                labelBand === bandLabel
                  ? "bg-emerald-400 text-slate-900 border-emerald-300"
                  : "border-slate-600/80 text-slate-400"
              }`}
            >
              {labelBand}
            </span>
          )
        )}
      </div>
    </div>
  );
}
