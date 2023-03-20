import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_BASE_URL;

const initialState = [];

export const fetchAsyncStm32Ota = createAsyncThunk(
  "stm32Ota/fetchAsyncStm32Ota",
  async () => {
    try {
      const response = await axios.get(`${API_URL}/stm32Ota`, {
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

export const fetchAsyncCreateSTM32Ota = createAsyncThunk(
  "stm32Ota/fetchAsyncCreateSTM32Ota",
  async (data) => {
    try {
      const response = await axios.post(`${API_URL}/stm32Ota`, data, {
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

export const fetchAsyncDeleteSTMOta = createAsyncThunk(
  "stm32Ota/fetchAsyncDeleteSTMOta",
  async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/stm32Ota/${id}`, {
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

export const fetchAsyncUpdateStmOta = createAsyncThunk(
  "stm32Ota/fetchAsyncUpdateStmOta",
  async (data) => {
    try {
      const response = await axios.patch(
        `${API_URL}/stm32Ota/${data.id}`,
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

const STM32OtaSlice = createSlice({
  name: "stm32Ota",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAsyncStm32Ota.pending]: (state) => {},
    [fetchAsyncStm32Ota.fulfilled]: (state, { payload }) => {
      return payload.data;
    },
    [fetchAsyncStm32Ota.rejected]: (state, actions) => {
      {
        toast.error(actions.error.message);
      }
    },

    [fetchAsyncCreateSTM32Ota.pending]: (state) => {},
    [fetchAsyncCreateSTM32Ota.fulfilled]: (state, { payload }) => {
      {
        toast.success(payload.message);
      }
      return [...state, payload.data];
    },
    [fetchAsyncCreateSTM32Ota.rejected]: (state, actions) => {
      {
        toast.error(actions.error.message);
      }
    },

    [fetchAsyncDeleteSTMOta.pending]: (state) => {},
    [fetchAsyncDeleteSTMOta.fulfilled]: (state, { payload }) => {
      {
        toast.success(payload.message);
      }
      const newState = state.filter((value) => value._id !== payload.data._id);
      return newState;
    },
    [fetchAsyncDeleteSTMOta.rejected]: (state, actions) => {
      {
        toast.error(actions.error.message);
      }
    },

    [fetchAsyncUpdateStmOta.pending]: (state) => {},
    [fetchAsyncUpdateStmOta.fulfilled]: (state, { payload }) => {
      {
        toast.success(payload.message);
      }
      const index = state.findIndex((value) => value._id === payload.data._id);
      state[index] = payload.data;
      return state;
    },
    [fetchAsyncUpdateStmOta.rejected]: (state, actions) => {
      {
        toast.error(actions.error.message);
      }
    },
  },
});

export const getAllStm32Ota = (state) => state.stm32Ota;

export default STM32OtaSlice.reducer;
