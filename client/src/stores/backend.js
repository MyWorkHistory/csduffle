import { createSlice } from '@reduxjs/toolkit';

const backend = createSlice({
    name: "backend",
    initialState: window.mode == "development" ? "http://localhost:6005" : "18.159.113.150:6005",
    reducers: {
        setBackend: (state, action) => {
            return action.payload;
        }
    }
})

export const { setBackend } = backend.actions;
export default backend.reducer;