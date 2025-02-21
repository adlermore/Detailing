import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logger } from "@/store/logger";
import { API_URL, API_URL_FMCSA } from "@/utils/constants";

const name = 'register';

const initialState = {
    loading: false,
    data: null,
    getCityByZipCode: [],
    usdotValues: {},
    usdotValuesStatus: '',
};

export const getCoverData = createAsyncThunk(
    `${name}/getCoverData`,
    async () =>
        logger({
            method: "GET",
            url: `${API_URL_FMCSA}/fetch-data`,
        })
);


export const getCityByZipCode = createAsyncThunk(
    `${name}/getCityByZipCode`,
    async (term, { rejectWithValue }) => {
        try {
            return await logger({
                method: "GET",
                url: `${API_URL}/zipCodeOrCity?zip_code=${term || ''}`,
            })
        } catch (err) {
            return rejectWithValue(err)
        }
    }
);


export const getUsdotValuesByNumber = createAsyncThunk(
    `${name}/getUsdotValuesByNumber`,
    async ({ usdotNumber }, { rejectWithValue }) => {
        try {
            return await logger({
                method: 'GET',
                url: `${API_URL}/usdotVerify/${usdotNumber}`
            })
        } catch (error) {
            return rejectWithValue(error);

        }
    }
);

export const registerSlice = createSlice({
    name,
    initialState,
    extraReducers: (builder) => {

        builder.addCase(getCoverData.fulfilled, (state, { payload }) => {
            state.data = payload || {}

            state.usdotValues = payload?.usdotValues?.content?.carrier ? payload.data : {};
            state.usdotValuesStatus = payload?.usdotValues?.content?.carrier ? 'success' : 'failed';

        });

        builder.addCase(getCityByZipCode.fulfilled, (state, { payload }) => {
            state.getCityByZipCode = [...payload?.data || []];
        });

    }
});

export const selectBaseStates = state => state.register.data?.states?.filter(state => state.base_state === 1);
export const selectAllStates = state => state.register.data?.states;
export const selectContactInfo = state => state.register.data?.contact_info;
export const selectOperate = state => state.register.data?.operate_dots;
export const selectRegTypes = state => state.register.data?.registrant_types;
export const selectOfficerTypes = state => state.register.data?.officer_types;
export const selectgvws = state => state.register.data?.gvws;
export const selectJurisdictions = state => state.register.data?.jurisdictions;
export const selectUsdotValues = state => state.register.usdotValues;
export const selectExtraData = state => state.register.data;
export const selectAppTypes = state => state.register.data?.application_types;

export default registerSlice.reducer;