import React from "react";

const Header = () => {
  return (
    <div>
      <div className=" ">
        <ul className=" flex  justify-between md:px-10 w-[100%]  text-white font-bold text-2xl  border-b border-gray-500  py-4 ">
          <li className="cursor-pointer ">Textify</li>
          <li className="cursor-pointer ">Login</li>
          <li className="cursor-pointer ">Gitgub</li>
        </ul>
      </div>
    </div>
  );
};
export default Header;