"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setUnit } from "./features/searchSlice";
import { motion } from "motion/react";

function CandF() {
  const dispatch = useDispatch();
  const unit = useSelector((state: RootState) => state.search.unit);

  const handleToggle = (newUnit: "c" | "f") => {
    if (unit !== newUnit) {
      dispatch(setUnit(newUnit));
    }
  };

  return (
    <div
      className="relative inline-flex items-center justify-center bg-white rounded-full 
        w-22 h-10 outline-none"
    >
      <motion.div
        className="absolute bg-[#060C1A] rounded-full h-10 w-12"
        initial={{ left: unit === "c" ? "0px" : "2.75rem" }}
        animate={{ left: unit === "c" ? "0px" : "2.75rem" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      <button
        type="button"
        onClick={() => handleToggle("f")}
        className={`relative z-10 px-3 py-1 rounded-full text-sm ${
          unit === "f" ? "text-[#060C1A]" : "text-white"
        }`}
      >
        F
      </button>

      <button
        type="button"
        onClick={() => handleToggle("c")}
        className={`relative z-10 px-3 py-1 rounded-full text-sm ${
          unit === "c" ? "text-[#060C1A]" : "text-white"
        }`}
      >
        C
      </button>
    </div>
  );
}

export default CandF;
