import { getAPIURL } from "@/utils/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const addInstructor = createAsyncThunk(
  "instructor/addInstructor",
  async (formData) => {
    try {
      const response = await Axios.post(
        `${getAPIURL()}/create/instructor`,
        formData
      );

      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }
);

export const fetchInstructors = createAsyncThunk(
  "instructors/fetchInstructors",
  async () => {
    try {
      const response = await Axios.get(
        `${getAPIURL()}/getAll/instructor`
      );
      return response.data.Instructor;
    } catch (error) {
      throw error;
    }
  }
);

const instructorSlice = createSlice({
  name: "instructor",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: "",
  },
  reducers: {
    resetInstructor: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addInstructor.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(addInstructor.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(addInstructor.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.payload
        ? action.payload.errorMessage
        : action.error.message;
    });
    builder.addCase(fetchInstructors.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchInstructors.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.instructors = action.payload;
    });
    builder.addCase(fetchInstructors.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { resetInstructor } = instructorSlice.actions;

export const selectInstructorState = (state) => state.instructor;

export default instructorSlice.reducer;
