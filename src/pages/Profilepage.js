import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import database, { auth } from "../firebase";
import { Link } from "react-router-dom";
import UserPostList from "../components/UserPostList";
import { useCollection } from "react-firebase-hooks/firestore";

const Profilepage = () => {
  const [user] = useAuthState(auth);
  const data = database.collection("posts").where("id", "==", user.uid);

  const [userData] = useCollection(data);

  return (
    <div className="w-full bg-gray-900 h-[150vh]">
      <div className="w-full bg-gray-800 sm:w-3/4 sm:ml-auto sm:mr-auto">
        <div className="flex justify-between bg-gray-300 py-2 items-center sticky top-0">
          <div className="flex items-center">
            <Link to="/">
              <ArrowBackIcon className="text-black ml-2" fontSize="large" />
            </Link>
            <h1 className="text-black text-base font-semibold tracking-wider ml-2">
              Profile
            </h1>
          </div>
          <div className="mr-3">
            <button
              onClick={() => auth.signOut()}
              className="px-4 py-1 bg-gray-800 text-white text-base font-semibold focus:outline-none cursor-pointer rounded-sm"
            >
              Signout
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <img
            src={user?.photoURL}
            alt=""
            className="rounded-full sm:h-28 shadow-lg border-2 border-pink-500"
          />
        </div>

        <div className="flex justify-center mt-3 border border-gray-600 py-3 shadow-lg">
          <div>
            <h1 className="text-white text-base sm:text-lg tracking-wider font-semibold">
              <span className="text-green-400">Username: </span>
              {user?.displayName}
            </h1>
            <h1 className="text-white text-base font-semibold sm:text-lg tracking-wider ">
              <span className="text-green-400">Email: </span> {user?.email}
            </h1>
          </div>
        </div>

        <div className="mt-3">
          {!userData && (
            <div>
              <h1 className="text-center text-white text-base font-semibold">
                No posts
              </h1>
            </div>
          )}

          <div className="flex justify-center mt-2">
            <Link to="/posts">
              <button className="px-6 py-1 bg-green-400 text-base font-semibold rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-300">
                Create new post
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-2">
          {userData?.docs.map((doc) => (
            <UserPostList
              key={doc.id}
              userPostImage={doc.data().postImageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
