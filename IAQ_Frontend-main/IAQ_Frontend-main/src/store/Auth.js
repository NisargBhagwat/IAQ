import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    token: "",
  },
  reducers: {
    setToken: (state, { payload }) => {
      return {
        isAuth: true,
        token: payload,
      };
    },
    tokenLogin: (state) => {
      const token = localStorage.getItem("eComToken");
      if (token) {
        return {
          isAuth: true,
          token: token,
        };
      } else {
        return {
          isAuth: false,
          token: "",
        };
      }
    },
    clearToken: (state) => {
        return {
            isAuth: false,
            token: ""
        }
    }
  },
});

export const { setToken, tokenLogin, clearToken } = authSlice.actions;
