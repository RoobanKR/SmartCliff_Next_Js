import { getAPIURL } from "@/utils/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const addCareerForm = createAsyncThunk(
  "careerForm/addCareerForm",
  async (formData) => {
    try {
      const response = await Axios.post(
        `${getAPIURL()}/create/career-form`,
        formData
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


export const fetchCareersForm = createAsyncThunk(
  "careerForm/fetchCareersForm",
  async () => {
    try {
      const response = await Axios.get(`${getAPIURL()}/getAll/career-form`);
      return response.data.allCareersForm;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchCareerById = createAsyncThunk(
  "careerForm/fetchById",
  async (careerId) => {
    try {
      const response = await Axios.get(
        `${getAPIURL()}/getById/career-form/${careerId}`
      );
      return response.data.career;
    } catch (error) {
      throw Error("Error fetching Career details");
    }
  }
);

export const updateCareer = createAsyncThunk(
  "careerForm/update",
  async ({ careerId, formData }) => {
    try {
      const response = await Axios.put(
        `${getAPIURL()}/update/career-form/${careerId}`,
        formData
      );
      return response.data;
    } catch (error) {
      throw Error("Error updating Career");
    }
  }
);

export const deleteCareer = createAsyncThunk(
  "careerForm/deleteCareer",
  async (careerId) => {
    try {
      const response = await Axios.delete(
        `${getAPIURL()}/delete/career-form/${careerId}`
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }
);

const careerSlice = createSlice({
  name: "careerForm",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: "",
    careers: [],
    careerForm: {},
    careerById: null,
  },
  reducers: {
    resetCareer: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
      builder.addCase(addCareerForm.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      builder.addCase(addCareerForm.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action.payload);
      })
      builder.addCase(addCareerForm.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      }),
    builder.addCase(fetchCareersForm.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchCareersForm.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.careers = action.payload;
    });
    builder.addCase(fetchCareersForm.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(fetchCareerById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCareerById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.careerById = action.payload;
    });
    builder.addCase(fetchCareerById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateCareer.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateCareer.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(updateCareer.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteCareer.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(deleteCareer.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(deleteCareer.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.payload
        ? action.payload.message[0].value
        : action.error.message;
    });
  },
});

export const { resetCareer } = careerSlice.actions;

export const selectCareerState = (state) => state.careerForm;

export default careerSlice.reducer;
