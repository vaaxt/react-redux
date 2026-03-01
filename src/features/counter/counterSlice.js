import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    value: 0,
    color: "gray"
};

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment(state){
            state.value += 1;
            state.color = "green";
        },
        decrement(state){
            state.value -= 1;
            state.color = "red";
        },
        reset(state){
            state.value = 0;
            state.color = "gray";
        }
    }
});

export const {increment, decrement, reset} = counterSlice.actions;
export default counterSlice.reducer;