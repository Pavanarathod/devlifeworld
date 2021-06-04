import React from "react";
import life from "../assets/images/life.png";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="sticky top-0 border-b border-gray-800 shadow-lg z-50 ">
      <div className="p-2 flex justify-between sm:justify-between sm:w-3/4 sm:ml-auto sm:mr-auto items-center bg-black">
        <div>
          <img src={life} alt="" className="h-8 sm:h-11" />
        </div>
        <div className="flex items-center">
          <Link to="/profile">
            <PermIdentityIcon
              className="text-yellow-400 mr-2 sm:mr-0"
              fontSize="default"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
