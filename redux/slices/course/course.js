import { getAPIURL } from "@/utils/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const response = await axios.get(`${getAPIURL()}/getAll/course`);
    return response.data.courses;
  }
);

export const fetchCourseById = createAsyncThunk(
  "courses/fetchCourseById",
  async (id) => {
    try {
      const response = await axios.get(`${getAPIURL()}/getById/course/${id}`);
      if (response.data && response.data.courses) {
        return response.data.courses;
      } else {
        throw Error("Invalid response data structure");
      }
    } catch (error) {
      throw Error(error.response ? error.response.data.message : error.message);
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState: {
    filters: {
      category: [],
    },
    filteredData: [],
    courses: [],
    selectedCourse: [],
    status: "idle",
    error: null,
  },
  reducers: {
    tagsFilterChange: (state, action) => {
      state.filters.category = [...action.payload];
      courseSlice.caseReducers.updateFilteredData(state, action);
    },
    updateFilteredData: (state, action) => {
      if (
        JSON.stringify(state.filters) === JSON.stringify(initialState.filters)
      ) {
        state.filteredData = state.data;
      } else {
        let tagsFilteredData = medicalServicesFilteredData.filter((pack) => {
          if (state.filters.category.length === 0) {
            return true;
          }
          let include = false;
          pack.category.map((category) => {
            if (state.filters.category.includes(category)) {
              include = true;
            }
          });

          return include;
        });

        state.filteredData = priceFilteredData;
        console.log("filtered data 1", [...tagsFilteredData]);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.courses = action.payload;
    });
    builder.addCase(fetchCourses.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder
      .addCase(fetchCourseById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedCourse = action.payload;
        console.log("Fetched course:", action.payload);
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.error("Error fetching course:", action.error);
      });
  },
});
export const selectCourses = (state) => state.courses.courses;
export const { tagsFilterChange } = courseSlice.actions;
export default courseSlice.reducer;
