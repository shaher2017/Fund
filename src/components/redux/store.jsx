import { configureStore } from "@reduxjs/toolkit";
import thelist from "./liked";

import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  thelist: thelist,
});

const perReducer = persistReducer(persistConfig, reducer);

export default configureStore({
    reducer:perReducer,
});