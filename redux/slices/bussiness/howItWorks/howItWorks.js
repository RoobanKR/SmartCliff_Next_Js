import { getAPIURL } from '@/utils/utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllHowItWorks = createAsyncThunk('howItWorks/fetchAllHowItWorks', async () => {
    const response = await axios.get(`${getAPIURL()}/getAll/business/how-it-works`);
    return response.data.howitworks; 
});

export const fetchHowItWorkById = createAsyncThunk('howItWorks/fetchHowItWorkById', async (id) => {
    const response = await axios.get(`${getAPIURL()}/getById/business/how-it-works/${id}`);
    return response.data.howitwork; 
});

export const deleteHowItWork = createAsyncThunk('howItWorks/deleteHowItWork', async (id) => {
    const response = await axios.delete(`${getAPIURL()}/delete/business/how-it-works/${id}`);
    return { id, message: response.data.message[0].value };
});

export const createHowItWork = createAsyncThunk('howItWorks/createHowItWork', async (formData) => {
    const response = await axios.post(`${getAPIURL()}/create/business/how-it-works`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.message[0].value; 
});

export const updateHowItWork = createAsyncThunk('howItWorks/updateHowItWork', async ({ id, formData }) => {
    const response = await axios.put(`${getAPIURL()}/update/business/howitworks/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.message[0].value; 
});

const howItWorksSlice = createSlice({
    name: 'howItWorks',
    initialState: {
        howItWorks: [],
        currentHowItWork: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllHowItWorks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllHowItWorks.fulfilled, (state, action) => {
                state.loading = false;
                state.howItWorks = action.payload;
            })
            .addCase(fetchAllHowItWorks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchHowItWorkById.fulfilled, (state, action) => {
                state.currentHowItWork = action.payload; 
            })
            .addCase(deleteHowItWork.fulfilled, (state, action) => {
                state.howItWorks = state.howItWorks.filter((howItWork) => howItWork._id !== action.payload.id);
            })
            .addCase(createHowItWork.fulfilled, (state, action) => {
            })
            .addCase(updateHowItWork.fulfilled, (state, action) => {
            });
    },
});

export const { } = howItWorksSlice.actions;
export default howItWorksSlice.reducer;