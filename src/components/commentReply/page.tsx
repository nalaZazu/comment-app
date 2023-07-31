import React from "react";
import Image from "next/image";
import CommentForm from "../commentForm/page";

const CommentReply = () => {
  return (
    <div className="">
      <div className=" bg-white   m-auto h-36 rounded-md " style={{width:"50%"}} >
        <div className="flex p-3 justify-around mt-12" >
          <div>
            <Image
              src="/image/photo1.jpg"
              alt="image"
              width={40}
              height={40}
              className=" rounded-full"
            />
          </div>
          <CommentForm />
        </div>
      </div>
    </div>
  );
};

export default CommentReply;
