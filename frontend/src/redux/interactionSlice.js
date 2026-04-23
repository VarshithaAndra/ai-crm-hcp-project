import { createSlice } from "@reduxjs/toolkit";

const interactionSlice = createSlice({
    name: "interaction",
    initialState: {},
    reducers: {
        setData: (state, action) => action.payload
    }
});

export const { setData } = interactionSlice.actions;
export default interactionSlice.reducer;