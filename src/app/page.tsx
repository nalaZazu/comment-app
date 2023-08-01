"use client";
import React from "react";
import CommentReply from "@/components/commentReply/page";
import Header from "@/components/Header/page";
import MessageComment from "@/components/messageComment/page";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="{rubik.className} pt-8 mb-8">
        <MessageComment />
        <CommentReply />
      </div>
    </div>
  );
}
