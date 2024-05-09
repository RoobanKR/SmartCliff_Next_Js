import { getAPIURL } from "@/utils/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllEligibilityCriteria = createAsyncThunk(
  "eligibilityCriteria/getAll",
  async () => {
    try {
      const response = await axios.get(`${getAPIURL()}/getAll/eligibility`);
      return response.data.allEligibilityCriteria;
    } catch (error) {
      throw error;
    }
  }
);

export const getEligibilityCriteriaById = createAsyncThunk(
  "eligibilityCriteria/getById",
  async (criteriaId) => {
    try {
      const response = await axios.get(
        `${getAPIURL()}/getById/eligibility/${criteriaId}`
      );
      return response.data.eligibilityCriteriaById;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  successMessage: "",
  eligibilityCriteria: [],
  eligibilityCriteriaById: null,
};

const eligibilityCriteriaSlice = createSlice({
  name: "eligibilityCriteria",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEligibilityCriteria.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEligibilityCriteria.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.eligibilityCriteria = action.payload;
      })
      .addCase(getAllEligibilityCriteria.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getEligibilityCriteriaById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEligibilityCriteriaById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.eligibilityCriteriaById = action.payload;
      })
      .addCase(getEligibilityCriteriaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default eligibilityCriteriaSlice.reducer;
