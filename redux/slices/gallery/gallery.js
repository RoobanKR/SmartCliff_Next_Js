import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAPIURL } from "../../../utils/utils";

export const createGallery = createAsyncThunk(
  "gallery/createGallery",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${getAPIURL()}/create/gallery`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to upload gallery"
      );
    }
  }
);

export const getAllGallery = createAsyncThunk(
  "gallery/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${getAPIURL()}/getAll/gallery`);
      return response.data.Gallery;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteGallery = createAsyncThunk(
  "gallery/delete",
  async ({ galleryId, token }, { rejectWithValue }) => {
    try {
      await axios.delete(`${getAPIURL()}/delete/gallery/${galleryId}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return galleryId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    loading: false,
    success: false,
    error: null,
    gallery: [],
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGallery.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createGallery.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(createGallery.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(getAllGallery.fulfilled, (state, action) => {
        state.gallery = action.payload;
        state.status = "success";
      })
      .addCase(getAllGallery.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteGallery.fulfilled, (state, action) => {
        state.gallery = state.gallery.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export const { resetState } = gallerySlice.actions;
export default gallerySlice.reducer;
