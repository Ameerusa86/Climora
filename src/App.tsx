import AdditionalInfo from "./components/cards/AdditionalInfo";
import CurrentWeather from "./components/cards/CurrentWeather";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";

function App() {
  // const { data } = useQuery({
  //   queryKey: ["weather"],
  //   queryFn: () => getWeather(10, 25), // Example coordinates for New York City
  // });

  return (
    <main className="min-h-screen text-slate-50">
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
              <span className="font-semibold text-cyan-300">10.0° N</span>,
              <span className="font-semibold text-orange-300"> 25.0° E</span>.
              Modify source later to plug in real locations.
            </p>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <CurrentWeather coords={{ lat: 10, lon: 25 }} />
          <AdditionalInfo coords={{ lat: 10, lon: 25 }} />
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <HourlyForecast coords={{ lat: 10, lon: 25 }} />
          <DailyForecast coords={{ lat: 10, lon: 25 }} />
        </section>

        <footer className="mt-2 flex items-center justify-between text-[0.7rem] text-slate-400/80">
          <p>
            Powered by vivid gradients, glassmorphism, and your weather backend.
          </p>
          <p className="hidden sm:block">Climora · Experimental UI Surface</p>
        </footer>
      </div>
    </main>
  );
}

export default App;
