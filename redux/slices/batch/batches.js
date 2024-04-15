import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAPIURL } from '../../../utils/utils';
const initialState = {
    batches: [],
    loading: false,
  error: null,
  selectedBatch: null,

};


export const fetchBatches = createAsyncThunk(
    "batches/fetchBatches",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${getAPIURL()}/getAll/batches`); // Adjust the API endpoint accordingly
        return response.data.All_batches;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  export const fetchBatchById = createAsyncThunk(
    "batch/fetchBatchById",
    async (batchId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${getAPIURL()}/getById/batches/${batchId}`);
        return response.data.batch_Id_Base;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
 
const batchesSlice = createSlice({
  name: 'batches',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchBatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBatches.fulfilled, (state, action) => {
        state.loading = false;
        state.batches = action.payload;
      })
      .addCase(fetchBatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(fetchBatchById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBatchById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBatch = action.payload;
      })
      .addCase(fetchBatchById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
  },
});

export default batchesSlice.reducer;
