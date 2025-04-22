import React from 'react'
import { useDebounce } from '../hooks/debounce';
import { useSelector } from 'react-redux';
import { RootState } from "../../store";
import { forecastQueryFunc } from "@/lib/hooks/query";

interface AstroResponse {
  forecast: {
    forecastday: Array<{
      astro: {
        sunrise: string;
        sunset: string;
        moonrise: string;
        moonset: string;
      };
    }>;
  };
}

function Astro() {
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
  } = forecastQueryFunc<AstroResponse>(debouncedCity, debouncedCountry);

  if (isLoading)
    return <div className="text-white">Loading forecast data...</div>;

  if (isError)
    return <div className="text-red-500">Error fetching forecast data.</div>;
  
  const sunrise = weatherData?.forecast?.forecastday[0]?.astro.sunrise;
  const sunset = weatherData?.forecast?.forecastday[0]?.astro.sunset;
  const moonrise = weatherData?.forecast?.forecastday[0]?.astro.moonrise;
  const moonset = weatherData?.forecast?.forecastday[0]?.astro.moonset;

  return (
    <div className="bg-[#14203A] flex flex-col lg:flex-row  lg:justify-between p-7
     col-span-12 row-span-8 *:flex *:flex-col *:gap-y-4 *:items-center rounded-lg
    lg:row-span-3 
    
    ">
      <div>
        <h3 className="text-gray-400 text-2xl">Sunrise</h3>
        <h1 className="text-white text-3xl">{sunrise}</h1>
      </div>
      <div>
        <h3 className="text-gray-400 text-2xl">Sunset</h3>
        <h1 className="text-white text-3xl">{sunset}</h1>
      </div>
      <div>
        <h3 className="text-gray-400 text-2xl">Moonrise</h3>
        <h1 className="text-white text-3xl">{moonrise}</h1>
      </div>
      <div>
        <h3 className="text-gray-400 text-2xl">Moonset</h3>
        <h1 className="text-white text-3xl">{moonset}</h1>
      </div>
    </div>
  );
}

export default Astro