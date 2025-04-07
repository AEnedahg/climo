import axios from "axios";
import { z } from "zod";
import { searchSchema } from "../schema/searchSchema";
import { forecastSchema } from "../schema/forecastSchema";
import { currentSchema } from "../schema/currentSchema";

const BASE_URL = "http://api.weatherapi.com/v1/";
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

const weatherClient = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

const validateLocation = (location: string) => {
  if (!location) {
    console.error("Invalid location:", location);
  } else if (location.trim() === "") {
    searchAPI(location);
  } else {
    searchAPI(location)
  }
};

export const searchAPI = async (location: string) => {
  validateLocation(location);

  try {
    const res = await weatherClient.get("/search.json", {
      params: { q: location },
    });
    console.log("Search API response:", res.data);
    return searchSchema.parse(res.data);
  } catch (error) {
    console.error("Search API error:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response);
    }
    throw new Error("Failed to fetch search results.");
  }
};

export const currentAPI = async (location: string) => {
  validateLocation(location);

  try {
    const res = await weatherClient.get("/current.json", {
      params: { q: location },
    });
    return currentSchema.parse(res.data);
  } catch (error) {
    console.error("Current API error:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response);
    }
    throw new Error("Failed to fetch current weather data.");
  }
};

export const forcastAPI = async (location: string, days: number) => {
  validateLocation(location);

  try {
    const res = await weatherClient.get("/forecast.json", {
      params: { q: location, days },
    });
    return forecastSchema.parse(res.data);
  } catch (error) {
    console.error("Forecast API error:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response);
    }
    throw new Error("Failed to fetch forecast data.");
  }
};
