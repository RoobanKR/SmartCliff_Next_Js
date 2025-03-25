import { getAPIURL } from '@/utils/utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  targetStudents: [],
  loading: false,
  error: null,
};

export const getAllTargetStudents = createAsyncThunk(
  'targetStudent/getAllTargetStudents',
  async () => {
    const response = await axios.get( `${getAPIURL()}/getAll/degreeprogram/target-student`); // Adjust the API endpoint as needed
    return response.data.target_Student; 
  }
);


// Create the slice
const targetStudentSlice = createSlice({
  name: 'targetStudent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTargetStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTargetStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.targetStudents = action.payload;
      })
      .addCase(getAllTargetStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

// Export the actions and reducer
export const { } = targetStudentSlice.actions;
export default targetStudentSlice.reducer;