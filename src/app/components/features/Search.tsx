"use client";
import React, { useMemo, useState } from "react";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { CiSearch } from "react-icons/ci";
import { useDebounce } from "../../hooks/debounce";
import { searchQueryFunc } from "@/lib/hooks/query";
import { useDispatch } from "react-redux";
import { setSearch } from "./searchSlice";

interface City {
  id: number;
  name: string;
  country: string;
}

function Search() {
  const dispatch = useDispatch();
  const [search, setSearchInput] = useState<string>("Lagos");
  const debouncedSearch = useDebounce(search, 500);
  const [selectedCity, setSelectedCity] = useState<City>({
    id: 0,
    name: "Lagos",
    country: "Nigeria",
  });

  const {
    data: cities = [] as City[],
    isLoading,
    isError,
    error,
  } = searchQueryFunc<City[]>(debouncedSearch);

  const filteredCities = useMemo(() => {
    return debouncedSearch
      ? cities.filter((city) =>
          city.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
      : [];
  }, [debouncedSearch, cities]);

  if (isError) {
    return (
      <div className="text-red-500">Error loading cities: {error.message}</div>
    );
  }

  if (isLoading) {
    return <div className="text-white">Loading cities...</div>;
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const city = filteredCities.find(
            (c) => c.name.toLowerCase() === search.toLowerCase()
          );
          if (city) {
            setSelectedCity(city);
            dispatch(setSearch(city));
          }
        }}
        className="flex justify-between"
      >
        <div className="w-4/5 h-13 relative">
          <CiSearch className="absolute text-white size-5 top-1/3 left-4" />
          <input
            value={search}
            onChange={(e) => setSearchInput(e.target.value)}
            type="search"
            placeholder="Search for a city..."
            className="w-full bg-[#0E1421] h-full rounded-full pl-9 outline-none caret-white text-white"
          />
        </div>
        <button
          type="submit"
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
              className="py-1 border-b border-[#1e293b] last:border-b-0 cursor-pointer"
              onClick={() => {
                setSelectedCity(city);
                setSearchInput(city.name);
                dispatch(setSearch(city));
              }}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
