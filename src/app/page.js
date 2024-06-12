import { getSession } from "@/action";
import HomePublic from "@/components/HomePublic";
import { redirect } from "next/navigation";
const page = async () => {
  const session = await getSession();

  if (session.userid) {
    redirect("/profile");
  }
  return (
    <div>
      <HomePublic />
    </div>
  );
};

export default page;
