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
    <div className="flex flex-col gap-8">
      <CurrentWeather coords={{ lat: 10, lon: 25 }} />
      <HourlyForecast coords={{ lat: 10, lon: 25 }} />
      <DailyForecast coords={{ lat: 10, lon: 25 }} />
      <AdditionalInfo coords={{ lat: 10, lon: 25 }} />
    </div>
  );
}

export default App;
