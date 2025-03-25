import { getAPIURL } from "@/utils/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Asynchronous thunk to fetch all job positions
export const fetchJobPositions = createAsyncThunk(
  "jobPositions/fetchJobPositions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${getAPIURL()}/getAll/joinus`);
      const data = await response.json();
      // Check if the response is okay
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch job positions");
      }
      return data.All_joinus; // Assume the API returns an object with All_joinus array
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const jobPositionsSlice = createSlice({
  name: "jobPositions",
  initialState: {
    positions: [],
    loading: false,
    error: null,
  },
  reducers: {
    // You can add reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobPositions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobPositions.fulfilled, (state, action) => {
        state.loading = false;
        // Filter only positions where selected is true (or "true")
        state.positions = action.payload.filter(
          (job) => job.selected === true || job.selected === "true"
        );
      })
      .addCase(fetchJobPositions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default jobPositionsSlice.reducer;

// Selectors for easy access in components
export const selectJobPositions = (state) => state.jobPositions.positions;
export const selectJobPositionsLoading = (state) => state.jobPositions.loading;
export const selectJobPositionsError = (state) => state.jobPositions.error;
