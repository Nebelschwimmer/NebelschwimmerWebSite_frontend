import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTextsList, searchText } from "../../utils/api_texts";


const initialState = {
  texts: [],
  totalPages: 0,
  loading: false,
  error: null,
};

export const fetchTexts = createAsyncThunk(
  "texts/fetchTexts",
  async (pageQuery) => {
    try {
      const res = await getTextsList(pageQuery);
      return res;
    } catch (err) {
      console.log(err)
    }
  }
);

export const searchAndFetchTexts = createAsyncThunk(
  "texts/searchAndFetchTexts",
  async (searchQuery) => {
    try {
      const res = await searchText(searchQuery);
      return res;
    } catch (err) {
      console.log(err)
    }
  }
);



const textsSlice = createSlice({
  name: "texts",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchTexts.fulfilled, (state, action) => {
      state.loading = false;
      state.texts = action.payload.texts;
      state.totalPages = action.payload.totalPages;
    })
    .addCase(searchAndFetchTexts.pending, (state) => {
      state.loading = true;
    })
    .addCase(searchAndFetchTexts.fulfilled, (state, action) => {
      state.loading = false;
      state.texts = action.payload;
      state.totalPages = action.payload.totalPages;
    })
  },
});



export default textsSlice.reducer;