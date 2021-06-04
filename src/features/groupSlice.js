import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectGroupInfo: null,
};

const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    getGroupsCredentials: (state, action) => {
      state.selectGroupInfo = action.payload;
    },
  },
});

export const { getGroupsCredentials } = groupSlice.actions;

export const selectGroupData = (state) => state.groups.selectGroupInfo;

export default groupSlice.reducer;
