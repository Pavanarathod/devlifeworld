import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modelIsOpen: false,
};

export const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    showModel: (state) => {
      state.modelIsOpen = true;
    },
    closeModel: (state) => {
      state.modelIsOpen = false;
    },
  },
});

export const { showModel, closeModel } = modelSlice.actions;

export const selectModel = (state) => state.model.modelIsOpen;

export default modelSlice.reducer;
