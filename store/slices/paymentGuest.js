import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {guestLogger} from "@/store/guestLogger";
import {API_URL_GUEST} from "@/utils/constants";

const name = 'paymentGuest';

const initialState = {
    loading: false,
    carrierInfo: null,
    status: ""
};


export const getCarrierInfo = createAsyncThunk(
    `${name}/getCarrierInfo`,
    async ({permit_id, user_id} , {rejectWithValue}) => {
        try {
            return await guestLogger({
                method: 'GET',
                url: `${API_URL_GUEST}/order/getCarrierInformation/${permit_id}?user_id=${user_id}`,
            })
        } catch (err) {
            return rejectWithValue(err)
        }
    }
    
);

export const createOrder = createAsyncThunk(
    `${name}/createOrder`,
    async (props, {rejectWithValue}) => {
        try {
            return await guestLogger({
                method: 'POST',
                url: `${API_URL_GUEST}/order/createOrder`,
                body: props
            })
        } catch (err) {
            return rejectWithValue(err)
        }
    }
);

export const paymentGuestSlice = createSlice({
    name,
    initialState,
    reducers: {
        setPaymentLoading: (state, {payload})=> {
            state.loading = payload
        },
        clearPaymentStatus: (state) => {
            state.status = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createOrder.fulfilled, (state, { payload }) => {
            if(payload?.action) {
                state.status = 'success';
                state.message = payload.message;
            } else {
                state.status = 'faild';
                state.message = '';
            }
        });
        builder.addCase(getCarrierInfo.fulfilled, (state, {payload}) => {
            if (payload?.action) {
                state.carrierInfo = payload?.data;
            }
        });
    }
});

export const selectCarrierInfo = state => state?.paymentGuest?.carrierInfo;
export const selectGuestPaymentStatus = state => state?.paymentGuest?.status;
export const {setPaymentLoading, clearPaymentStatus} = paymentGuestSlice.actions;

export default paymentGuestSlice.reducer;