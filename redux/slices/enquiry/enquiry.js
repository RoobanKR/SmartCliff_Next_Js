import { getAPIURL } from "@/utils/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  error: null,
  success: false,
  enquiryData: null, // Make sure this is included
};

export const submitEnquiry = createAsyncThunk(
  "enquiry/submit",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${getAPIURL()}/create/enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // If response is not ok, throw error with backend message
      if (!response.ok) {
        // Handle array of error messages
        if (data.message && Array.isArray(data.message)) {
          return rejectWithValue(data.message[0].value);
        }
        // Handle single error message
        if (data.error) {
          return rejectWithValue(data.error);
        }
        throw new Error("Failed to submit enquiry");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const enquirySlice = createSlice({
  name: "enquiry",
  initialState,
  reducers: {
    resetEnquiryState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.enquiryData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitEnquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitEnquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.enquiryData = action.payload;
      })
      .addCase(submitEnquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetEnquiryState } = enquirySlice.actions;
export const selectEnquiry = (state) => state.enquiry;
export default enquirySlice.reducer;
