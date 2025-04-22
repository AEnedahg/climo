import { currentQueryFunc } from "@/lib/hooks/query";
import React from "react";
import { useDebounce } from "../hooks/debounce";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import Image from "next/image";


interface WeatherAPIResponse {
  current: {
    feelslike_c: number;
    feelslike_f: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  location: {
    name: string;
    country: string;
  };
}

function CandFValue() {

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
  } = currentQueryFunc<WeatherAPIResponse>(debouncedCity, debouncedCountry);


  const feelsLikeTemp =
    unit === "c"
      ? weatherData?.current.feelslike_c
      : weatherData?.current.feelslike_f;

  const conditionText = weatherData?.current.condition.text || "No data";
  const conditionIcon = weatherData?.current.condition.icon || "";

  if (isLoading)
    return <div className="text-white">Loading weather data...</div>;
  if (isError)
    return <div className="text-red-500">Error loading weather data</div>;

  return (
    <div className="mt-5">
      <h1 className="text-6xl text-white">
        {feelsLikeTemp}°{unit.toUpperCase()}
      </h1>
    </div>
  );
}

export default CandFValue;

// FeelsLike component with conditional rendering
interface FeelsLikeProps {
  feelsLikeTemp: number | undefined;
  text: string;
}

export const FeelsLike: React.FC<FeelsLikeProps> = ({
  feelsLikeTemp,
  text,
}) => {
  if (feelsLikeTemp === undefined) {
    return <div className="text-red-500">Temperature data not available</div>;
  }

  return (
    <div>
      <h2 className="text-2xl text-white">{text}</h2>
      <h4 className="text-xl text-white">Feels like {feelsLikeTemp}°</h4>
    </div>
  );
};

interface WeatherIconProps {
  icon: string;
}

export const Icon: React.FC<WeatherIconProps> = ({ icon }) => {
  // If the icon path starts with '/', prepend 'https:'
  const iconUrl = icon.startsWith("https") ? icon : `https:${icon}`;

  return (
    <div>
      <Image src={iconUrl} alt="Weather Icon" width={165} height={165} />
    </div>
  );
};