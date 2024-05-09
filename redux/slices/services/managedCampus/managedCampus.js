import { getAPIURL } from "@/utils/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 
export const fetchManagedCampus = createAsyncThunk(
  "managedCampus/fetchManagedCampus",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${getAPIURL()}/getAll/managed_campus`);
      const filteredCampus = response.data.getAllManagedCampus.filter(
        (campus) => campus.service._id === id
      );
      return filteredCampus;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
 
// Async thunk for fetching execution overviews
export const fetchExecutionOverviews = createAsyncThunk(
  "managedCampus/fetchExecutionOverviews",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${getAPIURL()}/getAll/execution_overview`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
 
// Initial state
const initialState = {
  managedCampus: [],
  executionOverviews: [],
  status: "idle",
  error: null,
};
 
// Slice
const managedCampusSlice = createSlice({
  name: "managedCampus",
  initialState,
  reducers: {
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
    setShowSlider(state, action) {
      state.showSlider = action.payload;
    },
    setSelectedYear(state, action) {
      state.selectedYear = action.payload;
    },
    setHoveredCard(state, action) {
      state.hoveredCard = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchManagedCampus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchManagedCampus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.managedCampus = action.payload;
      })
      .addCase(fetchManagedCampus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchExecutionOverviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExecutionOverviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.executionOverviews = action.payload;
      })
      .addCase(fetchExecutionOverviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
 
export const { setActiveTab, setShowSlider, setSelectedYear, setHoveredCard } =
  managedCampusSlice.actions;
 
export default managedCampusSlice.reducer;
 