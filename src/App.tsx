import { useQuery } from "@tanstack/react-query";
import { getWeather } from "./api";

function App() {
  const { data } = useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather(40.7128, -74.006), // Example coordinates for New York City
  });

  return <div>{JSON.stringify(data)}</div>;
}

export default App;
