import React, { forwardRef } from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import { Link } from "react-router-dom";
import * as timeago from "timeago.js";

const Posts = forwardRef(
  ({ id, username, userPhoto, imageUrl, caption, timestamp }, ref) => {
    return (
      <div className="text-white border-b border-gray-800" ref={ref}>
        <div className="flex justify-between bg-gray-900 py-2 px-2 items-center border-t-2 border-pink-500">
          <div className="flex items-center">
            <img src={userPhoto} alt={username} className="h-9 rounded-full" />
            <p className="ml-2 text-sm font-semibold tracking-wider text-pink-400">
              {username}
            </p>
          </div>
          <MoreHorizIcon className="text-pink-500" fontSize="large" />
        </div>
        <div className="w-full">
          <img src={imageUrl} alt="" className="object-contain w-full" />
        </div>

        <div>
          <div className=" mt-2">
            <h4 className=" text-indigo-500 text-base font-semibold tracking-wider">
              {username}:{" "}
              <span className="text-green-400 text-sm"> {caption}</span>{" "}
            </h4>
          </div>
        </div>

        <div className="mt-2">
          <Link to={`/comments/${id}`}>
            <h4 className="text-sm font-semibold cursor-pointer tracking-wider text-gray-400">
              View all comments...
            </h4>
          </Link>
        </div>

        <div className=" w-full flex justify-end">
          <Link to={`/comments/${id}`}>
            <div className="flex items-center mr-4 cursor-pointer">
              <h4 className=" text-pink-400">Add comment</h4>
              <CommentOutlinedIcon
                className="ml-2 text-pink-400"
                fontSize="small"
              />
            </div>
          </Link>
        </div>

        <div className="pb-1">
          <h4 className="text-gray-400">
            {timeago.format(new Date(timestamp?.toDate()))}
          </h4>
        </div>
      </div>
    );
  }
);

export default Posts;
