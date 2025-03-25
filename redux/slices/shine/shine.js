import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAPIURL } from "../../../utils/utils";
 
 
// Async thunks
export const getAllShine = createAsyncThunk(
    "shine/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${getAPIURL()}/getAll/about/shine/`);
            return response.data.get_all_shine;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch data");
        }
    }
);
 
 
const shineSlice = createSlice({
    name: "shine",
    initialState: {
        shines: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllShine.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllShine.fulfilled, (state, action) => {
                state.loading = false;
                state.shines = action.payload;
            })
            .addCase(getAllShine.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
 
export default shineSlice.reducer;
 
 
 
 