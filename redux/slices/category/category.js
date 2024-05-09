import { getAPIURL } from "@/utils/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    try {
      const response = await Axios.get(`${getAPIURL()}/getAll/category`);
      return response.data.Category;
    } catch (error) {
      throw error;
    }
  }
);

const categoryReducer = createSlice({
  name: "category",
  initialState: {
    categoryData: [],
    status: "idle",
    error: null,
    filters: {
      category: [],
    },
  },
  reducers: {
    categorysFilterChange: (state, action) => {
      state.category = [...action.payload];
      categoryReducer.caseReducers.updateFilteredData(state, action);
    },
    updateFilteredData: (state, action) => {
      if (!state.filters || state.filters.category.length === 0) {
        state.filteredData = state.categoryData;
      } else {
        state.filteredData = state.categoryData.filter((categoryItem) =>
          state.filters.category.includes(categoryItem.category)
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categoryData = action.payload;
        if (Object.keys(state.filters).length === 0) {
          state.filteredData = action.payload;
        }
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { categorysFilterChange } = categoryReducer.actions;

export const selectCategories = (state) => state.category.categoryData;
export const selectAddCategoryError = (state) => state.category.error;
export default categoryReducer.reducer;
