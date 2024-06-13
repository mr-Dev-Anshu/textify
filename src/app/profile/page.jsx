import React from "react";
import { getSession } from "@/action";
import { redirect } from "next/navigation";
import ProfileComponent from "@/components/ProfileComponent";
import Link from "next/link";

const page = async () => {
  const session = await getSession();
  if (!session.userid) {
    redirect("/login");
  }
  return (
    <div className="text-white space-y-6">
      <div className=" md:mt-12 mt-6  text-2xl font-bold text-blue-500 flex justify-center ">
        Hello {session.userid}{" "}
      </div>
      <div className=" md:mt-4  text-xl font-medium  flex justify-center ">
        {" "}
        <Link href={"/allimages"}>
          <button className="text-white bg-blue-700 px-12 py-2 rounded-md ">
            View All{" "}
          </button>
        </Link>{" "}
      </div>
      <ProfileComponent userid={session.userid} />
    </div>
  );
};
export default page;
