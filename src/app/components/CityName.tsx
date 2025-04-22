import React from "react";
import { IoLocation } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function CityName() {
  const selectedCity = useSelector((state: RootState) => state.search.search);

  return (
    <div className="inline-flex items-center gap-2 py-2.5 pl-3 pr-10 bg-[#742BEC] rounded-full">
      <IoLocation className="text-white" />
      <small className="text-white">
        {selectedCity && selectedCity.name && selectedCity.country ? (
          <span>
            {selectedCity.name}, {selectedCity.country}
          </span>
        ) : (
          "No city selected"
        )}
      </small>
    </div>
  );
}

export default CityName;
