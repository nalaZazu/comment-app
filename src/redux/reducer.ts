import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  user: [],
  username: "",
};
export const userData = createSlice({
  name: "login",
  initialState,
  reducers: {
    signInReducer: (state, action) => {
      state.user = [...state.user, action.payload];
      console.log(action.payload, "action in reducer");
    },
    userNameReducer: (state, action) => {
      state.username = action.payload.username;
      console.log(action.payload.username , "reducer ");
    },
  },
});

// Action creators are generated for each case reducer function
export const { signInReducer, userNameReducer } = userData.actions;

export default userData.reducer;
