import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice";

const appStore = configureStore({
    reducer : {
        dashboard : dashboardReducer
    },
});

export default appStore;