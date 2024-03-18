import React, { useState } from "react";

import DarkMode from "/assets/icon/Inactive_darkmode.svg";
import Avatar from "/assets/image/Avatar.png";
import { Link } from "react-router-dom";

const Header = ({ heading }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-[28px] font-medium text-[#2B3674]">
          Welcome Back, Krishna
        </h1>
      </div>
      <div className="flex gap-6 bg-white px-5 py-3 rounded-full">
        <img src={DarkMode} alt="dark mode icon" />
        <Link to={`/profile`}>
          <img src={Avatar} alt="Avatar" className=" object-cover" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
