import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAPIURL } from "/utils/utils";

export const createServiceAbout = createAsyncThunk(
    "serviceAbout/post",
    async (formData) => {
        try {
            const response = await axios.post(
                `${getAPIURL()}/create/service-about`,
                formData
            );
            return response.data;
        } catch (error) {
            throw new Error(
                error.response.data.message || "Failed to add serviceAbout"
            );
        }
    }
);

export const getAllServiceAbout = createAsyncThunk(
    "serviceAbout/getAll",
    async () => {
        try {
            const response = await axios.get(
                `${getAPIURL()}/getAll/service-about`
            );
            return response.data.get_all_services_about;
        } catch (error) {
            throw error;
        }
    }
);
export const getServiceAboutById = createAsyncThunk(
    "serviceAbout/getById",
    async (id) => {
        try {
            const response = await axios.get(
                `${getAPIURL()}/getById/service-about/${id}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);
export const updateServiceAbout = createAsyncThunk(
    "serviceAbout/updateServiceAbout",
    async ({ id, formData }) => {
        try {
            const response = await axios.put(
                `${getAPIURL()}/update/service-about/${id}`,
                formData
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const deleteServiceAbout = createAsyncThunk(
    "serviceAbout/deleteServiceAbout",
    async (id) => {
        try {
            await axios.delete(
                `${getAPIURL()}/delete/service-about/${id}`
            );
            return id;
        } catch (error) {
            throw error;
        }
    }
);
const initialState = {
    loading: false,
    error: null,
    successMessage: "",
    serviceAbouts: [],
    selectedServiceAboutById: null,
    serviceAboutData: [],
};

const ServiceAboutSlice = createSlice({
    name: "serviceAbout",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createServiceAbout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createServiceAbout.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage =
                    action.payload.message || "serviceAbout added successfully";
            })
            .addCase(createServiceAbout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to add serviceAbout";
            })
            .addCase(getAllServiceAbout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllServiceAbout.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.serviceAbouts = action.payload;
            })
            .addCase(getAllServiceAbout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getServiceAboutById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getServiceAboutById.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.selectedServiceAboutById = action.payload.testimonialById;
            })
            .addCase(getServiceAboutById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateServiceAbout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateServiceAbout.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.serviceAbouts = action.payload;
            })
            .addCase(updateServiceAbout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteServiceAbout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteServiceAbout.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteServiceAbout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default ServiceAboutSlice.reducer;

