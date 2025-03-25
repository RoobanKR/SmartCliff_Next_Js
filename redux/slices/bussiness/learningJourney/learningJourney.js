// redux/slices/learningJourneySlice.js
import { getAPIURL } from '@/utils/utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  learningJourneys: [],
  loading: false,
  error: null,
};

// Async thunk for creating a new learning journey
export const createLearningJourney = createAsyncThunk(
  'learningJourney/create',
  async (formData) => {
    const response = await axios.post(`${getAPIURL()}/create/learning-journey`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
);

// Async thunk for fetching all learning journeys
export const fetchAllLearningJourneys = createAsyncThunk(
  'learningJourney/fetchAll',
  async () => {
    const response = await axios.get(`${getAPIURL()}/getAll/business/learning-journey`);
    return response.data.learningjourney;
  }
);

// Create the slice
const learningJourneySlice = createSlice({
  name: 'learningJourney',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLearningJourney.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLearningJourney.fulfilled, (state, action) => {
        state.loading = false;
        state.learningJourneys.push(action.payload);
      })
      .addCase(createLearningJourney.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllLearningJourneys.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllLearningJourneys.fulfilled, (state, action) => {
        state.loading = false;
        state.learningJourneys = action.payload;
      })
      .addCase(fetchAllLearningJourneys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the actions and reducer
export const { clearError } = learningJourneySlice.actions;
export default learningJourneySlice.reducer;