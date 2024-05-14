import { getAPIURL } from "@/utils/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createInstitute = createAsyncThunk(
  "institute/addForm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5353/create/institute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  status: "idle",
  error: null,
  formData: {
    name: "",
    designation: "",
    institute_name: "",
    mobile: "",
    email: "",
    enquiry: "",
    course: "",
    no_of_students: "",
    target_year: "",
  },
};

const instituteSlice = createSlice({
  name: "institute",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInstitute.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createInstitute.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action.payload);
      })
      .addCase(createInstitute.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

export const { updateFormData } = instituteSlice.actions;

export default instituteSlice.reducer;
