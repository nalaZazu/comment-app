"use client";
import CommentBox from "@/components/comment/page";
import CommentReply from "@/components/commentReply/page";
import MyComment from "@/components/hello/page";
import React from "react";
export default function Home() {
  return (
    <div className="pt-8">
      {/* <div className="container "> */}
      <MyComment/>
        {/* <CommentBox /> */}
        
        <CommentReply />
      {/* </div> */}
    </div>
  );
}
