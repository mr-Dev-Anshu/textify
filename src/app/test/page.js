"use client";

import React, { useState } from "react";
import axios from "axios";

const Page = () => {

  const [imgurl , setImagurl ] = useState() ; 
  const handleChange = async (e) => {
    const file = e.target.files[0]; // Access the first file
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "textify");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/diwr0wqyw/image/upload",
        formData
      );
      const imageUrl = response.data.secure_url;
      console.log(imageUrl);
      setImagurl(imageUrl)
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  
  return (
    <div>
      <input onChange={handleChange} type="file" />
      <img src={imgurl} alt="img" />
    </div>
  );
};
export default Page;
