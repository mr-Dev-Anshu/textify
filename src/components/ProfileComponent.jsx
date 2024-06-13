"use client";
import React, { useRef, useState } from "react";
import convertor from "@/app/lib/convetor";
import { FaRegImage } from "react-icons/fa6";
import axios from "axios";
import { createImage } from "@/action";

const ProfileComponent = ({ userid }) => {
  const inputRef = useRef(null);
  const [textData, setTextData] = useState();
  const [message, setMessage] = useState(null);
  const [imgurl, setImgurl] = useState();

  const openBrowse = () => {
    inputRef.current?.click();
  };

  const handleChange = async (e) => {
    setTextData(null);
    setMessage("Hold on, extracting words like a pro! ...");
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      console.log(url);
      try {
        const text = await convertor(url);
        setMessage(null);
        setTextData(text);

        const formData = new FormData();
        const file = e.target.files[0]; // Access the first file
        formData.append("file", file);
        formData.append("upload_preset", "textify");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/diwr0wqyw/image/upload",
          formData
        );
        const imageUrl = response.data.secure_url;
        console.log("This is image URL -------->", imageUrl);
        setImgurl(imageUrl);

         const data = {
            imgurl : imageUrl , 
            userid , 
            text
         }

          await createImage(data) ; 
      } catch (error) {
        console.error("Error during text extraction or image upload:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center md:mt-12 mt-6  flex-col space-y-4 mb-12">
      <div className="text-white md:text-4xl font-bold">
        Effortlessly Extract Text from Any Image
      </div>
      <p className="font-bold text-2xl text-green-600">{message}</p>
      <input type="file" onChange={handleChange} hidden ref={inputRef} />
      <div
        onClick={openBrowse}
        className="md:w-[50%] w-[80%] h-[200px] bg-gray-800 flex cursor-pointer justify-center items-center text-white rounded-2xl text-2xl flex-col space-y-8"
      >
        <span className="text-gray-600 md:text-3xl font-bold">
          Select the image
        </span>
        <span className="text-gray-600">
          <FaRegImage size={60} />
        </span>
      </div>
      {textData && (
        <div className="flex flex-col space-y-6 justify-center items-center border-t border-gray-500 md:mt-12">
          <p className="text-white w-[60%] text-2xl font-bold border-b border-gray-500 py-2 text-center">
            Here is your Text || You Can Copy and Paste anywhere
          </p>
          <p className="text-xl font-medium w-[60%] text-center ring ring-gray-500 px-5 py-4 rounded-md text-gray-300">
            {textData}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
