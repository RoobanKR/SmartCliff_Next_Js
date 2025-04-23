import { getAPIURL } from '@/utils/utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
 
const initialState = {
  contactPages: [],
  loading: false,
  error: null,
};
 
export const getAllContactPages = createAsyncThunk(
  'contactPage/fetchAll',
  async () => {
    const response = await axios.get(`${getAPIURL()}/getAll/contact-page`);
    console.log("API Raw Response:", response.data);
    return response.data.getAllContactPages;
  }
);
 
 
const contactPageSlice = createSlice({
  name: 'contactPage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllContactPages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllContactPages.fulfilled, (state, action) => {
        state.loading = false;
        state.contactPages = action.payload;
      })
      .addCase(getAllContactPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});
 
export default contactPageSlice.reducer;
 