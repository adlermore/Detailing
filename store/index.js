import {combineReducers, configureStore} from "@reduxjs/toolkit";
import popUpReducer from './slices/popUp.js';
import registerReducer from './slices/resgister.js';
import {postsSlice} from './slices/posts.js';
import  registerGuestReducer from "./slices/registerGuest.js";
import  paymentGuestReducer from "./slices/paymentGuest.js";


const combineReducer = combineReducers({
    [postsSlice.reducerPath]: postsSlice.reducer,
    register: registerReducer,
    registerGuest: registerGuestReducer,
    popUp: popUpReducer,
    paymentGuest: paymentGuestReducer,
});


export const store = configureStore({
    reducer: combineReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false}).concat(postsSlice.middleware),
});