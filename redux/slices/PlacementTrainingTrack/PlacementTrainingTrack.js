import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { getAPIURL } from "../../../utils/utils";

// Create placement training track
export const createPlacementTrainingTrack = createAsyncThunk(
  "placementTrainingTracks/createPlacementTrainingTrack",
  async ({ formData, token }) => {
    try {
      const response = await Axios.post(
        `${getAPIURL()}/create/service/placement-training-track`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }
);

// Get all placement training tracks
export const getAllPlacementTrainingTracks = createAsyncThunk(
  "placementTrainingTracks/getAllPlacementTrainingTracks",
  async () => {
    try {
      const response = await Axios.get(
        `${getAPIURL()}/getAll/service/placement-training-tracks`
      );
      return response.data.getAllPlacementtrainingtrack;
    } catch (error) {
      throw error;
    }
  }
);

// Get placement training track by ID
export const getPlacementTrainingTrackById = createAsyncThunk(
  "placementTrainingTracks/getPlacementTrainingTrackById",
  async (trackId) => {
    try {
      const response = await Axios.get(
        `${getAPIURL()}/getById/service/placement-training-track/${trackId}`
      );
      return response.data.placementtrainingtrackById;
    } catch (error) {
      throw Error("Error fetching placement training track details");
    }
  }
);

// Update placement training track
export const updatePlacementTrainingTrack = createAsyncThunk(
  "placementTrainingTracks/updatePlacementTrainingTrack",
  async ({ trackId, formData, token }) => {
    try {
      const response = await Axios.put(
        `${getAPIURL()}/update/service/placement-training-track/${trackId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      throw Error("Error updating placement training track");
    }
  }
);

// Delete placement training track
export const deletePlacementTrainingTrack = createAsyncThunk(
  "placementTrainingTracks/deletePlacementTrainingTrack",
  async ({ trackId, token }) => {
    try {
      const response = await Axios.delete(
        `${getAPIURL()}/delete/service/placement-training-track/${trackId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }
);

const placementTrainingTrackSlice = createSlice({
  name: "placementTrainingTracks",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: "",
    successMessage: "",
    tracks: [],
    track: {},
    trackById: null,
    updateSuccess: false,
    updateError: null,
  },
  reducers: {
    resetPlacementTrainingTrack: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.error = "";
      state.successMessage = "";
    },
    clearUpdateStatus: (state) => {
      state.updateSuccess = false;
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    // Create placement training track
    builder.addCase(createPlacementTrainingTrack.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(createPlacementTrainingTrack.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.successMessage = action.payload.message || "Track created successfully";
    });
    builder.addCase(createPlacementTrainingTrack.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.payload
        ? action.payload.message || action.payload.error
        : action.error.message;
    });

    // Get all placement training tracks
    builder.addCase(getAllPlacementTrainingTracks.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getAllPlacementTrainingTracks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.tracks = action.payload;
    });
    builder.addCase(getAllPlacementTrainingTracks.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // Get placement training track by ID
    builder.addCase(getPlacementTrainingTrackById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getPlacementTrainingTrackById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.trackById = action.payload;
    });
    builder.addCase(getPlacementTrainingTrackById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // Update placement training track
    builder.addCase(updatePlacementTrainingTrack.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.updateSuccess = false;
    });
    builder.addCase(updatePlacementTrainingTrack.fulfilled, (state, action) => {
      state.isLoading = false;
      state.track = action.payload;
      state.updateSuccess = true;
      state.isSuccess = true;
      state.successMessage = "Placement training track updated successfully";
    });
    builder.addCase(updatePlacementTrainingTrack.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.updateSuccess = false;
    });

    // Delete placement training track
    builder.addCase(deletePlacementTrainingTrack.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(deletePlacementTrainingTrack.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.successMessage = "Placement training track deleted successfully";
    });
    builder.addCase(deletePlacementTrainingTrack.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.payload
        ? action.payload.message || action.payload.error
        : action.error.message;
    });
  },
});

export const { resetPlacementTrainingTrack, clearUpdateStatus } =
  placementTrainingTrackSlice.actions;

export const selectPlacementTrainingTrackState = (state) =>
  state.placementTrainingTrack;

export default placementTrainingTrackSlice.reducer;