import { getAPIURL } from "@/utils/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
  contactData: null,
};

export const submitContact = createAsyncThunk(
  "contact/submit",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${getAPIURL()}/create/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message && Array.isArray(data.message)) {
          return rejectWithValue(data.message[0].value);
        }
        if (data.error) {
          return rejectWithValue(data.error);
        }
        throw new Error("Failed to submit contact");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    resetContactState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.contactData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitContact.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.contactData = action.payload;
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetContactState } = contactSlice.actions;
export const selectContact = (state) => state.contact;
export default contactSlice.reducer;
