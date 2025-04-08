import { getAPIURL } from '@/utils/utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching all companies
export const fetchAllCompanies = createAsyncThunk('companies/fetchAllCompanies', async () => {
    const response = await axios.get(`${getAPIURL()}/getAll/degreeprogram/company`);
    return response.data.companys;
});

// Async thunk for fetching a company by ID
export const fetchCompanyById = createAsyncThunk('companies/fetchCompanyById', async (id) => {
    const response = await axios.get(`${getAPIURL()}/getById/degreeprogram/company/${id}`);
    return response.data.company;
});

// Async thunk for deleting a company
export const deleteCompany = createAsyncThunk('companies/deleteCompany', async (id) => {
    const response = await axios.delete(`${getAPIURL()}/delete/degreeprogram/company/${id}`);
    return { id, message: response.data.message[0].value };
});

// Async thunk for creating a new company
export const createCompany = createAsyncThunk('companies/createCompany', async (formData) => {
    const response = await axios.post(`${getAPIURL()}/create/degreeprogram/company`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.message[0].value;
});

// Async thunk for updating an existing company
export const updateCompany = createAsyncThunk('companies/updateCompany', async ({ id, formData }) => {
    const response = await axios.put(`${getAPIURL()}/update/degreeprogram/company/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.message[0].value;
});

// Create the slice
const companySlice = createSlice({
    name: 'companies',
    initialState: {
        companies: [],
        currentCompany: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCompanies.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllCompanies.fulfilled, (state, action) => {
                state.loading = false;
                state.companies = action.payload;
            })
            .addCase(fetchAllCompanies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchCompanyById.fulfilled, (state, action) => {
                state.currentCompany = action.payload;
            })
            .addCase(deleteCompany.fulfilled, (state, action) => {
                state.companies = state.companies.filter((company) => company._id !== action.payload.id);
            })
            .addCase(createCompany.fulfilled, (state, action) => {
                // Optionally, you can add the new company to the list
                // state.companies.push(action.payload);
            })
            .addCase(updateCompany.fulfilled, (state, action) => {
                // Optionally, you can update the company in the list
                const index = state.companies.findIndex(company => company._id === action.payload._id);
                if (index !== -1) {
                    state.companies[index] = action.payload; // Update the company in the list
                }
            });
    },
});

// Export the actions and reducer
export const { } = companySlice.actions;
export default companySlice.reducer;