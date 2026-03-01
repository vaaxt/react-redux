import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../features/ui/uiSlice';
import instrumentsReducer from '../features/instruments/instrumentsSlice';
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        instruments: instrumentsReducer,
        counter: counterReducer
    }
});

