import { getAPIURL } from "@/utils/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "faq/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${getAPIURL()}/categories`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllFAQs = createAsyncThunk(
  "faq/fetchAllFAQs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${getAPIURL()}/getAll/faq`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFAQById = createAsyncThunk(
  "faq/fetchFAQById",
  async (faqId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${getAPIURL()}/get/faq/${faqId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  categories: [],
  faq: [],
  status: "idle",
};

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllFAQs.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllFAQs.fulfilled, (state, action) => {
      state.faq = action.payload.FAQ || [];
      state.status = "idle";
    });
    builder.addCase(fetchAllFAQs.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(fetchFAQById.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(fetchFAQById.fulfilled, (state, action) => {
      state.faq = [action.payload];
      state.status = "idle";
    });
  },
});

export const selectFAQs = (state) => state.faq.faq;
export const selectStatus = (state) => state.faq.status;
export default faqSlice.reducer;
