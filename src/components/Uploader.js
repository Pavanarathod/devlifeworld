import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const Uploader = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="p-2">
      <div className="">
        <div className="border border-black flex items-center py-2 px-1">
          <img src={user?.photoURL} className=" h-10 rounded-full" alt="" />
          <div className="ml-2 p-2 cursor-pointer">
            <h3 className="text-yellow-400 text-base font-semibold tracking-wider">
              {user?.displayName}
            </h3>
          </div>
        </div>
        <div className="px-1 mt-2">
          <Link to="/posts">
            <button className="rounded-md text-lg focus:outline-none focus:ring-1 focus:ring-gray-900 cursor-pointer font-semibold bg-pink-500 w-full py-1">
              create new post
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Uploader;
