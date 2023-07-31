"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux/es/exports";
import {
  commentReducer,
  commentRemoveReducer,
  commentRemoveReplyReducer,
  commentUpdateReducer,
} from "@/redux/comment";
import * as _ from 'lodash'

const MyComment = () => {
  const dispatch = useDispatch();
  const getData = useSelector((state: any) => state.comment.comment);
  console.log(getData, "get data");
  const getUser = useSelector((state: any) => state.login.username);
  const [editValue, setEditValue] = useState<any>(null);
  const [replyEdit, setReplyEdit] = useState();
  const [showData, setShowData] = useState();
  const [showValue, setShowValue] = useState<any>();
  const [isOpen, setIsOpen] = useState(null);
  useEffect(()=>{
    let data=JSON.parse(JSON.stringify(getData))
    setShowData(data)
  },[])
  // for reply edit
  // const [replyOpen, setReplyOpen] = useState<any>(null);
  console.log(showData, "showdata state");

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
    // console.log(item, "before-filter");

    item.reply = [
      ...item.reply,
      {
        message: showValue,
        id: id,
        username: getUser,
      },
    ];
    console.log(item, "after-filter");

    // console.log(item, "filter");
    const newData = getData.map((e: any) => (e.id === item.id ? item : e));
    console.log([...getData,...newData], "filter-array");
    dispatch(commentReducer(newData));
    // console.log(data, "data vlaue parse");
    // _.debounce(dispatch(commentReducer(item)))


    //   const replyData =   getData.map((r:any) => {
    //       console.log(r , "values of r");
    //        item.id == r.id;
    //     });
    // console.log(replyData , "reply ");

    //     const data = {
    //       id: id,
    //       reply: [
    //         // ...item.reply,
    //         {
    //           message: showValue,
    //           id: item.id,
    //           username: getUser,
    //         },
    //       ],

    //       username: getUser,
    //     };
    //     console.log(data, "dispatch data");

    // dispatch(

    // );
    setShowValue("");
    setIsOpen(null);
  };
  const handleReplyDelete = (item: any, e: any) => {
    dispatch(commentRemoveReplyReducer({ item, e }));
    console.log(item, e, "delete");
  };
  return (
    <>
      <div className="flex flex-col space-y-3 justify-center items-center w-full h-auto ">
        {/* here wraping the map */}

        {Array.isArray(getData) && getData.length !== 0 && getData?.map((item: any) => {
          return (
            <>
              <div className=" h-40 bg-white rounded-md m-auto w-1/2">
                <div className="flex justify-between p-3">
                  <div className="flex">
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
                      <p className=" text-primary  mr-3  font-bold text-2xl">
                        {getUser}
                      </p>
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
                      <p className="font-bold text-primary text-2xl">
                        {getUser}
                      </p>
                      <button
                        className="text-[#5457b6] font-bold flex"
                        onClick={() => handleRelpy(item.id)}
                      >
                        <Image
                          src="/reply.svg"
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
                  <p className="p-3 ">{item?.title}</p>
                )}
              </div>
              {item.id == isOpen && (
                <div className="bg-white w-2/4 rounded-md">
                  <form className="flex justify-evenly items-center h-36 ">
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
                  <div className="bg-white w-1/3 rounded-md p-3" key={e.id}>
                    <div className="flex justify-between">
                      <p className="text-primary font-bold text-2xl">
                        {getUser}
                      </p>
                      <div className="flex">
                        <p className="">
                          <Image
                            src="/delete.svg"
                            alt="delete btn "
                            width={18}
                            height={15}
                            onClick={() => {
                              handleReplyDelete(item.id, e.id);
                            }}
                          />
                        </p>
                        <p className="text-[#5457b6] ">
                          <Image
                            src="/edit.svg"
                            alt="edit btn"
                            width={15}
                            height={15}
                            className="mr-1"
                            // onClick={() => handleEdit(item.id)}
                          />
                        </p>
                      </div>
                    </div>
                    <p className="p-3">{e.message}</p>
                  </div>
                );
              })}
            </>
          );
        })}
      </div>
    </>
  );
};

export default MyComment;
