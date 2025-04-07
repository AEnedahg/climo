"use client";
import { useState, useMemo, useEffect } from "react";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { CiSearch } from "react-icons/ci";
import { searchQueryFunc } from "@/lib/hooks/query";
import { IoLocation } from "react-icons/io5";
import { motion } from 'motion/react';
interface City {
  id: number;
  name: string;
  region: string;
  country: string;
}

export default function ClimoClient() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [unit, setUnit] = useState<"c" | "f">("c");
  const [selectedCity, setSelectedCity] = useState<string>("Lagos");
  
  useEffect(() => {
    if (search.length < 2) {
      setDebouncedSearch("");
      return;
    }
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const {
    data: cities = [] as City[],
    isLoading,
    isError,
    error,
  } = searchQueryFunc<City[]>(search);
 
  const filteredCities = useMemo(() => {
    return search
      ? cities.filter((city) =>
          city.name.toLowerCase().includes(search.toLowerCase())
        )
      : [];
  }, [search, cities]);

  if (isError) {
    return <pre className="text-white">{JSON.stringify(error, null, 2)}</pre>;
  }

  return (
    <div className="bg-[#060C1A] h-screen px-4 lg:px-11 py-6 w-screen max-w-[1440px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSelectedCity(search)
        }}
        className="flex justify-between"
      >
        <div className="w-4/5 h-13 relative">
          <CiSearch className="absolute text-white size-5 top-1/3 left-4" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search for a city..."
            className="w-full bg-[#0E1421] h-full rounded-full pl-9 outline-none caret-white text-white"
          />
        </div>
        <button
          type="button"
          className="bg-[#742BEC] rounded-full grid place-items-center p-4 cursor-pointer"
        >
          <TiWeatherWindyCloudy className="text-white size-5" />
        </button>
      </form>

      {filteredCities.length > 0 && (
        <ul className="mt-4 bg-[#0E1421] rounded-lg p-4 text-white">
          {filteredCities.map((city: City) => (
            <li
              key={city.id}
              className="py-1 border-b border-[#1e293b] last:border-b-0"
              onClick={() => setSelectedCity(city.name)}
            >
              {city.name}, {city.region}, {city.country}
            </li>
          ))}
        </ul>
      )}

      <div className="grid grid-cols-12 grid-rows-12">
        <div
          className="mt-4 lg:mt-16 row-span-12 col-span-12
        lg:col-span-7 row-span-12 bg-[#0E1421] rounded-lg"
        >
          <div className="flex justify-between">
            <div
              className="inline-flex items-center gap-2 py-2.5 pl-3 pr-10 bg-[#742BEC]
         rounded-full
        "
            >
              <IoLocation className="text-white" />
              <small className="text-white">
                {selectedCity &&
                  filteredCities.map((city: City) =>
                    city.name === "Lagos" ? (
                      <span key="Lagos">Lagos</span>
                    ) : (
                      <span key={city.name}>{city.name}</span>
                    )
                  )}
              </small>
            </div>
            <div
              className="relative inline-flex items-center justify-center bg-white rounded-full 
          w-22 h-10 outline-none"
            >
              <motion.div
                className="absolute bg-[#060C1A] rounded-full h-10 w-12"
                initial={{
                  left: 0,
                }}
                animate={{
                  left: unit === "c" ? "0px" : "2.75rem",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <button
                type="button"
                onClick={() => setUnit("f")}
                className={`relative z-10 px-3 py-1 rounded-full text-sm ${
                  unit === "f" ? "text-[#060C1A]" : "text-white"
                }`}
              >
                F
              </button>

              <button
                type="button"
                onClick={() => setUnit("c")}
                className={`relative z-10 px-3 py-1 rounded-full text-sm ${
                  unit === "f" ? "text-white" : "text-[#060C1A]"
                }`}
              >
                C
              </button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
