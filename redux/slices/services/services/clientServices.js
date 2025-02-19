import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAPIURL } from "@/utils/utils";

// Async thunks
export const getAllServiceClients = createAsyncThunk(
    "clientService/getAllServiceClients",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${getAPIURL()}/getAll/service-clients`);
            return response.data.get_all_services_Client; // Updated to match backend response
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getServiceClientById = createAsyncThunk(
    "clientService/getServiceClientById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${getAPIURL()}/get/service-clients/${id}`);
            return response.data.service_client; // Match backend response
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createServiceClient = createAsyncThunk(
    "clientService/createServiceClient",
    async ({ formData, token }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${getAPIURL()}/create/service-clients`,
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
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateServiceClient = createAsyncThunk(
    "clientService/updateServiceClient",
    async ({ id, formData, token }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${getAPIURL()}/update/service-clients/${id}`,
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
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteServiceClient = createAsyncThunk(
    "clientService/deleteServiceClient",
    async ({ id, token }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${getAPIURL()}/delete/service-clients/${id}`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return { id, ...response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Initial state
const initialState = {
    serviceClientData: [],
    selectedClient: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
    message: null,
};

// Slice
const serviceClientSlice = createSlice({
    name: "clientService",
    initialState,
    reducers: {
        resetServiceClient: (state) => {
            state.isSuccess = false;
            state.isError = false;
            state.error = null;
            state.message = null;
        },
        clearSelectedClient: (state) => {
            state.selectedClient = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Get All Service Clients
            .addCase(getAllServiceClients.pending, (state) => {
                state.status = "loading";
                state.isLoading = true;
            })
            .addCase(getAllServiceClients.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.serviceClientData = action.payload;
                state.isLoading = false;
            })
            .addCase(getAllServiceClients.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload?.message || action.error.message;
                state.isLoading = false;
                state.isError = true;
            })

            // Get Service Client By ID
            .addCase(getServiceClientById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getServiceClientById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedClient = action.payload;
            })
            .addCase(getServiceClientById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload?.message || action.error.message;
            })

            // Create Service Client
            .addCase(createServiceClient.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.error = null;
            })
            .addCase(createServiceClient.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                // Optionally add the new client to the state
                // state.serviceClientData.push(action.payload.newClients);
            })
            .addCase(createServiceClient.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.error = action.payload?.message || action.error.message;
            })

            // Update Service Client
            .addCase(updateServiceClient.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.error = null;
            })
            .addCase(updateServiceClient.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = action.payload.message;

                // Update the state with the updated client
                if (state.selectedClient && state.selectedClient._id === action.payload.updatedClient._id) {
                    state.selectedClient = action.payload.updatedClient;
                }

                const index = state.serviceClientData.findIndex(
                    (client) => client._id === action.payload.updatedClient._id
                );
                if (index !== -1) {
                    state.serviceClientData[index] = action.payload.updatedClient;
                }
            })
            .addCase(updateServiceClient.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.error = action.payload?.message || action.error.message;
            })

            // Delete Service Client
            .addCase(deleteServiceClient.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.error = null;
            })
            .addCase(deleteServiceClient.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = action.payload.message;

                // Filter out the deleted client from state
                state.serviceClientData = state.serviceClientData.filter(
                    (client) => client._id !== action.payload.id
                );

                if (state.selectedClient && state.selectedClient._id === action.payload.id) {
                    state.selectedClient = null;
                }
            })
            .addCase(deleteServiceClient.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.error = action.payload?.message || action.error.message;
            });
    },
});

// Actions
export const { resetServiceClient, clearSelectedClient } = serviceClientSlice.actions;

// Selectors
export const selectServiceClients = (state) => state.clientService.serviceClientData;
export const selectSelectedClient = (state) => state.clientService.selectedClient;
export const selectServiceClientError = (state) => state.clientService.error;
export const selectServiceClientMessage = (state) => state.clientService.message;
export const selectServiceClientLoading = (state) => state.clientService.isLoading;
export const selectServiceClientSuccess = (state) => state.clientService.isSuccess;
export const selectServiceClientStatus = (state) => state.clientService.status;

export default serviceClientSlice.reducer;