import { getAPIURL } from '@/utils/utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  allHiring: [],
  currentHiring: null,
  loading: false,
  error: null,
};

export const getAllHiring = createAsyncThunk(
  'hiring/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${getAPIURL()}/getAll/hiring`);
      if (response.status === 200) {
        return response.data.All_hiring;
      } else {
        throw new Error('Error fetching all hiring data');
      }
    } catch (error) {
      console.error('Error in getAllHiring:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const getHiringById = createAsyncThunk(
  'hiring/getById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${getAPIURL()}/getById/hiring/${id}`);
      if (response.status === 200) {
        return response.data.hiring_Id_Base;
      } else {
        throw new Error('Error fetching hiring by ID');
      }
    } catch (error) {
      console.error('Error in getHiringById:', error);
      return rejectWithValue(error.message);
    }
  }
);

const hiringSlice = createSlice({
  name: 'hiring',
  initialState,
  reducers: {
    resetHiringState: (state) => {
      state.loading = false;
      state.error = null;
      state.currentHiring = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllHiring.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllHiring.fulfilled, (state, action) => {
        state.allHiring = action.payload;
        state.loading = false;
      })
      .addCase(getAllHiring.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getHiringById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHiringById.fulfilled, (state, action) => {
        state.currentHiring = action.payload;
        state.loading = false;
      })
      .addCase(getHiringById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetHiringState } = hiringSlice.actions;

export default hiringSlice.reducer;
