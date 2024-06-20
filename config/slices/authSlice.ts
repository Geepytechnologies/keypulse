import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authslice",
  initialState: {
    isAuthenticated: false,
    loading: false,
  },
  reducers: {
    AUTHENTICATE: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    SETLOADING: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { AUTHENTICATE, SETLOADING } = authSlice.actions;
export default authSlice.reducer;
