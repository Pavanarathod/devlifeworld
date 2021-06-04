import React from "react";
import office from "../assets/images/pink.png";
import logo2 from "../assets/images/dev.svg";
import { auth, provider } from "../firebase";

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <div className="bg-black text-white h-screen w-full">
      <div className="p-3 sm:flex sm:justify-between sm:w-9/12 sm:ml-auto sm:mr-auto">
        <img src={office} alt="Logo" className="h-9 sm:h-12 " />
        <h1 className="hidden">.</h1>
      </div>
      <h2 className="text-center mt-4 text-pink-600 text-lg font-semibold font-sans">
        Wlcome to the your proffessional coummunity
      </h2>

      <div className=" w-full">
        <div className="sm:flex sm:justify-between sm:w-3/4 sm:ml-auto sm:mr-auto sm:items-center sm:mt-10">
          <div className="p-5 ">
            <img src={logo2} alt="Logo" className="sm:h-[300px]" />
          </div>
          <div className="hidden sm:block">
            <button
              onClick={signIn}
              className="px-5 sm:px-7 text-lg text-pink-400 rounded-full font-semibold py-2 border border-pink-500 focus:outline-none hover:bg-pink-500 hover:text-black"
            >
              Sign in with google
            </button>
          </div>
          <div className="flex justify-center mt-5 sm:hidden">
            <button
              onClick={signIn}
              className="px-5 sm:px-7 text-lg text-pink-500 font-semibold py-2 border border-pink-500 rounded-full focus:outline-none  focus:text-black hover:bg-pink-500 hover:text-black"
            >
              Sign in with google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
