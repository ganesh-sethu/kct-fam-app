import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authenticationSlice";
export default configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});
