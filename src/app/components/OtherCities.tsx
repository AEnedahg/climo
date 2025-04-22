import React, { useEffect, useState } from "react";
import axios from "axios";

interface City {
  location: {
    name: string;
    country: string;
  };
  current: {
    feelslike_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

const cityList = ["Texas", "Dubai", "China",];

function OtherCities() {
  const [citiesData, setCitiesData] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const responses = await Promise.all(
          cityList.map((city) =>
            axios.get(`https://api.weatherapi.com/v1/current.json`, {
              params: {
                key: process.env.NEXT_PUBLIC_WEATHER_API_KEY, // or your key directly
                q: city,
              },
            })
          )
        );
        const data = responses.map((res) => res.data);
        setCitiesData(data);
        setLoading(false);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load city data.");
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="text-white p-4">
      <h2 className="text-2xl mb-4">Other Cities</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {citiesData.map((city, index) => (
          <div
            key={index}
            className="bg-[#0E1421] p-4 rounded-lg shadow-md flex items-center space-x-4
            lg:col-span-3
            "
          >
            <img
              src={`https:${city.current.condition.icon}`}
              alt={city.current.condition.text}
              className="w-12 h-12"
            />
            <div>
              <p className="font-semibold">{city.location.name}</p>
              <p className="text-sm">
                Feels like: {city.current.feelslike_c}°C
              </p>
              <p className="text-xs">{city.current.condition.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OtherCities;
