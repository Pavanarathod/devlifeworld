import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const GroupsChats = ({ username, email, imgSrc, messageText, senderPhoto }) => {
  const [user] = useAuthState(auth);
  return (
    <div
      className={`flex justify-between relative sm:max-w-2xl
       ${user.email === email && "ml-auto"}`}
      style={{ width: "fit-content" }}
    >
      <img
        src={senderPhoto}
        alt="Avatar"
        className={`h-8 rounded-full ${user.email === email && "order-1 ml-2"}`}
      />
      <div>
        <p
          className={`text-sm sm:text-lg bg-gray-200 font-semibold tracking-wider p-1 py-2 rounded-md ml-2 ${
            user.email === email && "bg-gray-900 text-white"
          }`}
        >
          <span
            className={` text-gray-700 ${
              user.email === email && "text-red-600"
            }`}
          >
            {username} :
          </span>{" "}
          {messageText}
        </p>

        {imgSrc && (
          <img
            src={imgSrc}
            alt=""
            className={`sm:max-w-md h-24 sm:h-60 ml-2 mt-3 rounded-lg cursor-pointer border border-pink-400 ${
              user.email === email && "ml-36 sm:ml-48"
            }`}
          />
        )}
      </div>
    </div>
  );
};

export default GroupsChats;
