import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for creating/applying
export const createEntrollBatches = createAsyncThunk(
  'entrollBatch/createEntrollBatches',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5353/create/entrollBatch', formData);
      return response.data; // Assuming the response contains relevant data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const verifyOTP = createAsyncThunk(
    'entrollBatch/verifyOTP',
    async ({ otp, email }, thunkAPI) => {
      try {
        const response = await axios.post('http://localhost:5353/otp/batchverify', { otp, email });
        return response.data; // Assuming the response contains relevant data
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const resendOTP = createAsyncThunk(
    'entrollBatch/resendOTP',
    async (email, thunkAPI) => {
      try {
        const response = await axios.post('http://localhost:5353/otp/batchresend', { email });
        return response.data; // Assuming the response contains relevant data
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

// Create slice for entrollBatch
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
        state.error = action.payload ? action.payload.error : 'Error creating/applying'; // Default error message
      })
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.verified = true;
        state.successMessage = action.payload.message; // Assuming API returns a message
      })
      
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message; // Assuming API returns a message
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
        state.error = action.payload ? action.payload.error : 'Error resending OTP'; // Default error message
      });
  },
});
export const selectError = state => state.entrollBatch.error;

export default entrollBatchSlice.reducer;
