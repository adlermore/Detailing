import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { API_URL, API_URL_FMCSA, API_URL_GUEST } from "@/utils/constants";
import { guestLogger } from "@/store/guestLogger";

const name = 'registerGuest';

const initialState = {
    loading: false,
    data: null,
    storeData: null,
    extraData: null,
    members: [],
    vehicles: [],
    vehiclesMeta: {},
    membersMeta: {},
    getCityByZipCode: [],
    permitPrice : null,
    dataByVin: {},
    otherExtraValues: null,
    userId: null
};

export const userInfo = createAsyncThunk(
    `${name}/userInfo`,
    async ( props , { rejectWithValue }) => {
        try {
            return await guestLogger({
                method: "POST",
                url: `${API_URL_GUEST}`,
                body: props
            })
        } catch (err) {
            return rejectWithValue(err)
        }
    }
);


export const generate = createAsyncThunk(
    `${name}/generate`,
    async (props, { rejectWithValue }) => {
        try {
            return await guestLogger({
                method: "POST",
                url: `${API_URL_GUEST}/permit/generate`,
                body: props,
            })
        } catch (err) {
            return rejectWithValue(err)
        }
    }
);

////////// Members @###########
export const storeGuestMember = createAsyncThunk(
    `${name}/storeGuestMember`,
    async (props, { rejectWithValue }) => {
        try {
            return await guestLogger({
                method: "POST",
                url: `${API_URL_GUEST}/member/store`,
                body: props,
            })
        } catch (err) {
            return rejectWithValue(err)
        }
    }
);

export const editGuestMember = createAsyncThunk(
    `${name}/editGuestMember`,
    async ({elId, userId , permit_id}, { rejectWithValue }) => {
        try {
            return await guestLogger({
                method: "GET",
                url: `${API_URL_GUEST}/member/edit?id=${elId}&permit_id=${permit_id}&user_id=${userId}`,
            })
        } catch (err) {
            return rejectWithValue(err)
        }
    }
);

export const updateGuestMember = createAsyncThunk(
    `${name}/updateGuestMember`,
    async (body, { rejectWithValue }) => {
        try {
            return await guestLogger({
                method: "PUT",
                url: `${API_URL_GUEST}/member/update`,
                body
            })
        } catch (err) {
            return rejectWithValue(err)
        }
    }
);

export const deleteGuestMember = createAsyncThunk(
    `${name}/deleteGuestMember`,
    async (props, { rejectWithValue }) => {
        try {
            return await guestLogger({
                method: "DELETE",
                url: `${API_URL_GUEST}/member/delete`,
                body: props
            })
        } catch (err) {
            return rejectWithValue(err)
        }
    }
);

export const getGuestMembers = createAsyncThunk(
    `${name}/getGuestMembers`,
    async ({permit_id, userId , page} , { rejectWithValue }) => {
        try {
            return await guestLogger({
                method: "GET",
                url: `${API_URL_GUEST}/members?permit_id=${permit_id}&user_id=${userId}&page=${page}`,
            })
        } catch (err) {
            return rejectWithValue(err)
        }
    }
);

////////// Vehicles @###########
export const storeGuestVehicle = createAsyncThunk(
    `${name}/storeGuestVehicle`,
    async (props, { rejectWithValue }) => {
        try {
            return await guestLogger({
                method: "POST",
                url: `${API_URL_GUEST}/vehicle/store`,
                body: props
            })
        } catch (err) {
            return rejectWithValue(err)
        }
    }
);

export const editGuestVehicle = createAsyncThunk(
    `${name}/editGuestVehicle`,
    async ({ permit, id , user_id }, { rejectWithValue }) => {
        try {
            return await guestLogger({
                method: "GET",
                url: `${API_URL_GUEST}/vehicle/edit?id=${id}&user_id=${user_id}&permit_id=${permit}`,
            })
        } catch (err) {
            return rejectWithValue(err)
        }
    }
);

export const updateGuestVehicle = createAsyncThunk(
    `${name}/updateGuestVehicle`,
    async (body, { rejectWithValue }) => {
        try {
            return await guestLogger({
                method: "POST",
                url: `${API_URL_GUEST}/vehicle/update`,
                body
            })
        } catch (err) {
            return rejectWithValue(err)
        }
    }
);

export const deleteGuestVehicle = createAsyncThunk(
    `${name}/deleteGuestVehicle`,
    async (props, { rejectWithValue }) => {
        try {
            return await guestLogger({
                method: "DELETE",
                url: `${API_URL_GUEST}/vehicle/delete?${props.id}`,
                body: props
            })
        } catch (err) {
            return rejectWithValue(err)
        }
    }
);

export const getGuestVehicles = createAsyncThunk(
    `${name}/getGuestVehicles`,
    async ({permit_id, userId , page} , { rejectWithValue }) => {
        try {
            return await guestLogger({
                method: "GET",
                url: `${API_URL_GUEST}/vehicles?permit_id=${permit_id}&user_id=${userId}&page=${page || 1}`,
            })
        } catch (err) {
            return rejectWithValue(err)
        }
    }
);

export const getGuestPermit = createAsyncThunk(
    `${name}/getGuestPermit`,
    async ( props, { rejectWithValue }) => {
        try {
            return await guestLogger({
                method: "GET",
                url: `${API_URL_GUEST}/permit/details?application_type_id=${props.application_type_id}&state_id=${props.state_id}&user_id=${props.user_id}`,
            })
        } catch (err) {
            return rejectWithValue(err)
        }
    }
);

export const getCityByZipCode = createAsyncThunk(
    `${name}/getCityByZipCode`,
    async (term, { rejectWithValue }) => {
        try {
            return await guestLogger({
                method: "GET",
                url: `${API_URL_FMCSA}/billing-address?zip_code=${term || ''}`,
            })
        } catch (err) {
            return rejectWithValue(err)
        }
    }
);

export const getGuestDataByVin = createAsyncThunk(
    `${name}/getGuestDataByVin`,
    async (vinCode, { rejectWithValue }) => {
        try {
            return await guestLogger({
                method: 'GET',
                url: `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vinCode}/?format=json`
            })
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const ContactUs = createAsyncThunk(
    `${name}/ContactUs`,
    async (props, {rejectWithValue}) => {
        try {
            return await guestLogger({
                method: "POST",
                url: `${API_URL_FMCSA}/contact`,
                body: props,
            })
        } catch (err) {
            return rejectWithValue(err)
        }
    }
);


export const postComment = createAsyncThunk(
    `${name}/postComment`,
    async (props, {rejectWithValue}) => {
        try {
            return await guestLogger({
                method: "POST",
                url: `${API_URL}/comments`,
                body: props,
            })
        } catch (err) {
            return rejectWithValue(err)
        }
    }
);

export const registerGuestSlice = createSlice({
    name,
    initialState,
    reducers: {
        setRegisterLoading: (state, { payload }) => {
            state.loading = payload
        },

        clearUserId: (state) =>{
            state.userId = null;
            localStorage.removeItem("userId")
        },
        clearCityByZipCode: (state) => {
            state.getCityByZipCode = [];
        },

        clearMember: (state) => {
            state.members = [];
        },
        clearVehicles: (state) => {
            state.vehicles = [];
        },
        clearStoreData: (state) => {
            state.storeData = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userInfo.fulfilled, (state, { payload }) => {
            state.userId = payload?.data?.user_id;
            localStorage.setItem("userId", JSON.stringify(payload?.data?.user_id));
        });

        builder.addCase(storeGuestMember.fulfilled, (state, { payload }) => {
            state.members.push(payload?.data)
        });

        builder.addCase(getGuestMembers.fulfilled, (state, { payload }) => {
            state.members = payload?.data;
            state.membersMeta = payload?.meta;
        });

        builder.addCase(storeGuestVehicle.fulfilled, (state, { payload }) => {
            if (payload?.data) {
                state.permitPrice = payload?.data?.permitCost
            }
        });
        
        builder.addCase(getGuestVehicles.fulfilled, (state, { payload }) => {
            state.vehicles = payload?.data;
            state.vehiclesMeta = payload?.meta;
        });

        builder.addCase(getGuestPermit.fulfilled, (state, { payload }) => {
            state.permitDetails = payload || { newPermit: true };
            state.storeData = payload;
        });

        builder.addCase(getCityByZipCode.fulfilled, (state, { payload }) => {
            state.getCityByZipCode = [...payload?.data || []];
        });

        builder.addCase(getGuestDataByVin.fulfilled, (state, { payload }) => {
            state.dataByVin = payload?.Results?.[0] || {};
        });

        //////////        MATCHERS       #########
        builder.addMatcher(isAnyOf(generate.fulfilled), (state, { payload }) => {
            state.storeData = payload;
        });
    }
});

export const {
    setRegisterLoading,
    clearUserId,
    clearMember,
    clearVehicles,
    clearStoreData
} = registerGuestSlice.actions;

export const selectOperate = state => state.registerGuest.data?.operateUsdot;

export const selectStoreData = state => state.registerGuest.storeData;
// export const selectExtraData = state => state.registerGuest.extraData;

export const selectDataByVin = state => state.registerGuest.dataByVin;

//Guest Sellectors
export const selectGuestOtherExtraValues = state => state.registerGuest.otherExtraValues;

export const selectGuestId = state => state.registerGuest.userId;
export const selectGuestMembers = state => state.registerGuest.members;
export const selectGuestOfficerTypes = state => state.registerGuest.data?.officerType;
export const selectGuestVehicles = state => state.registerGuest.vehicles;
export const selectGuestVehiclesMeta = state => state.registerGuest.vehiclesMeta;
export const selectGuestMembersMeta = state => state.registerGuest.membersMeta;


export default registerGuestSlice.reducer;