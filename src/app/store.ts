import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";
import loaderSlice from "./slices/loaderSlice";


const store = configureStore({
  reducer: {
    userState: authSlice,
    loaderState: loaderSlice,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


