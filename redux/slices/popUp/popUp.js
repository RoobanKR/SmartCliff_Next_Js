// src/redux/slices/popupNotificationSlice.js

import { getAPIURL } from "@/utils/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  popupData: null,
  loading: false,
  error: null,
};

// Async thunk to fetch pop-up notifications from the API
export const getPopUpNotification = createAsyncThunk(
  "popupNotification/getPopUpNotification",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${getAPIURL()}/getAll/home/popup-notification`
      );
      const data = await response.json();
      return data.getAllPopUpNotification;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const popupNotificationSlice = createSlice({
  name: "popupNotification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPopUpNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPopUpNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.popupData = action.payload;
      })
      .addCase(getPopUpNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default popupNotificationSlice.reducer;
