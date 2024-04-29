import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMusicList, searchMusic } from "../../utils/api_music"


const initialState = {
  trackList: [],
  totalPages: 0,
  loading: false,
  error: null,
};

export const fetchMusic = createAsyncThunk(
  "music/fetchMusic",
  async (pageMusicQuery) => {
    try {
      const res = await getMusicList(pageMusicQuery);
      return res;
    } catch (err) {
      console.log(err)
    }
  }
);

export const searchAndFetchMusic = createAsyncThunk(
  "music/searchAndFetchMusic",
  async (searchMusicQuery) => {
    try {
      const res = await searchMusic(searchMusicQuery);
      return res;
    } catch (err) {
      console.log(err)
    }
  }
);

const musicSlice = createSlice({
  name: "music",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchMusic.fulfilled, (state, action) => {
      state.loading = false;
      state.trackList = action.payload.tracks;
      state.totalPages = action.payload.totalPages;
    })
    .addCase(searchAndFetchMusic.fulfilled, (state, action) => {
      state.loading = false;
      state.trackList = action.payload;
    })
    },
});


export default musicSlice.reducer;