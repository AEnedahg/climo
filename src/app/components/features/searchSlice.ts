import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define city structure
interface City {
  name: string;
  region?: string;
  country: string;
}

// Define the slice state structure
interface SearchState {
  search: City;
  unit: "c" | "f";
  feelsLike: number | null;
}

// Initial state
const initialState: SearchState = {
  search: { name: "Lagos", country: "Nigeria" },
  unit: "c",
  feelsLike: null,
};

// Create the slice
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<City>) => {
      state.search = action.payload;
    },
    setUnit: (state, action: PayloadAction<"c" | "f">) => {
      state.unit = action.payload;
    },
    setFeelsLike: (state, action: PayloadAction<number | null>) => {
      state.feelsLike = action.payload;
    },
  },
});


export const { setSearch, setUnit, setFeelsLike } = searchSlice.actions;
export default searchSlice.reducer;
