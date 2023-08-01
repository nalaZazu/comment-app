import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  comment: [],
};
export const userData = createSlice({
  name: "comment",
  initialState,
  reducers: {
    commentReducer: (state, action) => {
      console.log("1data --", action.payload);
      // state.comment = action.payload
      state.comment = action.payload.comment;
    },
    commentRemoveReducer: (state, action) => {
      const itemId = action.payload;
      state.comment = state.comment.filter((item: any) => item.id !== itemId);
    },
    commentRemoveReplyReducer: (state, action) => {
      const itemId = action.payload;
      console.log(itemId, "action.payload");

      state.comment = state.comment.map((r: any) => {
        console.log(r, "vlaue of r");

        if (r.id === itemId.item) {
          // Filter out the reply with the specified replyId
          const updatedReplies = r.reply.filter((v: any) => v.id !== itemId.e);

          // Return the updated comment with the modified replies array
          return {
            ...r,
            reply: updatedReplies,
          };
        } else {
          return r; // If the comment id doesn't match, return the original comment unchanged
        }
      });
    },

    commentUpdateReducer: (state, action) => {
      state.comment = action.payload;
    },
    commentupdateReplyReducer: (state, action) => {
      const { item,e, message } = action.payload;
      console.log("payload" , action.payload);
      state.comment = state.comment.map((r: any) => {
        console.log(r, "vlaue of r");

        if (r.id ===  item) {
          // Filter out the reply with the specified replyId
          const updatedReplies = r.reply.map((v: any) => v.id === e?{...v,message:message}:v);

         console.log(updatedReplies,"sds")
          return {
            ...r,
            reply: updatedReplies,
          };
        } else {
          return r; // If the comment id doesn't match, return the original comment unchanged
        }
      });
      // state.comment = state.comment.map((com:any) => {

      //   if (com.id === commentId) {
      //     return {
      //       ...com,
      //       reply: com.reply.map((replies:any) =>

      //       {replies.id === replyId ? { ...replies, message } : replies
      //       console.log(replies , "replise");}
            
      //       ),
      //     };
      //   } else {
      //     return com;
      //   }
      // });
      // console.log("updtaecomment" ,{ ...state, comment: updatedComments});
      
      
      
      // return { ...state, comment: updatedComments };

      // console.log(updatedComments, "updatecomment");
      // state.comment = updatedComments;
      // const { commentId, replyId, updatedText } = action.payload;
      // // const itemId = action.payload
      // console.log(action.payload , "red");
      // const comments = state.comment.find((c:any) => c.id === commentId);
      // if (comments) {
      //   const replies = comments.reply.find((r:any) => r.id === replyId);
      //   if (replies) {
      //     replies.message = updatedText;
      //   }
      // }
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  commentReducer,
  commentRemoveReducer,
  commentUpdateReducer,
  commentRemoveReplyReducer,
  commentupdateReplyReducer,
} = userData.actions;

export default userData.reducer;
