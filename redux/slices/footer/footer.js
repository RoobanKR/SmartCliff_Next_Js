import { getAPIURL } from '@/utils/utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create async thunk for fetching footer data
export const fetchFooterData = createAsyncThunk(
  'footer/fetchFooterData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get( `${getAPIURL()}/getAll/footer`);
      return response.data.getAllFooter?.[0] || null;
    } catch (error) {
      console.error('Failed to fetch footer data:', error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const footerSlice = createSlice({
  name: 'footer',
  initialState,
  reducers: {
    // You can add additional reducers here if needed
    resetFooterError: (state) => {
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFooterData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFooterData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchFooterData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { resetFooterError } = footerSlice.actions;
export default footerSlice.reducer;

// Selectors
export const selectFooterData = (state) => state.footer.data;
export const selectFooterStatus = (state) => state.footer.status;
export const selectFooterError = (state) => state.footer.error;