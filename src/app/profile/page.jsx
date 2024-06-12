import React from "react";
import { getSession } from "@/action";
import { redirect } from "next/navigation";
import ProfileComponent from "@/components/ProfileComponent";

const page = async () => {
  const session = await getSession();
  if (!session.userid) {
    redirect("/login");
  }
  return (
    <div className="text-white">
      <ProfileComponent userid={session.userid} />
    </div>
  );
};
export default page;