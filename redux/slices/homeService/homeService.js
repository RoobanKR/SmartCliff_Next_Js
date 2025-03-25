import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { getAPIURL } from "../../../utils/utils";

// Create home service
export const createHomeService = createAsyncThunk(
    "homeServices/createHomeService",
    async ({ formData, token }) => {
        try {
            const response = await Axios.post(
                `${getAPIURL()}/create/home/services`,
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

// Get all home services
export const getAllHomeServices = createAsyncThunk(
    "homeServices/getAllHomeServices",
    async () => {
        try {
            const response = await Axios.get(`${getAPIURL()}/getAll/home/services`);
            return response.data.get_all_home_service;
        } catch (error) {
            throw error;
        }
    }
);

// Get home service by ID
export const getHomeServiceById = createAsyncThunk(
    "homeServices/fetchById",
    async (serviceId) => {
        try {
            const response = await Axios.get(
                `${getAPIURL()}/getById/home/services/${serviceId}`
            );
            return response.data.homeServiceById;
        } catch (error) {
            throw Error("Error fetching Home Service details");
        }
    }
);

// Update home service
export const updateHomeService = createAsyncThunk(
    "homeServices/update",
    async ({ serviceId, formData }) => {
        try {
            const response = await Axios.put(
                `${getAPIURL()}/update/home/services/${serviceId}`,
                formData
            );
            return response.data.homeService;
        } catch (error) {
            throw Error("Error updating Home Service");
        }
    }
);

// Delete home service
export const deleteHomeService = createAsyncThunk(
    "homeServices/deleteHomeService",
    async (serviceId) => {
        try {
            const response = await Axios.delete(
                `${getAPIURL()}/delete/home/services/${serviceId}`
            );
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }
);

// Create the home service slice
const homeServiceSlice = createSlice({
    name: "homeServices",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        error: "",
        homeServices: [],
        homeService: {},
        homeServiceById: null,
    },
    reducers: {
        resetHomeService: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.error = "";
        },
        clearUpdateStatus: (state) => {
            state.updateSuccess = false;
            state.updateError = null;
        },
    },
    extraReducers: (builder) => {
        // Create home service cases
        builder.addCase(createHomeService.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        });
        builder.addCase(createHomeService.fulfilled, (state) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
        });
        builder.addCase(createHomeService.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.error = action.payload
                ? action.payload.errorMessage
                : action.error.message;
        });

        // Get all home services cases
        builder.addCase(getAllHomeServices.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getAllHomeServices.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.homeServices = action.payload;
        });
        builder.addCase(getAllHomeServices.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });

        // Get home service by ID cases
        builder.addCase(getHomeServiceById.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getHomeServiceById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.homeServiceById = action.payload;
        });
        builder.addCase(getHomeServiceById.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Update home service cases
        builder.addCase(updateHomeService.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            state.updateSuccess = false;
        });
        builder.addCase(updateHomeService.fulfilled, (state, action) => {
            state.isLoading = false;
            state.homeService = action.payload;
            state.updateSuccess = true;
            state.isSuccess = true;
            state.successMessage =
                action.payload.message || "Home Service Updated successfully";
        });
        builder.addCase(updateHomeService.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.updateSuccess = false;
        });

        // Delete home service cases
        builder.addCase(deleteHomeService.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        });
        builder.addCase(deleteHomeService.fulfilled, (state) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
        });
        builder.addCase(deleteHomeService.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.error = action.payload
                ? action.payload.errorMessage
                : action.error.message;
        });
    },
});

export const { resetHomeService, clearUpdateStatus } = homeServiceSlice.actions;

export const selectHomeServiceState = (state) => state.homeService;

export default homeServiceSlice.reducer;