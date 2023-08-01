"use client";
import { useVoteStore } from "@/zustand/store";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { commentReducer, userData } from "@/redux/comment";
import { comment } from "postcss";
const CommentForm = () => {
  let id = uuidv4();
  const [courseTitle, setCourseTitle] = useState<any>("");

  const getUser = useSelector((state: any) => state.login.username); 
  const getData = useSelector((state: any) => state.comment);
  console.log(getData , "getdatta");
  
  const dispatch = useDispatch();
  const handleCourseSubmit = (e: any) => {
    e.preventDefault();
    if (!courseTitle) return alert("please add a course title");
     
    dispatch(
      commentReducer({comment:[...getData.comment,{
        id: id,
        title: courseTitle,
        reply: [],
        date: new Date(),
   
        username:getUser
}]})
    );
    setCourseTitle("");
  };
  return (
    <>
    
      <div className="flex">
        <form className="flex">
          <textarea
            id="message"
            name="reply"
            value={courseTitle}
            onChange={(e) => {
              setCourseTitle(e.target.value);
            }}
            className="block p-2.5 w-468 h-116 text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-gray-200 focus:border-gray-200 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Add a Comment"
          ></textarea>
          <button
            onClick={(e) => handleCourseSubmit(e)}
            className="bg-replyBtn text-white p-2 rounded-md ml-2 mt-7 w-24 h-9"
          >
            send
          </button>
        </form>
      </div>
    </>
  );
};
export default CommentForm;
