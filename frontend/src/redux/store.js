import { configureStore } from "@reduxjs/toolkit";
import abiReducer from './slices/abiSlice';

export const store = configureStore({
    reducer: {
        abi: abiReducer,
    },
});