import { getAPIURL } from "@/utils/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 
export const getAllCourseModules = createAsyncThunk(
  "courseModule/getAllCourseModules",
  async () => {
    try {
      const response = await axios.get(
        `${getAPIURL()}/getAll/coursemodules`
      );
      return response.data.course_Module;
    } catch (error) {
      throw error.response.data;
    }
  }
);
export const getCourseModuleById = createAsyncThunk(
  "courseModule/getCourseModuleById",
  async (moduleId) => {
    try {
      const response = await axios.get(
        `${getAPIURL()}/getById/coursemodule/${moduleId}`
      );
      return response.data.course_Module;
    } catch (error) {
      throw error.response.data;
    }
  }
);
 
const initialState = {
  status: "idle",
  error: null,
  successMessage: null,
  courseModules: [],
  selectedModule: null,
 
};
 
const courseModuleSlice = createSlice({
  name: "courseModule",
  initialState,
  reducers: {    setSelectedModule: (state, action) => {
    state.selectedModule = action.payload;
  },},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourseModules.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCourseModules.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courseModules = action.payload;
      })
      .addCase(getAllCourseModules.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getCourseModuleById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCourseModuleById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedModule = action.payload;
      })
      .addCase(getCourseModuleById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
 
export default courseModuleSlice.reducer;