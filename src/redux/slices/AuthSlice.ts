import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthInterface {
  token: null | string;
  isAuthenticated: boolean;
  userDetails: null | {};
}

const initialState = {
  token: null,
  isAuthenticated: false,
  userDetails: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserDetails: (state: any, action: PayloadAction<string>) => {
      state.userDetails = action.payload;
    },

    setAccessToken: (state: any, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },

    setLogoutData(state: any) {
      state.token = null;
      state.userDetails = null;
    },
  },
});

export const getAuthData = (state: { auth: AuthInterface }) => state.auth;

export const tokenSelector = (state: { auth: AuthInterface }) =>
  state.auth.token;

export const userDetails = (state: { auth: AuthInterface }) =>
  state.auth.userDetails;

export const { actions, reducer } = authSlice;

export const { setLogoutData, setUserDetails, setAccessToken } = actions;

export default reducer;
