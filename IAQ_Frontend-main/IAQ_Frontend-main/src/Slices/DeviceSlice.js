import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_BASE_URL;

const initialState = [];

export const fetchAsyncDevices = createAsyncThunk(
  "devices/fetchAsyncDevices",
  async () => {
    try {
      const response = await axios.get(`${API_URL}/device`, {
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

export const fetchAsyncUpdateWifiInfo = createAsyncThunk(
  "devices/fetchAsyncUpdateWifiInfo",
  async (data) => {
    try {
      const response = await axios.patch(
        `${API_URL}/device/updateWifiInfo/${data.id}`,
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

export const fetchAsyncUpdateOTAInfo = createAsyncThunk(
  "devices/fetchAsyncUpdateOTAInfo",
  async (data) => {
    try {
      const response = await axios.patch(
        `${API_URL}/device/updateOtaInfo/${data.id}`,
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

export const deviceSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAsyncDevices.pending]: (state) => {},
    [fetchAsyncDevices.fulfilled]: (state, { payload }) => {
      return payload.data;
    },
    [fetchAsyncDevices.rejected]: (state, actions) => {
      {
        toast.error(actions.error.message);
      }
    },

    [fetchAsyncUpdateWifiInfo.pending]: (state) => {},
    [fetchAsyncUpdateWifiInfo.fulfilled]: (state, { payload }) => {
      {
        payload.statusCode === 200 && toast.success(payload.message);
      }
      const index = state.findIndex((value) => value._id === payload.data._id);
      state[index] = payload.data;
      return state;
    },
    [fetchAsyncUpdateWifiInfo.rejected]: (state, actions) => {
      {
        toast.error(actions.error.message);
      }
    },

    [fetchAsyncUpdateOTAInfo.pending]: (state) => {},
    [fetchAsyncUpdateOTAInfo.fulfilled]: (state, { payload }) => {
      {
        payload.statusCode === 200 && toast.success(payload.message);
      }
      const index = state.findIndex((value) => value._id === payload.data._id);
      state[index] = payload.data;
      return state;
    },
    [fetchAsyncUpdateOTAInfo.rejected]: (state, actions) => {
      {
        toast.error(actions.error.message);
      }
    },
  },
});

export const getAllDevices = (state) => state.devices;
