import React, { useState } from "react";
import database from "../firebase";
import "../styles/CreateGroup.css";
import FlipMove from "react-flip-move";
import GroupLists from "./GroupLists";
import firebase from "firebase";
import { useCollection } from "react-firebase-hooks/firestore";
const CreateGroup = () => {
  const [showForm, setShowForm] = useState(false);
  const [inputGroupName, setInputGroupName] = useState("");

  const createGroup = (e) => {
    e.preventDefault();
    if (!inputGroupName) return alert("Please enter the groupname...");
    database
      .collection("groups")
      .add({
        groupName: inputGroupName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((err) => alert(err.message));

    setInputGroupName("");
  };
  const groupdata = database.collection("groups").orderBy("timestamp", "desc");
  const [colleciton] = useCollection(groupdata);

  const showForms = () => {
    setShowForm(!showForm);
  };
  return (
    <div className="">
      <div className="mt-3 p-1 flex justify-center bg-green-500 rounded-md cursor-pointer ">
        <h1 onClick={showForms} className="text-black font-semibold">
          Create Group
        </h1>
      </div>
      {showForm && (
        <div className="mt-2">
          <form className=" w-full">
            <input
              value={inputGroupName}
              onChange={(e) => setInputGroupName(e.target.value)}
              type="text"
              placeholder="Group name"
              className="w-full py-1 bg-transparent border-2 border-pink-400 focus:outline-none placeholder-pink-400 p-2 rounded-md"
            />
            <div className="flex justify-center">
              <button
                onClick={createGroup}
                className="p-1 px-3 bg-pink-500 text-black w-5/12 rounded-sm text-base font-bold mt-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}
      <h2 className=" text-lg text-gray-400">
        {" "}
        <span className=" text-2xl">#</span> Groups
      </h2>

      <FlipMove>
        <div className="mt-2 overflow-y-scroll max-h-64 border-t-4 border-pink-500 name">
          {colleciton?.docs.map((doc) => (
            <GroupLists
              key={doc.id}
              id={doc.id}
              groupName={doc.data().groupName}
            />
          ))}
        </div>
      </FlipMove>
    </div>
  );
};

export default CreateGroup;
