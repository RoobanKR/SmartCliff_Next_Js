import { getAPIURL } from "@/utils/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

// Get all home services
export const getAllHomeServicesCount = createAsyncThunk(
    "homeServices/getAllHomeServicesCount",
    async () => {
        try {
            const response = await Axios.get(`${getAPIURL()}/getAll/home/services-count`);
            return response.data.get_all_home_service;
        } catch (error) {
            throw error;
        }
    }
);

// Get home service by ID
export const getHomeServiceCountById = createAsyncThunk(
    "homeServices/fetchById",
    async (id) => {
        try {
            const response = await Axios.get(
                `${getAPIURL()}/getById/home/services-count/${id}`
            );
            return response.data.homeServiceById;
        } catch (error) {
            throw Error("Error fetching Home Service details");
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
        builder.addCase(getAllHomeServicesCount.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getAllHomeServicesCount.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.homeServices = action.payload;
        });
        builder.addCase(getAllHomeServicesCount.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });

        // Get home service by ID cases
        builder.addCase(getHomeServiceCountById.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getHomeServiceCountById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.homeServiceById = action.payload;
        });
        builder.addCase(getHomeServiceCountById.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

    },
});

export const { resetHomeService, clearUpdateStatus } = homeServiceSlice.actions;

export const selectHomeServiceState = (state) => state.homeService;

export default homeServiceSlice.reducer;