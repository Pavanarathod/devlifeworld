import React from "react";
import office from "../assets/images/pink.png";
import { ThreeBounce } from "better-react-spinkit";
const Loading = () => {
  return (
    <center className="grid place-items-center h-screen bg-black">
      <div>
        <img src={office} alt="" className="mb-3" />

        <ThreeBounce size={50} color="pink" />
      </div>
    </center>
  );
};

export default Loading;
