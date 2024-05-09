import { getAPIURL } from "@/utils/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createApplyNow = createAsyncThunk(
  "applyNow/createApplyNow",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${getAPIURL()}/create/courseapplynow`,
        formData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "applyNow/verifyOTP",
  async ({ otp, email }, thunkAPI) => {
    try {
      const response = await axios.post(`${getAPIURL()}/otp/verify`, {
        otp,
        email,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resendOTP = createAsyncThunk(
  "applyNow/resendOTP",
  async (email, thunkAPI) => {
    try {
      const response = await axios.post(`${getAPIURL()}/otp/resend`, {
        email,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const applyNowSlice = createSlice({
  name: "applyNow",
  initialState: {
    isLoading: false,
    error: null,
    successMessage: null,
    verified: false,
    resent: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createApplyNow.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createApplyNow.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(createApplyNow.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
          ? action.payload.error
          : "Error creating/applying";
      })
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.isLoading = false;
        state.verified = true;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
          ? action.payload.error
          : "Error verifying OTP";
      })
      .addCase(resendOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resendOTP.fulfilled, (state) => {
        state.isLoading = false;
        state.resent = true;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
          ? action.payload.error
          : "Error resending OTP";
      });
  },
});

export default applyNowSlice.reducer;
