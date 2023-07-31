"use client";
import { useVoteStore } from "@/redux/store";
import moment from "moment";
import Image from "next/image";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
const CommentHeader = () => {
  const addCommentUser = useVoteStore((state: any) => state.addUser);
  console.log(moment().startOf("hour").fromNow());
  // newcreate
  const [editedValue, setEditedValue] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const { users, removeUser } = useVoteStore((state: any) => ({
    users: state.users,
    removeUser: state.removeUser,
  }));
  const updateUser = useVoteStore((state: any) => state.updateUser);
  let id = uuidv4();
  const handleNew = () => {
    setSubmitted(true);
  };
  const handleEditUser = (item: any) => {
    setEditItemId(item.id);
    setEditedValue(item.title);
    // setShow("")
  };

  const handleUpdate = (e: any) => {
    // e.preventDefault();
    // updateUser(item.id, show.title);
    // setShow("");
    e.preventDefault();
    if (editItemId === null || editedValue === "") return;
    updateUser(editItemId, editedValue);
    setEditItemId(null);
    setEditedValue("");
  };

  const handleCourseSubmit = (e: any) => {
    e.preventDefault();
    // if (!voteTitle) return alert("please add a course title");
    // addCommentUser({
    //   id: id,
    //   title: voteTitle,
    // });
    // setvoteTitle("");
    if (!editedValue) return alert("Please add a comment");
    addCommentUser({
      id: id,
      title: editedValue,
    });
    setSubmitted(true);
    setEditedValue("");
  };

  return (
    <>
      <div className="flex mt-4 font-semibold">
        <div>
          <Image
            src="/image/photo1.jpg"
            alt="image"
            width={40}
            height={40}
            className=" rounded-full"
          />
        </div>

        <div className="ml-3 text-primary">amyrobson</div>
        <div className="ml-3 text-gray-300 ">
          {moment().format(" h:mm:ss a")}
        </div>
        <div className="ml-64 flex  cursor-pointer">
          <div onClick={handleNew}>
            <Image src="/reply.svg" alt="image" width={20} height={20} />
          </div>
          <p className="text-[#5457b6] font-semibold">Reply</p>
        </div>
      </div>

      {submitted ? (
        <form className="flex justify-evenly">
          <textarea
            id="message"
            name="reply"
            value={editedValue}
            onChange={(e) => {
              setEditedValue(e.target.value);
            }}
            className="block p-2.5 w-468 h-116 text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-gray-200 focus:border-gray-200 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Add a Comment"
          ></textarea>
          {editItemId ? (
            <button
              className="bg-replyBtn text-white p-2 rounded-md ml-2 mt-7 w-24 h-9"
              onClick={handleUpdate}
            >
              update
            </button>
          ) : (
            <button
              className="bg-replyBtn text-white p-2 rounded-md ml-2 mt-7 w-24 h-9"
              onClick={handleCourseSubmit}
            >
              send
            </button>
          )}
        </form>
      ) : (
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo itaque
          impedit voluptate et, quod quidem
        </p>
      )}

      {/* loop of message */}
      {submitted &&
        users?.map((item: any, id: any) => {
          return (
            <div className="container mt-7" key={id}>
              <div className="bg-white  mt-2 ml-16 h-36 rounded-md p-3">
                <div className="flex font-semibold items-center ">
                  <div className="grow-[0.1] mr-1">
                    <Image
                      src="/image/photo2.png"
                      alt="image"
                      width={40}
                      height={40}
                      className=" rounded-full"
                    />
                  </div>
                  <p className="grow-[0.1] text-primary">juliusomo</p>

                  <p className=" bg-replyBtn text-white p-1 rounded-md">you</p>
                  <p className="grow-[0.1] ml-64 mr-1 cursor-pointer flex items-center">
                    <Image
                      src="/delete.svg"
                      alt="delete btn "
                      width={18}
                      height={15}
                    />
                    <p
                      className="text-[#ed6468]"
                      onClick={() => {
                        removeUser(item.id);
                      }}
                    >
                      Delete
                    </p>
                  </p>
                  <p
                    className="text-[#5457b6] flex items-center cursor-pointer ml-1"
                    onClick={() => handleEditUser(item)}
                  >
                    <Image
                      src="/edit.svg"
                      alt="edit btn"
                      width={15}
                      height={15}
                    />
                    Edit
                  </p>
                </div>
                {editItemId === item.id ? (
                  // item.id === show?.id
                  <form className="flex justify-evenly">
                    {/* <textarea
                      id="message"
                      name="update"
                      // defaultValue={item?.title}
                      className="block p-2.5 w-468 h-116 text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-gray-200 focus:border-gray-200 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Add a Comment"
                    ></textarea> */}
                    {/* <button
                      className="bg-replyBtn text-white p-2 rounded-md ml-2 mt-7 w-24 h-9"
                      onClick={handleUpdate}
                    >
                      Update
                    </button> */}
                  </form>
                ) : (
                  <p> {item.title}</p>
                )}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default CommentHeader;
