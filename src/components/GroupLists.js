import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getGroupsCredentials } from "../features/groupSlice";

const GroupLists = ({ id, groupName }) => {
  const history = useHistory();
  const dispaatch = useDispatch();
  const goToGroupspage = () => {
    dispaatch(
      getGroupsCredentials({
        group_id: id,
        groupName: groupName,
      })
    );
    history.push(`/groupspage`);
  };

  return (
    <div className=" bg-gray-800 hover:bg-gray-900" onClick={goToGroupspage}>
      <div className="flex items-center p-2 border-b border-gray-500">
        <div className="flex items-center">
          <span className=" text-4xl font-bold mr-2 text-pink-600">#</span>
          <h1 className="text-white font-semibold tracking-wider text-sm">
            {groupName}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default GroupLists;
