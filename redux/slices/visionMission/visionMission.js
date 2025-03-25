import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAPIURL } from "../../../utils/utils";
 
 
// Async thunks
export const fetchVisionMissions = createAsyncThunk(
    "visionMission/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${getAPIURL()}/getAll/about/vision-mission/`);
            return response.data.getVisionMisions || [];
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch data");
        }
    }
);
 
export const addVisionMission = createAsyncThunk(
    "visionMission/add",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${getAPIURL()}/create/about/vision-mission`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data.newVisionMission;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to add data");
        }
    }
);
 
export const deleteVisionMission = createAsyncThunk(
    "visionMission/delete",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${getAPIURL()}/delete/about/vision-mission/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to delete");
        }
    }
);
 
export const updateVisionMission = createAsyncThunk(
    "visionMission/update",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${getAPIURL()}/update/about/vision-mission/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data.updatedVisionMission;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Update failed");
        }
    }
);
 
const visionMissionSlice = createSlice({
    name: "visionMission",
    initialState: {
        visionMissions: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVisionMissions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchVisionMissions.fulfilled, (state, action) => {
                state.loading = false;
                state.visionMissions = action.payload;
            })
            .addCase(fetchVisionMissions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addVisionMission.fulfilled, (state, action) => {
                state.visionMissions.push(action.payload);
            })
            .addCase(deleteVisionMission.fulfilled, (state, action) => {
                state.visionMissions = state.visionMissions.filter((item) => item._id !== action.payload);
            })
            .addCase(updateVisionMission.fulfilled, (state, action) => {
                state.visionMissions = state.visionMissions.map((item) =>
                    item._id === action.payload._id ? action.payload : item
                );
            });
    },
});
 
export default visionMissionSlice.reducer;
 
 
 