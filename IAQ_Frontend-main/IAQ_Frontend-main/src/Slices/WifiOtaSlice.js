import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_BASE_URL;

const initialState = [];

export const fetchAsyncWifiOta = createAsyncThunk(
  "wifiOta/fetchAsyncWifiOta",
  async () => {
    try {
      const response = await axios.get(`${API_URL}/wifiOta`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("eComToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const fetchAsyncCreateWifiOta = createAsyncThunk(
  "wifiOta/fetchAsyncCreateWifiOta",
  async (data) => {
    try {
      const response = await axios.post(`${API_URL}/wifiOta`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("eComToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const fetchAsyncDeleteWifiOta = createAsyncThunk(
  "wifiOta/fetchAsyncDeleteWifiOta",
  async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/wifiOta/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("eComToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const fetchAsyncUpdateWifiOta = createAsyncThunk(
  "wifiOta/fetchAsyncUpdateWifiOta",
  async (data) => {
    try {
      const response = await axios.patch(
        `${API_URL}/wifiOta/${data.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("eComToken")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const WifiOtaSlice = createSlice({
  name: "wifiOta",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAsyncWifiOta.pending]: (state) => {},
    [fetchAsyncWifiOta.fulfilled]: (state, { payload }) => {
      return payload.data;
    },
    [fetchAsyncWifiOta.rejected]: (state, actions) => {
      {
        toast.error(actions.error.message);
      }
    },

    [fetchAsyncCreateWifiOta.pending]: (state) => {},
    [fetchAsyncCreateWifiOta.fulfilled]: (state, { payload }) => {
      {
        toast.success(payload.message);
      }
      return [...state, payload.data];
    },
    [fetchAsyncCreateWifiOta.rejected]: (state, actions) => {
      {
        toast.error(actions.error.message);
      }
    },

    [fetchAsyncDeleteWifiOta.pending]: (state) => {},
    [fetchAsyncDeleteWifiOta.fulfilled]: (state, { payload }) => {
      {
        toast.success(payload.message);
      }
      const newState = state.filter((value) => value._id !== payload.data._id);
      return newState;
    },
    [fetchAsyncDeleteWifiOta.rejected]: (state, actions) => {
      {
        toast.error(actions.error.message);
      }
    },

    [fetchAsyncUpdateWifiOta.pending]: (state) => {},
    [fetchAsyncUpdateWifiOta.fulfilled]: (state, { payload }) => {
      {
        toast.success(payload.message);
      }
      const index = state.findIndex((value) => value._id === payload.data._id);
      state[index] = payload.data;
      return state;
    },
    [fetchAsyncUpdateWifiOta.rejected]: (state, actions) => {
      {
        toast.error(actions.error.message);
      }
    },
  },
});

export const getAllWifiOta = (state) => state.wifiOta;

export default WifiOtaSlice.reducer;
