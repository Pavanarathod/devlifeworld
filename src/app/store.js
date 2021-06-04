import { configureStore } from "@reduxjs/toolkit";
import modelReducer from "../features/modelSlice";
import commentReducer from "../features/commentSlice";
import groupReducer from "../features/groupSlice";

export const store = configureStore({
  reducer: {
    model: modelReducer,
    comment: commentReducer,
    groups: groupReducer,
  },
});
