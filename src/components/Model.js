import React, { useState } from "react";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import { useDispatch } from "react-redux";
import { closeModel } from "../features/modelSlice";
import { Avatar } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import ReactPlayer from "react-player";
import ImageIcon from "@material-ui/icons/Image";
import VideocamIcon from "@material-ui/icons/Videocam";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

const Model = () => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const [userText, setUserText] = useState("");
  const [postImage, setPostImage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [accessArea, setAccessArea] = useState("");

  // FUNCTIONS HERE

  const handleChage = (e) => {
    const image = e.target.files[0];
    if (!image) return alert("please select an image");
    setPostImage(image);
  };

  const switchAccessArea = (area) => {
    setAccessArea(area);
  };

  const reset = () => {
    setUserText("");
    setPostImage("");
    setVideoUrl("");
  };

  const close = () => {
    dispatch(closeModel());
  };

  const uploadData = (e) => {
    e.preventDefault();
    console.log(userText);
    console.log(postImage);
    console.log(videoUrl);
  };

  return (
    <div className="fixed top-0 left-0 sm:left-40 lg:left-80 z-[9999] w-full">
      <div className="max-w-sm sm:max-w-md rounded-lg sm:rounded-sm bg-gray-800 max-h-[90%] relative top-20">
        <div className="grid place-content-end p-2  ">
          <HighlightOffOutlinedIcon
            onClick={close}
            className=" text-white cursor-pointer hover:text-black"
          />
        </div>
        <div className="flex items-center p-3">
          <Avatar src={user?.photoURL} className="border border-black" />
          <h1 className=" font-semibold ml-3 text-lg text-white tracking-wider">
            {user?.displayName}
          </h1>
        </div>

        <form>
          {accessArea === "image" ? (
            <div className="p-3">
              <textarea
                value={userText}
                onChange={(e) => setUserText(e.target.value)}
                rows="10"
                placeholder="What do you want to talk about ?"
                className="w-full bg-transparent p-3 placeholder-white border border-gray-500 focus:outline-none text-white max-h-16"
              ></textarea>
              <input
                type="file"
                accept="image/gif, image/jpeg, image/png"
                name="image"
                id="file"
                onChange={handleChage}
                style={{ display: "none" }}
              />
              <h1 className="text-center font-semibold text-sm mt-2">
                <label
                  className="text-center text-black bg-gray-100 rounded-sm px-3 py-2 border border-gray-600 cursor-pointer"
                  htmlFor="file"
                >
                  select image
                </label>
              </h1>

              {postImage && (
                <img
                  src={URL.createObjectURL(postImage)}
                  alt=""
                  className="object-contain h-64 w-full"
                />
              )}
            </div>
          ) : (
            accessArea === "media" && (
              <>
                <div className="mb-2">
                  <textarea
                    value={userText}
                    onChange={(e) => setUserText(e.target.value)}
                    rows="10"
                    placeholder="What do you want to talk about ?"
                    className="w-full bg-transparent p-3 focus:outline-none max-h-16"
                  ></textarea>
                  <div className="px-3 py-3">
                    <input
                      className="w-full py-2 p-2 text-white focus:outline-none bg-transparent border border-indigo-500 rounded-lg"
                      type="text"
                      placeholder="Enter the video url"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                    />
                  </div>
                </div>
                {videoUrl && (
                  <ReactPlayer width={"100%"} height={"200px"} url={videoUrl} />
                )}
              </>
            )
          )}

          <div className="p-3 flex justify-between">
            <div className="flex items-center pb-2">
              <ImageIcon
                onClick={() => switchAccessArea("image")}
                className=" text-green-600 cursor-pointer"
                fontSize="large"
              />
              <VideocamIcon
                onClick={() => setAccessArea("media")}
                className=" text-blue-600 ml-3 cursor-pointer"
                fontSize="large"
              />
            </div>
            <div>
              <RotateLeftIcon
                onClick={reset}
                fontSize="large"
                className="mr-6 text-white cursor-pointer"
              />
              <button
                type="submit"
                onClick={uploadData}
                className={`${
                  userText ? "bg-blue-500 text-white" : "bg-gray-400"
                } px-4 rounded-lg py-2`}
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Model;
