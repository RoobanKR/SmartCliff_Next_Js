import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for creating a hiring application
export const createHiringApplication = createAsyncThunk(
  "hiring/createApplication",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${getAPIURL()}/create/hiring_Apply`,
        values
      );
      return response.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Error creating application";
      return rejectWithValue(errorMsg);
    }
  }
);

const initialState = {
  applications: [],
  loading: false,
  error: null,
};

const hiringSlice = createSlice({
  name: "hiring",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createHiringApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHiringApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.applications.push(action.payload);
      })
      .addCase(createHiringApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default hiringSlice.reducer;
