import { getImage } from "@/action";
import Image from "next/image";
import React from "react";

const page = async () => {
  const allImage = await getImage();

  const url =
    "https://res.cloudinary.com/diwr0wqyw/image/upload/v1718186171/xxacqhu9uijdlscvtm3t.png";

  return (
    <div className="text-white md:px-6 md:py-8 space-y-4 ">
      {
        allImage.map((item)=> (
          <div className="grid md:grid-cols-2 gap-3">
          <div>
            <img className="rounded-md " src={item.imgurl} alt="img" />
          </div>
          <div>
            <p className="border border-gray-600 h-full px-2 py-2">
              {item.text}
            </p>
          </div>
        </div>
        ))
      }
    </div>
  );
};

export default page;
