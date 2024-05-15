import { combineReducers } from "@reduxjs/toolkit";
import { reducer as authReducer } from "./slices/AuthSlice";
import { reducer as toastReducer } from "./slices/ToastSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  toast: toastReducer,
});

export default rootReducer;
