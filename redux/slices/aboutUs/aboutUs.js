import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { getAPIURL } from "../../../utils/utils";

// Create AboutUs
export const createAboutUs = createAsyncThunk(
    "aboutUs/createAboutUs",
    async ({ formData, token }) => {
        try {
            const response = await Axios.post(
                `${getAPIURL()}/create/about/aboutus`,
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
            throw error.response ? error.response.data : error;
        }
    }
);

// Get all AboutUs items
export const getAllAboutUs = createAsyncThunk(
    "aboutUs/getAllAboutUs",
    async () => {
        try {
            const response = await Axios.get(`${getAPIURL()}/getAll/about/aboutus`);
            return response.data.getAllAboutUs;
        } catch (error) {
            throw error;
        }
    }
);

// Get AboutUs by ID
export const getAboutUsById = createAsyncThunk(
    "aboutUs/getAboutUsById",
    async (aboutUsId) => {
        try {
            const response = await Axios.get(
                `${getAPIURL()}/getById/about/aboutus/${aboutUsId}`
            );
            return response.data.aboutUsById;
        } catch (error) {
            throw Error("Error fetching AboutUs details");
        }
    }
);

// Update AboutUs
export const updateAboutUs = createAsyncThunk(
    "aboutUs/updateAboutUs",
    async ({ aboutUsId, formData, token }) => {
        try {
            const response = await Axios.put(
                `${getAPIURL()}/update/about/aboutus/${aboutUsId}`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.aboutUs;
        } catch (error) {
            throw Error("Error updating AboutUs");
        }
    }
);

// Delete AboutUs
export const deleteAboutUs = createAsyncThunk(
    "aboutUs/deleteAboutUs",
    async (aboutUsId) => {
        try {
            const response = await Axios.delete(
                `${getAPIURL()}/delete/about/aboutus/${aboutUsId}`
            );
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }
);

const aboutUsSlice = createSlice({
    name: "aboutUs",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        error: "",
        aboutUsItems: [],
        aboutUsItem: {},
        aboutUsById: null,
    },
    reducers: {
        resetAboutUs: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.error = "";
        },
        clearUpdateStatus: (state) => {
            state.updateSuccess = false;
            state.updateError = null;
        },
    },
    extraReducers: (builder) => {
        // Create AboutUs cases
        builder.addCase(createAboutUs.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        });
        builder.addCase(createAboutUs.fulfilled, (state) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
        });
        builder.addCase(createAboutUs.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.error = action.payload
                ? action.payload.errorMessage
                : action.error.message;
        });

        // Get all AboutUs cases
        builder.addCase(getAllAboutUs.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getAllAboutUs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.aboutUsItems = action.payload;
        });
        builder.addCase(getAllAboutUs.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });

        // Get AboutUs by ID cases
        builder.addCase(getAboutUsById.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getAboutUsById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.aboutUsById = action.payload;
        });
        builder.addCase(getAboutUsById.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Update AboutUs cases
        builder.addCase(updateAboutUs.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            state.updateSuccess = false;
        });
        builder.addCase(updateAboutUs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.aboutUsItem = action.payload;
            state.updateSuccess = true;
            state.isSuccess = true;
            state.successMessage =
                action.payload.message || "AboutUs Updated successfully";
        });
        builder.addCase(updateAboutUs.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.updateSuccess = false;
        });

        // Delete AboutUs cases
        builder.addCase(deleteAboutUs.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        });
        builder.addCase(deleteAboutUs.fulfilled, (state) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
        });
        builder.addCase(deleteAboutUs.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.error = action.payload
                ? action.payload.errorMessage
                : action.error.message;
        });
    },
});

export const { resetAboutUs, clearUpdateStatus } = aboutUsSlice.actions;

export const selectAboutUsState = (state) => state.aboutUs;

export default aboutUsSlice.reducer;






// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import Axios from "axios";
// import { getAPIURL } from "../../../utils/utils";
// export const  apiUrl = process.env.NEXT_PUBLIC_API_URL;
// const API_URL = process.env.NEXT_PUBLIC_API_URL;
// import config from "../../../utils/utils"; // Import the centralized config

// // 2. For debugging, check if any environment variables are loading
// console.log('Environment check:', {
//   NODE_ENV: process.env.NODE_ENV,
//   NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
//   NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME
// });


// export const getAllAboutUs = createAsyncThunk(
//   "aboutUs/getAllAboutUs",
//   async () => {
//     try {
//       console.log('API_URL being used:', config.apiUrl); // Use the config object
//       const response = await Axios.get(`${config.apiUrl}/getAll/about/aboutus`);
//       return response.data.getAllAboutUs;
//     } catch (error) {
//       console.error('API request failed:', error);
//       throw error;
//     }
//   }
// );