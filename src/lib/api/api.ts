import axios from "axios";
import { searchSchema, SearchResult } from "../schema/searchSchema";
import { forecastSchema, ForecastWeather } from "../schema/forecastSchema";
import { currentSchema, CurrentWeather } from "../schema/currentSchema";

const BASE_URL = "https://api.weatherapi.com/v1"; // changed to https

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const searchAPI = async (location: string): Promise<SearchResult> => {
  if (!location.trim()) throw new Error("Location cannot be empty");

  const response = await axios.get(`${BASE_URL}/search.json`, {
    params: {
      key: API_KEY,
      q: location,
    },
  });

  return searchSchema.parse(response.data);
};

export const currentAPI = async (
  location: string,
  country: string
): Promise<CurrentWeather> => {
  const q = `${location},${country}`;

  const response = await axios.get(`${BASE_URL}/current.json`, {
    params: {
      key: API_KEY,
      q,
    },
  });

  return currentSchema.parse(response.data);
};

export const forecastAPI = async (
  location: string,
  region: string
): Promise<ForecastWeather> => {
  const q = `${location},${region}`;

  const response = await axios.get(`${BASE_URL}/forecast.json`, {
    params: {
      key: API_KEY,
      q,
    },
  });

  return forecastSchema.parse(response.data);
};
