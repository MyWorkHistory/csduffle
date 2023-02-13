import { createSlice } from '@reduxjs/toolkit';

const login = createSlice({
    name: "login",
    initialState: "",
    reducers: {
        setLogin: (state, action) => {
            return action.payload;
        }
    }
})

export const { setLogin } = login.actions;
export default login.reducer;