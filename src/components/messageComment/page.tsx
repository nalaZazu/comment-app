"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import {
  commentReducer,
  commentRemoveReducer,
  commentRemoveReplyReducer,
  commentUpdateReducer,
  commentupdateReplyReducer,
} from "@/redux/comment";
import * as _ from "lodash";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

const MessageComment = () => {
  const dispatch = useDispatch();
  const getData = useSelector((state: any) => state.comment.comment);

  const getUser = useSelector((state: any) => state.login.username);
  // this is main comment txtarea edit
  const [editValue, setEditValue] = useState<any>(null);
  // this is main comment box update value
  const [replyEdit, setReplyEdit] = useState();
  // this is state for just set the value , not using in the whole code
  const [showData, setShowData] = useState();
  // this is init state for reply send
  const [showValue, setShowValue] = useState<any>();
  // this state for open the textarea
  const [isOpen, setIsOpen] = useState(null);
  // this state for reply textaera update
  const [replyOpen, setReplyOpen] = useState<any>(null);
  // this is reply value set state
  const [newReplyUpdate, setNewReplyUpdate] = useState<any>();
  useEffect(() => {
    let data = JSON.parse(JSON.stringify(getData));
    setShowData(data);
  }, []);

  const id = uuidv4();
  const handleDelete = (id: any) => {
    //dispatch remove action here with item ID
    dispatch(commentRemoveReducer(id));
    // dispatch(commentRemoveReducer({commentId:Number,replyId:Number }));
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
    const newReply = {
      message: showValue,
      id: id,
      username: getUser,
    };

    const updatedReply = [...item.reply, newReply]; // Create a new copy of the reply array

    const newItem = {
      ...item,
      reply: updatedReply,
    };

    // Find the index of the comment in getData array
    const index = getData.findIndex((e: any) => e.id === newItem.id);

    if (index !== -1) {
      const newData = [...getData]; // Create a new copy of the getData array
      newData[index] = newItem; // Update the corresponding item with the new reply

      dispatch(commentReducer({ comment: newData }));
    }

    setShowValue("");
    setIsOpen(null);
  };

  const handleReplyDelete = (item: any, e: any) => {
    dispatch(commentRemoveReplyReducer({ item, e }));
    console.log(item, e, "delete");
  };

  const handleReplyEdit = (id: any) => {
    setReplyOpen(id);
  };
  const handleReplyUpdate = (item: any, e: any) => {
    const replyItem = { item, e, message: newReplyUpdate };
    console.log("replyItem", replyItem);
    dispatch(commentupdateReplyReducer(replyItem));
    setNewReplyUpdate(replyItem);
    setReplyOpen(null);
  };
  return (
    <>
      <div className="flex flex-col space-y-3 justify-center items-center w-full h-auto ">
        {/* here wraping the map */}

        {Array.isArray(getData) &&
          getData.length !== 0 &&
          getData?.map((item: any) => {
            return (
              <>
                <div className=" h-40 bg-white rounded-md m-auto w-1/2">
                  <div className="flex  p-3">
                    <div className="mr-2">
                      <Image
                        src="/image/photo2.png"
                        alt="image"
                        width={40}
                        height={40}
                        className=" rounded-full"
                      />
                    </div>
                    {getUser === item?.username ? (
                      <>
                        <p className=" !text-primary  mr-3  font-bold text-2xl">
                          {item?.username}
                        </p>
                        <p
                          className=" bg-replyBtn text-white p-1 rounded-md
                        h-8"
                        >
                          you
                        </p>
                        
                        
                        <p
                          className=" ml-96 cursor-pointer flex items-center text-[#ed6468] font-bold"
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                        >
                          <Image
                            src="/delete.svg"
                            alt="delete btn "
                            width={18}
                            height={15}
                          />
                          Delete
                        </p>
                        <p
                          className="text-[#5457b6] flex items-center cursor-pointer font-bold"
                          onClick={() => handleEdit(item.id)}
                        >
                          <Image
                            src="/edit.svg"
                            alt="edit btn"
                            width={15}
                            height={15}
                            className="mr-1"
                          />
                          Edit
                        </p>
                      </>
                    ) : (
                      <>
                        <p className=" flex grow items-center">
                          <p className="text-primary font-bold  text-2xl ">
                            {item?.username} 
                          </p>
                         
                          <p className="text-gray-500 ml-3 font-bold">
                             {moment(item.date).fromNow()} 
                          </p>
                        
                        </p>
                       
                        <button
                          className="text-[#5457b6] font-bold flex text-lg items-center justify-end"
                          onClick={() => handleRelpy(item.id)}
                        >
                          <Image
                            src="/icon-reply.svg"
                            alt="image"
                            width={20}
                            height={20}
                          />
                          Reply
                        </button>
                      </>
                    )}
                  </div>
                  {item?.id == editValue ? (
                    <form className="flex justify-evenly">
                      <textarea
                        id="message"
                        name="message"
                        defaultValue={item?.title}
                        onChange={(e: any) => setReplyEdit(e.target.value)}
                        className="block p-2.5 w-40 h-36 text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-gray-200 focus:border-gray-200 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Add a Comment"
                        style={{ width: "394px", height: "81px" }}
                      ></textarea>
                      <div
                        className="bg-replyBtn cursor-pointer text-white p-2 rounded-md ml-2 mt-7 w-24 h-9 text-center"
                        onClick={() => handleUpdate(item)}
                      >
                        update
                      </div>
                    </form>
                  ) : (
                    <p className="p-3 text-[#67727e]">{item?.title}</p>
                  )}
                </div>
                {item?.id == isOpen && (
                  <div className="bg-white w-2/4 rounded-md">
                    <form className="flex justify-evenly items-center h-36 ">
                      <textarea
                        id="reply"
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
                        className="bg-replyBtn text-white p-2 rounded-md ml-1 
                    cursor-pointer mt-7 w-20 h-9 text-center"
                        onClick={() => handleSubmit(item)}
                      >
                        send
                      </div>
                    </form>
                  </div>
                )}
                {item?.reply?.map((e: any) => {
                  return (
                    <>
                      <div
                        className="bg-white w-40 rounded-md p-3 ml-32 h-40"
                        key={e.id}
                      >
                        <div className="flex justify-between items-center">
                          <p className="text-primary font-bold text-2xl">
                            {e.username}
                          </p>
                          {getUser === e.username ? (
                            <>
                              {" "}
                              <div className="flex">
                                <p
                                  className="cursor-pointer text-[#ed6468] flex items-center mr-1 font-bold"
                                  onClick={() => {
                                    handleReplyDelete(item.id, e.id);
                                  }}
                                >
                                  <Image
                                    src="/delete.svg"
                                    alt="delete btn "
                                    width={18}
                                    height={15}
                                  />
                                  Delete
                                </p>
                                <p
                                  className="text-[#5457b6] cursor-pointer flex items-center font-bold"
                                  onClick={() => handleReplyEdit(e.id)}
                                >
                                  <Image
                                    src="/edit.svg"
                                    alt="edit btn"
                                    width={15}
                                    height={15}
                                    className="mr-1"
                                  />
                                  Edit
                                </p>
                              </div>
                            </>
                          ) : null}
                        </div>
                        {e?.id == replyOpen ? (
                          <form className="flex justify-evenly text-[#67727e]">
                            <textarea
                              id="message"
                              name="message"
                              defaultValue={e.message}
                              onChange={(e: any) =>
                                setNewReplyUpdate(e.target.value)
                              }
                              className="block p-2.5 w-40 h-36 text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-gray-200 focus:border-gray-200 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Add a Comment"
                              style={{ width: "394px", height: "96px" }}
                            ></textarea>
                            <div
                              className="bg-replyBtn cursor-pointer text-white p-2 rounded-md ml-2 mt-7 w-24 h-9 text-center"
                              onClick={() => handleReplyUpdate(item.id, e.id)}
                            >
                              update
                            </div>
                          </form>
                        ) : (
                          <p className="p-3 text-[#67727e]">{e.message}</p>
                        )}
                      </div>
                    </>
                  );
                })}
              </>
            );
          })}
      </div>
    </>
  );
};

export default MessageComment;
