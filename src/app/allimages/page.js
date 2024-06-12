"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [allImage, setAllImage] = useState();
  const getData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getimages`,
        {
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
      console.log(res.data);
      setAllImage(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="text-white md:px-6 md:py-8 space-y-4 ">
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
