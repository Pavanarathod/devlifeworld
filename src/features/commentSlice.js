import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectCommentData: null,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    commentData: (state, action) => {
      state.selectCommentData = action.payload;
    },
  },
});

export const { commentData } = commentSlice.actions;

export const selectComment = (state) => state.comment.selectCommentData;

export default commentSlice.reducer;
