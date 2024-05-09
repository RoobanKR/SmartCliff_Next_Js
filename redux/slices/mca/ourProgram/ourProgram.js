import { getAPIURL } from "@/utils/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOurPrograms = createAsyncThunk(
  "ourProgram/fetchOurPrograms",
  async () => {
    const response = await axios.get(
      `${getAPIURL()}/getAll/our_program`
    );
    return response.data.our_Programs;
  }
);

export const fetchOurProgramById = createAsyncThunk(
  "ourProgram/fetchOurProgramById",
  async (programId) => {
    const response = await axios.get(
      `${getAPIURL()}/getById/our_program/${programId}`
    );
    return response.data.our_Programs;
  }
);

const ourProgramSlice = createSlice({
  name: "ourProgram",
  initialState: {
    ourProgram: [],
    loading: false,
    error: null,
    selectedProgram: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOurPrograms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOurPrograms.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.ourProgram = action.payload;
      })
      .addCase(fetchOurPrograms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOurProgramById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOurProgramById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.selectedProgram = action.payload; // Update selectedProgram with the fetched program
      })
      .addCase(fetchOurProgramById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ourProgramSlice.reducer;
