import { getAPIURL } from "@/utils/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
 
export const createTrainFromUs = createAsyncThunk(
  "trainfromus/addForm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${getAPIURL()}/create/train_from_us`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response
        return rejectWithValue(errorData); // Return the structured error
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({ message: [{ key: "error", value: error.message }] });
    }
  }
);

const initialState = {
  status: "idle",
  error: null,
  formData: {
    name: "",
    company_name: "",
    mobile: "",
    email: "",
    enquiry: "",
    skillsetRequirements:[],
    trainee_modal:"",
  },
};
 
const trainfromusSlice = createSlice({
  name: "trainfromus",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTrainFromUs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createTrainFromUs.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action.payload);
      })
      .addCase(createTrainFromUs.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});
 
export const { updateFormData } = trainfromusSlice.actions;
 
export default trainfromusSlice.reducer;