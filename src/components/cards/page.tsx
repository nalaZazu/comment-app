import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import photo from "/image/photo2.png";
import Image from "next/image";
import { useSelector } from "react-redux/es/exports";
const Cards = () => {
  let id = uuidv4();
  //   for open and delete
  const [isOpen, setIsOpen] = useState();
  //   for enter the data
  const [showValue, setShowValue] = useState<any>();
  //   for edit the value
  const [editValue, setEditValue] = useState<any>(null);
  const [replyEdit, setReplyEdit] = useState("");
  const [messages, setMessages] = useState<any>([
    {
      id: 123,
      avatar: "/image/photo2.png",
      name: "amyrobson",
      message: " 1st message",
      replys: [
        {
          msgId: 1231,
          message: "Lorem ipsum dolor, sit amet consectetur adipisicing e",
          id: 147,

          avatar: "/image/photo3.jpg",
          name: "maxblagun",
        },
        {
          msgId: 1231,
          avatar: "/image/photo2.png",
          message: "Lorem ipsum dolor, sit amet consectetur adipisicing e",
          id: 852,
          name: "amyrobson",
        },
        {
          name: "ramsesmiron",
          msgId: 1231,
          message: "Lorem ipsum dolor, sit amet consectetur adipisicing e",
          id: 963,
          avatar: "/image/photo4.png",
        },
      ],
    },
    {
      id: 456,
      avatar: "/image/photo3.jpg",
      name: "maxblagun",
      message: "2nd message",
      replys: [
        {
          msgId: 123123,
          message: "Lorem ipsum dolor, sit amet consectetur adipisicing e",
          id: 14700,
        },
        {
          msgId: 123132,
          message: "Lorem ipsum dolor, sit amet consectetur adipisicing e",
          id: 85200,
        },
      ],
    },
    {
      id: 789,
      avatar: "/image/photo4.png",
      name: "ramsesmiron",
      message: "3rd message",
      replys: [],
    },
  ]);
  // for delete the user
  const handleDelete = (id: any) => {
    console.log(id, "function");
    const filterer = messages?.map((e: any) => {
      const show = e?.replys?.filter((v: any) => {
        return v.id !== id;
      });
      return { ...e, replys: show };
    });
    setMessages(filterer);
  };
  //   for open and close
  const handleRelpy = (id: any) => {
    setIsOpen(id);
  };
  //   for reply the message
  const handleSubmit = (id: any) => {
    setMessages((prevMessages: any) =>
      prevMessages.map((message: any) =>
        message.id === id
          ? {
              ...message,
              replys: [
                ...message.replys,
                {
                  msgId: message.id,
                  message: showValue,
                  id: Math.random(),
                },
              ],
            }
          : message
      )
    );
    setShowValue("");
  };
  //   edit the textarea
  const handleEdit = (id: any) => {
    setEditValue(id);
  };
  // for upate value
  const handleUpdate = (id: any) => {
    const filterer = messages?.map((e: any) => {
      const show = e?.replys?.map((v: any) => {
        if (v.id === id) {
          v.message = replyEdit;
        }
        return v;
      });
      return { ...e, replys: show };
    });
    setMessages(filterer);
    setEditValue(null);
  };
  const username = useSelector((state: any) => state.login.user);
  console.log(username, "getting username");

  return (
    <>
    {/* {username.map((item:any)=>{
      return(
        item && <div>{item.firstname}</div>
      )
    })} */}
      <div className="flex flex-col space-y-3 justify-center items-center w-full h-auto ">
        {messages?.map((v: any, i: any) => (
          <div key={i}>
            <div className=" h-40 bg-white rounded-md m-auto">
              <div className="flex justify-between p-3">
                {/* <CommentBtn/> */}
                <div className="flex">
                  <Image
                    src={v.avatar}
                    className="img-fluid mr-2"
                    alt={v.name}
                    width={30}
                    height={10}
                  />
                  {v.name}
                </div>

                <button
                  className="text-[#5457b6]"
                  onClick={() => handleRelpy(v.id)}
                >
                  <Image src="/reply.svg" alt="image" width={20} height={20} />
                </button>
              </div>
              {v?.id == isOpen ? (
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
                    onClick={() => handleSubmit(v.id)}
                  >
                    send
                  </div>
                </form>
              ) : (
                <p className="p-3">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo
                  itaque impedit voluptate et, quod quidem
                </p>
              )}
            </div>

            {Array.isArray(v.replys) &&
              v.replys.length !== 0 &&
              v.replys.map((b: any, id: any) => {
                return (
                  <div key={id} className=" h-36 flex justify-end  mt-4 ">
                    <div
                      className="  bg-white flex justify-between p-3 !rounded-md"
                      style={{ width: "90%" }}
                    >
                      {b?.id == editValue ? (
                        <form className="flex justify-evenly">
                          <textarea
                            id="message"
                            name="reply"
                            defaultValue={b.message}
                            onChange={(e: any) => setReplyEdit(e.target.value)}
                            className="block p-2.5 w-40 h-36 text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-gray-200 focus:border-gray-200 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Add a Comment"
                            style={{ width: "394px", height: "119px" }}
                          ></textarea>
                          <div
                            className="bg-replyBtn cursor-pointer text-white p-2 rounded-md ml-2 mt-7 w-24 h-9 text-center"
                            onClick={() => handleUpdate(b.id)}
                          >
                            update
                          </div>
                        </form>
                      ) : (
                        <>
                          <p>{b.message}</p>
                          <div>
                            <button
                              className="text-[#ed6468] mr-2"
                              onClick={() => handleDelete(b.id)}
                            >
                              <Image
                                src="/delete.svg"
                                alt="delete btn "
                                width={18}
                                height={15}
                              />
                            </button>
                            <button
                              className="text-[#5457b6] "
                              onClick={() => handleEdit(b.id)}
                            >
                              <Image
                                src="/edit.svg"
                                alt="edit btn"
                                width={15}
                                height={15}
                              />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </>
  );
};
export default Cards;
