import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contract: '', provider: ''
};

export const abiSlice = createSlice({
    name: 'abi',
    initialState,
    reducers: {
        updateAbi: (state, action) => {
            const { contract, provider } = action.payload;
            state.contract = contract;
            state.provider = provider;
        }
    }
});

export const { updateAbi } = abiSlice.actions;

export default abiSlice.reducer;