import { getAPIURL } from "@/utils/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchCareerOpportunities = createAsyncThunk(
  "careerOpportunities/fetchCareerOpportunities",
  async () => {
    try {
      const response = await Axios.get(
        `${getAPIURL()}/getAll/careeroppertunities`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const careerOpportunitiesSlice = createSlice({
  name: "careerOpportunities",
  initialState: {
    status: "idle",
    error: null,
    opportunitiesData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCareerOpportunities.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCareerOpportunities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.opportunitiesData = action.payload;
      })
      .addCase(fetchCareerOpportunities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const selectCareerOpportunities = (state) =>
  state.careerOpportunities.opportunitiesData;
export const selectCareerOpportunitiesError = (state) =>
  state.careerOpportunities.error;

export default careerOpportunitiesSlice.reducer;
