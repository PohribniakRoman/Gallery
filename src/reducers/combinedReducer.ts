import { combineReducers } from "@reduxjs/toolkit";
import { loaderReducer } from "./loaderReducer";
import { sectionReducer } from "./sectionReducer";

export type State = {
    loader:loaderReducer;
    section:sectionReducer;
}

export const combinedReducer = combineReducers({
    loader:loaderReducer,
    section:sectionReducer
})