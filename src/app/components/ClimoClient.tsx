"use client";
import React, { useEffect } from "react";
import Search from "./features/Search";
import CityName from "./CityName";
import CandF from "./CandF";
import Day from "./Day";
import CandFValue, { FeelsLike } from "./CandFValue";
import Maxandmintemp from "./Maxandmintemp";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { useDebounce } from "../hooks/debounce";
import { currentQueryFunc } from "@/lib/hooks/query";
import { setFeelsLike } from "./features/searchSlice";
import { Icon } from "./CandFValue";
import Hourly from './Hourly';
import WindChart from "./WindChart";
import OtherCities from "./OtherCities";
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

export default function ClimoClient() {
  const dispatch = useDispatch();
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
  } = currentQueryFunc<WeatherAPIResponse>(debouncedCity, debouncedCountry);

  const conditionText = weatherData?.current.condition.text || "";
  const conditionIcon = weatherData?.current.condition.icon
  ? `https:${weatherData.current.condition.icon}`
  : null;
  useEffect(() => {
    if (weatherData) {
      const feelsLikeTemp =
        unit === "c"
          ? weatherData.current.feelslike_c
          : weatherData.current.feelslike_f;

      if (feelsLikeTemp !== undefined && feelsLikeTemp !== null) {
        dispatch(setFeelsLike(feelsLikeTemp));
      }
    }
  }, [weatherData, unit, dispatch]);

  // Get the feelsLikeTemp from Redux
  const feelsLikeTemp = useSelector(
    (state: RootState) => state.search.feelsLike
  );

  return (
    <div className="bg-[#060C1A] h-screen px-4 lg:px-11 py-6 w-screen max-w-[1440px]">
      <Search />
      <div className="grid grid-cols-12 grid-rows-1 mt-6 gap-4">
        {/* Left Side: Weather Info */}
        <div className="mt-4 lg:mt-16 col-span-12 lg:col-span-7 bg-[#0E1421] rounded-lg p-4 flex flex-col items-center">
          <header className="flex justify-between w-full">
            <CityName />
            <CandF />
          </header>
          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-center sm:items-start text-center sm:text-start">
            <div className="flex flex-col">
              <Day />
              <Icon iconUrl={weatherData?.current.condition.icon} />
              <CandFValue />
              <Maxandmintemp />
            </div>
            <div>
              {conditionIcon && <Icon iconUrl={conditionIcon} />}
              <FeelsLike feelsLikeTemp={feelsLikeTemp} text={conditionText} />
            </div>
          </div>
          <Hourly />
        </div>

        {/* Right Side: Wind Chart */}
        <div className="col-span-12 lg:col-span-5 bg-[#0E1421] rounded-lg p-4 h-fit mt-16">
          <WindChart />
          <OtherCities />
        </div>
      </div>
    </div>
  );
}
