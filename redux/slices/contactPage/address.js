import { getAPIURL } from '@/utils/utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create async thunk for fetching all addresses
export const getAllAddress = createAsyncThunk(
  'address/getAllAddress',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${getAPIURL()}/getAll/address`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message?.[0]?.value || 
        error.response?.data?.message || 
        'Failed to fetch address data'
      );
    }
  }
);

// Address slice
const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addresses: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetAddressState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getAllAddress
      .addCase(getAllAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload.address;
        state.success = true;
      })
      .addCase(getAllAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAddressState } = addressSlice.actions;
export const selectAddress = (state) => state.address;
export default addressSlice.reducer;