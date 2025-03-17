import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  UserInterface,
} from "../../interfaces/AuthInterface";
import { LocalStorageKeys } from "../../enums/appEnum";

type InitialState = {
  user: UserInterface | any;
  token: string | null;
  isLoggedIn: boolean;
  error: string | null;
};

const setUserLocalStorage = (user: UserInterface, token: string) => {
  localStorage.setItem(LocalStorageKeys.USER, JSON.stringify(user));
  localStorage.setItem(LocalStorageKeys.JWT, JSON.stringify(token));
};

const getItemFromLocalStorage = (name: string) => {
  const jsonData = localStorage.getItem(name);
  const data = jsonData ? JSON.parse(jsonData) : null;
  return data;
};

const jwtToken = getItemFromLocalStorage(LocalStorageKeys.JWT);
const user = getItemFromLocalStorage(LocalStorageKeys.USER);

const initState: InitialState = {
  user: user,
  token: jwtToken,
  isLoggedIn: user && jwtToken ? true : false,
  error: "",
};

const unsetUser = () => {
  window.localStorage.removeItem(LocalStorageKeys.JWT);
  window.localStorage.removeItem(LocalStorageKeys.USER);
};

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ token: string; user: UserInterface }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoggedIn = user && token ? true : false;
      state.error = "";
      if (user && token) {
        setUserLocalStorage(user, token);
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    logOutUser: (state) => {
      unsetUser();
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.error = "";
    },
  },
});
export default authSlice.reducer;
export const { setUser, setError, logOutUser } = authSlice.actions;
export {initState as initUserState}