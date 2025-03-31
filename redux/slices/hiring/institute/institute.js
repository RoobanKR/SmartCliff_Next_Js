import { getAPIURL } from "@/utils/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createInstitute = createAsyncThunk(
  "institute/addForm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${getAPIURL()}/create/institute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response
        return rejectWithValue(errorData); // Return the structured error
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({ message: [{ key: "error", value: error.message }] });
    }
  }
);


const initialState = {
  status: "idle",
  error: null,
  formData: {
    name: "",
    institute_name: "",
    mobile: "",
    email: "",
    enquiry: "",
    services: [],
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
