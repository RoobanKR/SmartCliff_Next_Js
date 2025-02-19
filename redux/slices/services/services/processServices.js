import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAPIURL } from "../../../../utils/utils";

export const getAllServiceProcess = createAsyncThunk(
    "serviceProcess/getAllServiceProcess",
    async () => {
        try {
            const response = await axios.get(`${getAPIURL()}/getAll/service-process`);
            return response.data.get_all_services_process;
        } catch (error) {
            throw error;
        }
    }
);

export const createServiceProcess = createAsyncThunk(
    "serviceProcess/createServiceProcess",
    async ({ formData, token }) => {
        try {
            const response = await axios.post(
                `${getAPIURL()}/create/service-process`,
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
            throw error;
        }
    }
);

const initialState = {
    serviceProcessData: [],
    status: "idle",
    error: null,
    selectedServiceProcess: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
};

const ServiceProcessSlice = createSlice({
    name: "processService", // Changed to match store configuration
    initialState,
    reducers: {
        resetServiceProcess: (state) => {
            state.isSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllServiceProcess.pending, (state) => {
                state.status = "loading";
                state.isLoading = true;
            })
            .addCase(getAllServiceProcess.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.serviceProcessData = action.payload;
                state.isLoading = false;
            })
            .addCase(getAllServiceProcess.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
                state.isLoading = false;
            })
            .addCase(createServiceProcess.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.error = null;
            })
            .addCase(createServiceProcess.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.error = null;
                state.isSuccess = true;
            })
            .addCase(createServiceProcess.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.error = action.payload
                    ? action.payload.errorMessage
                    : action.error.message;
            });
    },
});

export const { resetServiceProcess } = ServiceProcessSlice.actions;

// Updated selectors to match store configuration
export const selectProcessServices = (state) => state.processService.serviceProcessData;
export const selectAddServiceProcessError = (state) => state.processService.error;
export const selectServiceProcessLoading = (state) => state.processService.isLoading;

export default ServiceProcessSlice.reducer;