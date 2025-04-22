import { forecastQueryFunc } from "@/lib/hooks/query";
import React from "react";
import { useDebounce } from "../hooks/debounce";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface MaxandMinResponse {
  location: {
    name: string;
    country: string;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      date_epoch: number;
      day: {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        daily_chance_of_snow: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
      };
    }>;
  };
}


const today = new Date();
const formattedToday = today.toISOString().split("T")[0];

function Maxandmintemp() {
  const selectedLocation = useSelector(
    (state: RootState) => state.search.search
  );
  const unit = useSelector((state: RootState) => state.search.unit);

  const city = selectedLocation?.name || "";
  const country = selectedLocation?.country || "";

  const debouncedCity = useDebounce(city, 500);
  const debouncedCountry = useDebounce(country, 500);

  const {
    data: weatherData,
    isLoading,
    isError,
  } = forecastQueryFunc<MaxandMinResponse>(debouncedCity, debouncedCountry);

  if (isLoading)
    return <div className="text-white">Loading forecast data...</div>;

  if (isError)
    return <div className="text-red-500">Error fetching forecast data.</div>;

  const todayForecast = weatherData?.forecast?.forecastday.find(
    (day) => day.date === formattedToday
  );

  if (!todayForecast)
    return (
      <div className="text-gray-400">No forecast available for today.</div>
    );

  const high =
    unit === "c"
      ? todayForecast?.day?.maxtemp_c
      : todayForecast?.day?.maxtemp_f;

  const low =
    unit === "c"
      ? todayForecast?.day?.mintemp_c
      : todayForecast?.day?.mintemp_f;


  return (
    <div className="text-white mt-4 flex gap-x-5">
      <p>
        <strong>High:</strong> {high}
      </p>
      <p>
        <strong>Low:</strong> {low}
      </p>
    </div>
  );
}

export default Maxandmintemp;
