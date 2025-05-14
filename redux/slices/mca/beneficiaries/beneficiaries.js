import { getAPIURL } from '@/utils/utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all DPBeneficiaries
export const getAllDPBeneficiaries = createAsyncThunk(
    'dpBeneficiaries/getAllDPBeneficiaries',
    async () => {
        const response = await axios.get(`${getAPIURL()}/getAll/dp-beneficiaries`);
        return response.data.getAllDpBeneficiaries;
    }
);

// Fetch DPBeneficiary by ID
export const getDPBeneficiaryById = createAsyncThunk(
    'dpBeneficiaries/getDPBeneficiaryById',
    async (beneficiaryId) => {
        const response = await axios.get(`${getAPIURL()}/getById/dp-beneficiaries/${beneficiaryId}`);
        return response.data.getAllDpBeneficiaries;
    }
);

const dpBeneficiariesSlice = createSlice({
    name: 'dpBeneficiaries',
    initialState: {
        dpBeneficiaries: [], // This will hold all beneficiaries when fetched
        loading: false,
        error: null,
        selectedBeneficiary: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllDPBeneficiaries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllDPBeneficiaries.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.dpBeneficiaries = action.payload; // Update dpBeneficiaries with all beneficiaries
            })
            .addCase(getAllDPBeneficiaries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getDPBeneficiaryById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDPBeneficiaryById.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.selectedBeneficiary = action.payload; // Update selectedBeneficiary with the fetched beneficiary
            })
            .addCase(getDPBeneficiaryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default dpBeneficiariesSlice.reducer;
