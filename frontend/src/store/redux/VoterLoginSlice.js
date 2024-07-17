import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  loading: false,
  error: false,
};

const VoterLoginSlice = createSlice({
  name: "voter",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    logInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      // console.log(action.payload);
      // const { email, id } = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logOut: (state, action) => {
      state.loading = false;
      state.currentUser = null;
      state.error = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const { loginStart, logInSuccess, loginFailure, logOut } =
  VoterLoginSlice.actions;
export default VoterLoginSlice.reducer;
