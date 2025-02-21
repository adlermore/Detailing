import { createSlice} from "@reduxjs/toolkit";

const name = 'popUp';

const initialState = {
    popUp: "",
    popUpContent: "",
    popUpAction: null
};

export const popUpSlice = createSlice({
    name,
    initialState,
    reducers: {
        setLoading: (state, {payload})=> {
            state.loading = payload
        },
        setPopUp: (state, {payload})=> {
            state.popUp = payload.popUp;
            state.popUpContent = payload.popUpContent;
            state.popUpAction = payload.popUpAction;
        }
    },
});


export const {setLoading, setPopUp} = popUpSlice.actions;

export const selectPopUp = state => state?.popUp;
export const selectPopUpContent = state => state?.popUp?.popUpContent;
export const selectPopUpAction = state => state?.popUp?.popUpAction;

export default popUpSlice.reducer;