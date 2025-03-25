import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { getAPIURL } from "../../../utils/utils";

// Create WCU
export const createWCU = createAsyncThunk(
"wcu/createWCU",
async ({ formData, token }) => {
    try {
    const response = await Axios.post(
        `${getAPIURL()}/create/wcu`,
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

// Get all WCU items
export const getAllWCU = createAsyncThunk(
"wcu/getAllWCU",
async () => {
    try {
    const response = await Axios.get(`${getAPIURL()}/getAll/wcu`);
    return response.data.getAllWCU;
    } catch (error) {
    throw error;
    }
}
);

// Get WCU by ID
export const getWCUById = createAsyncThunk(
"wcu/getWCUById",
async (wcuId) => {
    try {
    const response = await Axios.get(
        `${getAPIURL()}/getById/wcu/${wcuId}`
    );
    return response.data.wcuById;
    } catch (error) {
    throw Error("Error fetching WCU details");
    }
}
);

// Update WCU
export const updateWCU = createAsyncThunk(
"wcu/updateWCU",
async ({ wcuId, formData, token }) => {
    try {
    const response = await Axios.put(
        `${getAPIURL()}/update/wcu/${wcuId}`,
        formData,
        {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
        }
    );
    return response.data.wcu;
    } catch (error) {
    throw Error("Error updating WCU");
    }
}
);

// Delete WCU
export const deleteWCU = createAsyncThunk(
"wcu/deleteWCU",
async (wcuId) => {
    try {
    const response = await Axios.delete(
        `${getAPIURL()}/delete/wcu/${wcuId}`
    );
    return response.data;
    } catch (error) {
    throw error.response ? error.response.data : error;
    }
}
);

const wcuSlice = createSlice({
name: "wcu",
initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: "",
    wcuItems: [],
    wcuItem: {},
    wcuById: null,
},
reducers: {
    resetWCU: (state) => {
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
    // Create WCU cases
    builder.addCase(createWCU.pending, (state) => {
    state.isLoading = true;
    state.isSuccess = false;
    state.isError = false;
    });
    builder.addCase(createWCU.fulfilled, (state) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    });
    builder.addCase(createWCU.rejected, (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.isError = true;
    state.error = action.payload
        ? action.payload.errorMessage
        : action.error.message;
    });

    // Get all WCU cases
    builder.addCase(getAllWCU.pending, (state) => {
    state.isLoading = true;
    state.isError = false;
    });
    builder.addCase(getAllWCU.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isError = false;
    state.wcuItems = action.payload;
    });
    builder.addCase(getAllWCU.rejected, (state) => {
    state.isLoading = false;
    state.isError = true;
    });

    // Get WCU by ID cases
    builder.addCase(getWCUById.pending, (state) => {
    state.isLoading = true;
    state.error = null;
    });
    builder.addCase(getWCUById.fulfilled, (state, action) => {
    state.isLoading = false;
    state.wcuById = action.payload;
    });
    builder.addCase(getWCUById.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.error.message;
    });

    // Update WCU cases
    builder.addCase(updateWCU.pending, (state) => {
    state.isLoading = true;
    state.error = null;
    state.updateSuccess = false;
    });
    builder.addCase(updateWCU.fulfilled, (state, action) => {
    state.isLoading = false;
    state.wcuItem = action.payload;
    state.updateSuccess = true;
    state.isSuccess = true;
    state.successMessage =
        action.payload.message || "WCU Updated successfully";
    });
    builder.addCase(updateWCU.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.error.message;
    state.updateSuccess = false;
    });

    // Delete WCU cases
    builder.addCase(deleteWCU.pending, (state) => {
    state.isLoading = true;
    state.isSuccess = false;
    state.isError = false;
    });
    builder.addCase(deleteWCU.fulfilled, (state) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    });
    builder.addCase(deleteWCU.rejected, (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.isError = true;
    state.error = action.payload
        ? action.payload.errorMessage
        : action.error.message;
    });
},
});

export const { resetWCU, clearUpdateStatus } = wcuSlice.actions;

export const selectWCUState = (state) => state.wcu;

export default wcuSlice.reducer;