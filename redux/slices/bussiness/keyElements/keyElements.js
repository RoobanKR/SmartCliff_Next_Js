import { getAPIURL } from "@/utils/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 
export const getAllKeyElements = createAsyncThunk(
  "keyElements/getAll",
  async () => {
    try {
      const response = await axios.get(`${getAPIURL()}/getAll/key_elements`);
      return response.data.All_Key_Elements;
    } catch (error) {
      throw error;
    }
  }
);
export const getKeyElementsById = createAsyncThunk(
  "keyElements/getById",
  async (id) => {
    try {
      const response = await axios.get(
        `${getAPIURL()}/getById/key_elements/${id}`
      );
      return response.data.Key_Element_Id_Based;
    } catch (error) {
      throw error;
    }
  }
);
// Define the initial state
const initialState = {
  loading: false,
  error: null,
  successMessage: "",
  keyElements: [],
  Key_Element_Id_Based: null,
};
 
const keyElementsSlice = createSlice({
  name: "keyElements",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllKeyElements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllKeyElements.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.keyElements = action.payload;
      })
      .addCase(getAllKeyElements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getKeyElementsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getKeyElementsById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.Key_Element_Id_Based = action.payload;
      })
      .addCase(getKeyElementsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});
 
export default keyElementsSlice.reducer;
 