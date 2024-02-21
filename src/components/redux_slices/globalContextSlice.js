// import {createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   data: {},
//   loading: true,
//   error: null,
//   test: undefined,
// };

// const globalContextSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchUser.pending, (state, action) => {
//       state.loading = true;
//     });
//     builder.addCase(fetchUser.fulfilled, (state, action) => {
//       state.data = action.payload; // action.payload == fulfillwithvalue(data) action.type = "user/fetchUser/[status]"
//       state.loading = false;
//     });
//     builder.addCase(updateUser.fulfilled, (state, action) => {
//       state.data = action.payload;
//       state.loading = false;
//     });
//     builder.addMatcher(isError, (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//       openNotification("error", "error", "Ошибка загрузки");
//     });
//   },
// });

// export default globalContextSlice.reducer;