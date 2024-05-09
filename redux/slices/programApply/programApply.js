import { getAPIURL } from "@/utils/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createProgramApply = createAsyncThunk(
  "programApply/createProgramApply",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${getAPIURL()}/create/programapply`,
        formData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "programApply/verifyOTP",
  async ({ otp, email }, thunkAPI) => {
    try {
      const response = await axios.post(`${getAPIURL()}/programotp/verify`, {
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
  "programApply/resendOTP",
  async (email, thunkAPI) => {
    try {
      const response = await axios.post(`${getAPIURL()}/programotp/resend`, {
        email,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const programApplySlice = createSlice({
  name: "programApply",
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
      .addCase(createProgramApply.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProgramApply.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(createProgramApply.rejected, (state, action) => {
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

export default programApplySlice.reducer;
