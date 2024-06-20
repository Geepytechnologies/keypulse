import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userslice",
  initialState: {
    currentuser: null,
  },
  reducers: {
    SIGNIN: (state, action) => {
      state.currentuser = action.payload;
    },
    SIGNOUT: (state) => {
      state.currentuser = null;
    },
  },
});

export const { SIGNIN, SIGNOUT } = userSlice.actions;
export default userSlice.reducer;
