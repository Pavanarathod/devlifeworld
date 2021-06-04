import React from "react";
const UserPostList = ({ userPostImage }) => {
  return (
    <div>
      <div className="px-3 py-1 p-3 sm:flex sm:justify-center">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 space-y-4 sm:space-y-0">
          <img src={userPostImage} alt="" className="sm:h-44 object-contain" />
        </div>
      </div>
    </div>
  );
};

export default UserPostList;
