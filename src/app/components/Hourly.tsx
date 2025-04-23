import React from 'react'
import { forecastQueryFunc } from "@/lib/hooks/query";
import { useDebounce } from "../hooks/debounce";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Astro from "./Astro";
import Image from 'next/image';

interface HourlyResponse {
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
      hour: Array<{
        time_epoch: number;
        time: string;
        temp_c: number;
        temp_f: number;
        is_day: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
      }>;
    }>;
  };
}

function Hourly() {
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
      } = forecastQueryFunc<HourlyResponse>(debouncedCity, debouncedCountry);
    
      if (isLoading)
        return <div className="text-white">Loading forecast data...</div>;
    
      if (isError)
        return <div className="text-red-500">Error fetching forecast data.</div>;
    
      const hourlyData = weatherData?.forecast?.forecastday[0]?.hour.filter(
        (hour) => {
          const hourOfDay = new Date(hour.time).getHours(); // returns 0–23
          return hourOfDay >= 13 && hourOfDay <= 19; // 1PM to 7PM
        }
      );

    
      if (!hourlyData)
        return (
          <div className="text-gray-400">No forecast available for today.</div>
        );

  return (
    <div
      className="
          bg-gradient-to-r from-[#0E1421] via-[#1D325F] to-[#0E1421] mt-16 
          grid grid-cols-12 grid-rows-12 w-full justify-content-center
          gap-y-4 p-4 lg:grid-cols-7 lg:grid-rows-5
          "
    >
      {hourlyData?.map((hour, index) => (
        <div
          key={index}
          className="text-center col-span-12 row-span-2 
          flex flex-col items-center
          rounded-lg sm:col-span-6 w-full max-w-50 sm:max-w-50 md:col-span-4 lg:col-span-1
          mx-auto
          
        "
        >
          <p className="text-xl text-white">
            {new Date(hour.time).toLocaleTimeString([], {
              hour: "numeric",
              hour12: true,
            })}
          </p>
          <Image src={`https://${hour.condition.icon}`} alt={hour.condition.text} width={50} height={50}/>
          <p className="text-xl text-white">{hour.temp_c}°</p>
        </div>
      ))}
      <Astro />
    </div>
  );
}

export default Hourly