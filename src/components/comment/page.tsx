"use client";
import React, { useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux/es/exports";
import {
  commentReducer,
  commentRemoveReducer,
  commentUpdateReducer,
} from "@/redux/comment";
const CommentBox = () => {
  const dispatch = useDispatch();
  const getData = useSelector((state: any) => state.comment.comment);
  console.log(getData, "get data");
  const getUser = useSelector((state: any) => state.login.username);
  const [editValue, setEditValue] = useState<any>(null);
  const [replyEdit, setReplyEdit] = useState();
  const [showData, setShowData] = useState(getData);
  const [showValue, setShowValue] = useState<any>();
  const [isOpen, setIsOpen] = useState(null);
  // for reply edit
  // const [replyOpen, setReplyOpen] = useState<any>(null);
  console.log(showData, "showdata state");

  const id = uuidv4();
  const handleDelete = (id: any) => {
    //dispatch remove action here with item ID
    dispatch(commentRemoveReducer(id));
    console.log("delete user from reply side ");
  };
  const handleEdit = (id: any) => {
    setEditValue(id);
    console.log("hello i am first function");
  };
  const handleUpdate = (item: any) => {
    const data = { ...item, title: replyEdit };
    console.log("update", data);
    const updatedDataArray = getData.map((existingItem: any) =>
      existingItem?.id === data.id ? data : existingItem
    );
    dispatch(commentUpdateReducer(updatedDataArray));
    setShowData(updatedDataArray);
    setEditValue(null);
  };

  //   for open and close
  const handleRelpy = (id: any) => {
    setIsOpen(id);
  };

  const handleSubmit = (item: any) => {
    dispatch(
      commentReducer({
        id: id,
        reply: [
          ...item.reply,
          {
            message: showValue,
            id: item.id,
            username: getUser,
          },
        ],

        username: getUser,
      })
    );
    setShowValue("");

    setIsOpen(null);
  };
  return (
    <div>
      {getData.map((item: any, id: any) => {
        console.log(item, "map datat");
        return (
          <>
            <div className="container mt-7 mb-20" key={id}>
              <div
                className="bg-white  mt-2 m-auto h-36 rounded-md p-3"
                style={{ width: "58%" }}
              >
                <div className="flex font-semibold items-center justify-between">
                  <div className="">
                    <Image
                      src="/image/photo2.png"
                      alt="image"
                      width={40}
                      height={40}
                      className=" rounded-full"
                    />
                  </div>
                  <p className=" text-primary flex">
                    {getUser === item.username ? (
                      <>
                        <p className=" text-primary  mr-3">{getUser}</p>
                        <p className=" bg-replyBtn text-white p-1 rounded-md">
                          you
                        </p>
                        <p className=" ml-64 cursor-pointer flex items-center">
                          <Image
                            src="/delete.svg"
                            alt="delete btn "
                            width={18}
                            height={15}
                            onClick={() => {
                              handleDelete(item.id);
                            }}
                          />
                        </p>
                        <p className="text-[#5457b6] flex items-center cursor-pointer ">
                          <Image
                            src="/edit.svg"
                            alt="edit btn"
                            width={15}
                            height={15}
                            className="mr-1"
                            onClick={() => handleEdit(item.id)}
                          />
                        </p>
                      </>
                    ) : (
                      <>
                        <p className=" text-primary  mr-3">{item?.username}</p>
                        <button
                          className="text-[#5457b6]"
                          onClick={() => handleRelpy(item.id)}
                        >
                          <Image
                            src="/reply.svg"
                            alt="image"
                            width={20}
                            height={20}
                          />
                        </button>
                      </>
                    )}
                  </p>
                </div>
                {/* this is edit post of comment not the reply comment */}
                {item?.id == editValue  ? (
                  <form className="flex justify-evenly">
                    <textarea
                      id="message"
                      name="reply"
                      defaultValue={item?.title}
                      onChange={(e: any) => setReplyEdit(e.target.value)}
                      className="block p-2.5 w-40 h-36 text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-gray-200 focus:border-gray-200 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Add a Comment"
                      style={{ width: "394px", height: "119px" }}
                    ></textarea>
                    <div
                      className="bg-replyBtn cursor-pointer text-white p-2 rounded-md ml-2 mt-7 w-24 h-9 text-center"
                      onClick={() => handleUpdate(item)}
                    >
                      update
                    </div>
                  </form>
                ) : (
                  <p> {item?.title}</p>
                )}

                {/* start comment for post */}
                {item?.id == isOpen && (
                  <form className="flex justify-evenly  h-36">
                    <textarea
                      id="message"
                      name="reply"
                      value={showValue}
                      onChange={(e: any) => {
                        setShowValue(e.target.value);
                      }}
                      className="block p-2.5  text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-gray-200 focus:border-gray-200 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      style={{
                        marginLeft: "10px",
                        width: "491px",
                        height: "86px",
                      }}
                      placeholder="Add a Comment"
                    ></textarea>

                    <div
                      className="bg-replyBtn text-white p-2 rounded-md ml-1 cursor-pointer mt-7 w-20 h-9 text-center"
                      onClick={() => handleSubmit(item)}
                    >
                      send
                    </div>
                  </form>
                )}
                {/* this is reply array comment message show and aslo edit the user or delete */}
                {item?.reply?.map((e: any) => {
                  console.log(e.message, "rpley array");
                  return (
                    <>
                      <h1>Reply</h1>
                      <p>{e.message}</p>
                    </>
                  );
                })}
          
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default CommentBox;
