import { configureStore } from "@reduxjs/toolkit";

import textsSlice from "./slices/texts_slice";
import language_slice from "./slices/language_slice"
import musicSlice from "./slices/music_slice";

const store = configureStore({
  reducer: {
    texts: textsSlice,
    music: musicSlice,
    langEn: language_slice
    
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {

    }
  })
});

export default store;