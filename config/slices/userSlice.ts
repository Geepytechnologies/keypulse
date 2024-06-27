import { createSlice } from "@reduxjs/toolkit";

interface User {
  "custom:role": string;
  "custom:userid": string;
  email: string;
  email_verified: boolean;
  name: string;
  sub: string;
}

interface UserState {
  currentuser: User | null;
}
const initialState: UserState = {
  currentuser: null,
};

const userSlice = createSlice({
  name: "userslice",
  initialState,
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
