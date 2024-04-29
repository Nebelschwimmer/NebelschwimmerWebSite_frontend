import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const language_slice = createSlice({
  name: "langEn",
  initialState,
  reducers: {
    setLangEn: (state, action) => action.payload,
  },
});

export const { setLangEn } = language_slice.actions;

export default language_slice.reducer;