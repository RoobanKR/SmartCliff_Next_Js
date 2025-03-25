import { getAPIURL } from '@/utils/utils';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

// Async thunk for fetching all colleges

export const fetchAllColleges = createAsyncThunk('colleges/fetchAllColleges', async () => {

    const response = await axios.get(`${getAPIURL()}/getAll/degreeprogram/college`);

    return response.data.colleges;

});

// Async thunk for fetching a college by ID

export const fetchCollegeById = createAsyncThunk('colleges/fetchCollegeById', async (id) => {

    const response = await axios.get(`${getAPIURL()}/getById/colleges/${id}`);

    return response.data.college;

});

// Async thunk for deleting a college

export const deleteCollege = createAsyncThunk('colleges/deleteCollege', async (id) => {

    const response = await axios.delete(`${getAPIURL()}/delete/colleges/${id}`);

    return { id, message: response.data.message[0].value };

});

// Async thunk for creating a new college

export const createCollege = createAsyncThunk('colleges/createCollege', async (formData) => {

    const response = await axios.post(`${getAPIURL()}/create/colleges`, formData, {

        headers: { 'Content-Type': 'multipart/form-data' }

    });

    return response.data.message[0].value;

});

// Async thunk for updating an existing college

export const updateCollege = createAsyncThunk('colleges/updateCollege', async ({ id, formData }) => {

    const response = await axios.put(`${getAPIURL()}/update/colleges/${id}`, formData, {

        headers: { 'Content-Type': 'multipart/form-data' }

    });

    return response.data.message[0].value;

});

// Create the slice

const collegeSlice = createSlice({

    name: 'colleges',

    initialState: {

        colleges: [],

        currentCollege: null,

        loading: false,

        error: null,

    },

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(fetchAllColleges.pending, (state) => {

                state.loading = true;

            })

            .addCase(fetchAllColleges.fulfilled, (state, action) => {

                state.loading = false;

                state.colleges = action.payload;

            })

            .addCase(fetchAllColleges.rejected, (state, action) => {

                state.loading = false;

                state.error = action.error.message;

            })

            .addCase(fetchCollegeById.fulfilled, (state, action) => {

                state.currentCollege = action.payload;

            })

            .addCase(deleteCollege.fulfilled, (state, action) => {

                state.colleges = state.colleges.filter((college) => college._id !== action.payload.id);

            })

            .addCase(createCollege.fulfilled, (state, action) => {

                // Optionally, you can add the new college to the list

                // state.colleges.push(action.payload);

            })

            .addCase(updateCollege.fulfilled, (state, action) => {

                // Optionally, you can update the college in the list

                const index = state.colleges.findIndex(college => college._id === action.payload._id);

                if (index !== -1) {

                    state.colleges[index] = action.payload; // Update the college in the list

                }

            });

    },

});

// Export the actions and reducer

export const { } = collegeSlice.actions;

export default collegeSlice.reducer;
