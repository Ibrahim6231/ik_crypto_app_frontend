import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  isLoading: boolean;
};
const initialState: InitialState = {
  isLoading: false,
};


const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    loader: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export default loaderSlice.reducer;
export const { loader } = loaderSlice.actions;
