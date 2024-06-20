import { combineReducers } from "redux";
import authSlice from "@/config/slices/authSlice";
import userSlice from "@/config/slices/userSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
});

export default rootReducer;
