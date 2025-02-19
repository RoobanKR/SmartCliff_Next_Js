
import { getAPIURL } from "@/utils/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
// import { successToast, errorToast } from "../../../../toaster";
// import { getAPIURL } from "../../../../../utils/utils";

export const getAllBusinessServices = createAsyncThunk(
  "businessService/getAllBusinessServices",
  async () => {
    try {
      const response = await Axios.get(`${getAPIURL()}/getAll/business-services`);
      return response.data.get_all_businessservices;
    } catch (error) {
      throw error;
    }
  }
);

export const createBusinessService = createAsyncThunk(
  "businessService/createBusinessService",
  async ({ formData, token }) => {
    try {
      const response = await Axios.post(
        `${getAPIURL()}/create/business-services`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getByIdBusinessService = createAsyncThunk(
  "businessService/getByIdBusinessService",
  async (bussinessServiceId) => { // ✅ Expecting a string, not an object
    try {
      const response = await Axios.get(
        `${getAPIURL()}/getById/business-services/${bussinessServiceId}`
      );
      return response.data.businessserviceById;
    } catch (error) {
      throw Error("Error fetching businessService details");
    }
  }
);

export const updateBusinessService = createAsyncThunk(
  "businessService/update",
  async ({ bussinessServiceId, formData, token }) => {
    try {
      const response = await Axios.put(
        `${getAPIURL()}/update/business-service/${bussinessServiceId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw Error("Error updating businessService");
    }
  }
);
export const deleteBusinessService = createAsyncThunk(
  "businessService/deleteBusinessService",
  async ({ bussinessServiceId, token }) => {
    try {
      const response = await Axios.delete(
        `${getAPIURL()}/delete/business-service/${bussinessServiceId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw Error("Error deleting businessService");
    }
  }
);
// Create the category reducer
const businessServiceReducer = createSlice({
  name: "businessService",
  initialState: {
    businessServiceData: [],
    status: "idle",
    error: "",
    businessService: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    selectedService: null,
  },
  reducers: {
    resetBusinessService: (state, action) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBusinessServices.pending, (state) => {
        state.status = "isLoading";
      })
      .addCase(getAllBusinessServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.businessServiceData = action.payload;
      })
      .addCase(getAllBusinessServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createBusinessService.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(createBusinessService.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.isSuccess = true;
      })

      .addCase(createBusinessService.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.payload
          ? action.payload.errorMessage
          : action.error.message;
        if (action.payload) {
          state.error = action.payload.errorMessage;
          console.log("error", action.payload.message[0].value);
        } else {
          state.error = action.error.message;
          console.log("error", action);
        }
      })
      .addCase(getByIdBusinessService.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getByIdBusinessService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedService = action.payload;
        state.existingImages = action.payload.image
          ? [action.payload.image]
          : [];
      })

      .addCase(getByIdBusinessService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateBusinessService.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBusinessService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.businessService = action.payload;
      })
      .addCase(updateBusinessService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteBusinessService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBusinessService.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteBusinessService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetBusinessService } = businessServiceReducer.actions;
export const selectBusinessServices = (state) => state.businessService.businessServiceData;
export const selectAddBusinessServiceError = (state) => state.businessService.error;
export default businessServiceReducer.reducer;

