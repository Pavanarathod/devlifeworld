import React, { forwardRef } from "react";

const CommentList = forwardRef(({ userPhoto, userName, comments }, ref) => {
  return (
    <div className="" ref={ref}>
      <div className="flex">
        <img
          src={userPhoto}
          alt=""
          className="h-11 sm:h-14 rounded-full p-1 border border-pink-500"
        />

        <div className="flex flex-col">
          <div className="ml-3">
            <p className="text-green-300">{userName} : </p>
          </div>
          <div className="ml-3">
            <p className="text-white text-sm sm:text-lg font-semibold tracking-wider">
              {comments}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CommentList;
