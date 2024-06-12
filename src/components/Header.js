import { getSession, logout } from "@/action";
import Link from "next/link";
import React from "react";

const Header = async () => {
  const session = await getSession();
  console.log(!session.userid);
  return (
    <div>
      <div className=" ">
        <ul className=" flex  justify-between md:px-10 w-[100%]  text-white font-bold text-2xl  border-b border-gray-500  py-4 ">
          <Link href={"/"}><li className="cursor-pointer ">Textify</li></Link>
          {session.userid?<li className="cursor-pointer ">
            <form action={logout}>
              <button className="cursor-pointer">Logout</button>
            </form>
          </li>:<Link href={"/signup"}><li className="cursor-pointer ">Login</li></Link>}
          <li className="cursor-pointer ">GitHub</li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
