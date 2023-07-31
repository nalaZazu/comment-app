import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  comment: [],
};
export const userData = createSlice({
  name: "comment",
  initialState,
  reducers: {
    commentReducer: (state, action) => {
      
      state.comment = action.payload
      // state.comment = [...state.comment,
      //   JSON.parse(JSON.stringify(action.payload))
      //   // action.payload
      // ];
    },
    commentRemoveReducer: (state, action) => {
      const itemId = action.payload;
      state.comment = state.comment.filter((item: any) => item.id !== itemId);
    },

    // commentRemoveReducer: (state, action) => {
    //   const { commentId, replyId } = action.payload;
    //   console.log("action payload", action.payload);

    //   // const comment = state.comments.find((c: any) => c.id === commentId);
    //   // if (comment) {
    //   //   comment.reply = comment.reply.filter((r: any) => r.id !== replyId);
    //   // }
    // },
    // commentRemoveReducer: (state, action) => {
    //   const { commentId, replyId } = action.payload;

    //   const updatedComments = state.comment.map((comment: any) => {
    //     if (comment.id === commentId) {
    //       return {
    //         ...comment,
    //         reply: comment.reply.filter((r: any) => r.id !== replyId),
    //       };
    //     }
    //     return comment;
    //   });

    //   state.comment = updatedComments.filter((c: any) => c.reply.length > 0);
    // },
    commentRemoveReplyReducer: (state, action) => {
      const { commentId, replyId } = action.payload;
      console.log("action payload" , action.payload);
      
      const commentIndex = state.comment.findIndex((c: any) => c.id === commentId);
      if (commentIndex !== -1) {
        state.comment[commentIndex].reply = state.comment[commentIndex].reply.filter(
          (r: any) => r.id !== replyId
        );
      }
    },




    commentUpdateReducer: (state, action) => {
      state.comment = action.payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const { commentReducer, commentRemoveReducer, commentUpdateReducer  ,commentRemoveReplyReducer } =
  userData.actions;

export default userData.reducer;
