import React, { useState } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link, useHistory } from "react-router-dom";
import ImageIcon from "@material-ui/icons/Image";
import { useAuthState } from "react-firebase-hooks/auth";
import database, { auth, storage } from "../firebase";
import firebase from "firebase";

const CreatePost = () => {
  const [user] = useAuthState(auth);
  const [postImage, setPostImage] = useState("");
  const [caption, setCaption] = useState("");
  const history = useHistory();
  const storageRef = storage;

  const gettingImage = (e) => {
    const selectedImage = e.target.files[0];
    setPostImage(selectedImage);
  };
  const clearData = (e) => {
    e.preventDefault();
    setPostImage("");
    setCaption("");
  };

  const submitUserPost = (event) => {
    event.preventDefault();
    if (!postImage && !caption) return alert("Please enter the coreect data");

    const imageData = storageRef
      .ref(`userPosts/${postImage.name}`)
      .put(postImage);
    imageData.on(
      "STATE_CHANGED",
      null,
      (error) => {
        alert(error.message);
      },
      () => {
        storage
          .ref("userPosts")
          .child(postImage.name)
          .getDownloadURL()
          .then((url) => {
            database.collection("posts").add({
              username: user.displayName,
              userPhoto: user.photoURL,
              email: user.email,
              id: user.uid,
              postImageUrl: url,
              imageCaptin: caption,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
          });
      }
    );
    history.push("/");
  };

  return (
    <div className="w-full">
      <div className="w-full sm:w-1/2 sm:ml-auto sm:mr-auto">
        <div className="flex items-center bg-green-400 py-2 sticky top-0">
          <Link to="/">
            <ArrowBackIcon className=" ml-2" fontSize="large" />
          </Link>

          <h1 className="text-base font-semibold ml-2 text-gray-700">Share</h1>
        </div>
        <div className="mt-3">
          <form>
            <div className="flex justify-center ">
              <input
                type="file"
                accept="image/gif, image/jpeg, image/png"
                name="image"
                id="file"
                onChange={gettingImage}
                style={{ display: "none" }}
              />
              <div>
                <h1>
                  <ImageIcon
                    className=" text-green-400 mr-2"
                    fontSize="large"
                  />
                  <label
                    htmlFor="file"
                    className="text-green-400 text-base font-bold cursor-pointer"
                  >
                    Select Image
                  </label>
                </h1>
              </div>
            </div>

            {postImage && (
              <div className="px-3">
                <div className="mt-4 border-t-4 border-green-400">
                  <img
                    src={URL.createObjectURL(postImage)}
                    alt=""
                    className="w-full h-96 object-contain"
                  />
                </div>

                <div className="mt-4 ">
                  <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    cols="30"
                    rows="10"
                    className="w-full max-h-20 border-2 shadow-lg p-2 placeholder-green-400 rounded-sm text-green-400 focus:outline-none text-lg bg-transparent border-green-400"
                    placeholder="What's in you'r mind..."
                  ></textarea>
                </div>

                <div className="mt-4">
                  <button
                    onClick={submitUserPost}
                    className="w-full py-1 rounded-md text-lg font-bold cursor-pointer focus:outline-none focus:ring-1 focus:ring-green-500 bg-green-400 tracking-wider"
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </form>
          {postImage && (
            <div className="px-3">
              <button
                onClick={clearData}
                className="w-full mt-4 py-1 rounded-md text-lg font-bold focus:outline-none cursor-pointer bg-red-400 tracking-wider"
              >
                clear
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
