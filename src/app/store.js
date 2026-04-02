import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../features/ui/uiSlice';
import instrumentsReducer from '../features/instruments/instrumentsSlice';
import counterReducer from "../features/counter/counterSlice";
import authReducer from '../features/auth/authSlice';
import { authMiddleware } from './authMiddleware';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        instruments: instrumentsReducer,
        counter: counterReducer,
        auth: authReducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware)

});




