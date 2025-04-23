import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { forecastQueryFunc } from "@/lib/hooks/query";
import { useDebounce } from "../hooks/debounce";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface HourData {
  time: string;
  wind_degree: number;
  wind_speed: number;
}

interface ForecastDay {
  hour: HourData[];
}

interface WeatherAPIResponse {
  forecast: {
    forecastday: ForecastDay[];
  };
}

interface WindDataPoint {
  time: string;
  windDegree: number;
}

export default function WindChart() {
  const [windData, setWindData] = useState<WindDataPoint[]>([]);
  const selectedLocation = useSelector(
    (state: RootState) => state.search.search
  );
  const city = selectedLocation?.name || "";
  const country = selectedLocation?.country || "";
  const debouncedCity = useDebounce(city, 500);
  const debouncedCountry = useDebounce(country, 500);

  const {
    data: weatherData,
    isLoading,
    isError,
  } = forecastQueryFunc<WeatherAPIResponse>(debouncedCity, debouncedCountry);

  useEffect(() => {
    if (
      weatherData &&
      weatherData.forecast &&
      weatherData.forecast.forecastday.length > 0
    ) {
      const formattedData = weatherData.forecast.forecastday[0].hour.map(
        (hourData): WindDataPoint => ({
          time: hourData.time,
          windDegree: hourData.wind_degree,
        })
      );
      setWindData(formattedData);
    }
  }, [weatherData]);


  if (isLoading) return <div className="text-white">Loading data...</div>;
  if (isError) return <div className="text-red-500">Error loading data</div>;

  return (
    <div className="col-span-12 row-span-6 w-full h-80 mt-6 lg:col-span-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={windData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="windDegree"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
