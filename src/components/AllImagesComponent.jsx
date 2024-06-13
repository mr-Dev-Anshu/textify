"use client";
import { getImage } from "@/action";
import React, { useEffect, useState } from "react";
const page = () => {
  const [allImage, setAllImage] = useState();
  useEffect(async () => {
    const images = await getImage();
    setAllImage(images);
  }, []);
  return (
    <div className="text-white md:px-6 px-4  md:py-8 space-y-4 ">
      {allImage?.map((item) => (
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
      ))}
    </div>
  );
};

export default page;
