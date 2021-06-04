import React, { useState } from "react";
import CreateGroup from "./CreateGroup";

const Groups = () => {
  const [showGroups, setShowGroups] = useState(false);

  const showGroupsContainer = () => {
    setShowGroups(!showGroups);
  };

  return (
    <div className="text-white px-3 py-2 cursor-pointer">
      <div
        className="bg-indigo-600 p-1 flex justify-center rounded-md"
        onClick={showGroupsContainer}
      >
        <button className="text-white  font-semibold tracking-wider focus:outline-none">
          View Groups
        </button>
      </div>

      {showGroups && (
        <div>
          <CreateGroup />
        </div>
      )}
    </div>
  );
};

export default Groups;
