import { configureStore } from "@reduxjs/toolkit";

import login from "./login";
import backend from './backend';

const store = configureStore({
    reducer: {
        login,
        backend
    }
});

export default store;