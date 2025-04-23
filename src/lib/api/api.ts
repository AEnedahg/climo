import axios from "axios";
import { searchSchema, SearchResult } from "../schema/searchSchema";
import { forecastSchema, ForecastWeather } from "../schema/forecastSchema";
import { currentSchema, CurrentWeather } from "../schema/currentSchema";

const BASE_URL = "http://api.weatherapi.com/v1/";
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

const weatherClient = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export const searchAPI = async (
  location: string,
): Promise<SearchResult> => {
  const q = `${location}`;

  if (!location.trim()) throw new Error("Location cannot be empty");

  const response = await weatherClient.get("search.json", {
    params: { q },
  });

  return searchSchema.parse(response.data);
};

export const currentAPI = async (
  location: string,
  country: string
): Promise<CurrentWeather> => {
  const q = `${location},${country}`;

  const response = await weatherClient.get("current.json", {
    params: { q },
  });

  return currentSchema.parse(response.data);
};

export const forecastAPI = async (
  location: string,
  region: string,
): Promise<ForecastWeather> => {
  const q = `${location},${region}`;

  const response = await weatherClient.get("forecast.json", {
    params: { q, dt: location },
  });

  return forecastSchema.parse(response.data);
};
