import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice";
import { loadState, saveState } from "./localStorage";

const appStore = configureStore({
    reducer : {
        dashboard : dashboardReducer
    },
});

appStore.subscribe(() => {
    saveState(appStore.getState().dashboard);
})

export default appStore;