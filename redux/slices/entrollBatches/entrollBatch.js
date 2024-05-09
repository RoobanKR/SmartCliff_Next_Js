import { getAPIURL } from '@/utils/utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createEntrollBatches = createAsyncThunk(
  'entrollBatch/createEntrollBatches',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`${getAPIURL()}/create/entrollBatch`, formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const verifyOTP = createAsyncThunk(
    'entrollBatch/verifyOTP',
    async ({ otp, email }, thunkAPI) => {
      try {
        const response = await axios.post(`${getAPIURL()}/otp/batchverify`, { otp, email });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const resendOTP = createAsyncThunk(
    'entrollBatch/resendOTP',
    async (email, thunkAPI) => {
      try {
        const response = await axios.post(`${getAPIURL()}/otp/batchresend`, { email });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

const entrollBatchSlice = createSlice({
  name: 'entrollBatch',
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
      .addCase(createEntrollBatches.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createEntrollBatches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message; 
      })
      .addCase(createEntrollBatches.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.error : 'Error creating/applying';
      })
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.verified = true;
        state.successMessage = action.payload.message;
      })
      
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
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
        state.error = action.payload ? action.payload.error : 'Error resending OTP';
      });
  },
});
export const selectError = state => state.entrollBatch.error;

export default entrollBatchSlice.reducer;
