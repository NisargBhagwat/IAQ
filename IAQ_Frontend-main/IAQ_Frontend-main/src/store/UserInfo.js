import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    userInfo: {},
    addresses: [],
  },
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload.userInfo;
      state.addresses = payload.addresses;
    },
  },
});

export const { setUserInfo } = userInfoSlice.actions;
