import { combineReducers } from "@reduxjs/toolkit";
import { loaderReducer } from "./loaderReducer";

export type State = {
    loader:loaderReducer
}

export const combinedReducer = combineReducers({
    loader:loaderReducer
})