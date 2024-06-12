"use client";

import { useState } from 'react';
import { signUp } from "@/action";
import Link from "next/link";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    const formData = new FormData(e.target);
    const userid = formData.get("userid");
    const password = formData.get("password");

    if (!userid || !password || userid.trim() === "" || password.trim() === "") {
      setErrorMessage("Please fill in the credentials!");
      setLoading(false);
      return;
    }

    try {
      await signUp(formData);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center md:mt-24 text-white">
      <form onSubmit={handleSignUp} className="md:w-[40%] border border-gray-800 shadow-2xl flex justify-center flex-col items-center md:py-12 space-y-6 rounded-md">
        <p className="text-2xl font-bold">Signup here</p>
        <input
          className="bg-transparent focus:outline border border-gray-600 px-6 py-2 placeholder:text-gray-500 placeholder:text-xl placeholder:font-bold rounded-md md:w-[70%]"
          placeholder="Enter User id"
          type="text"
          name="userid"
        />
        <input
          className="bg-transparent focus:outline border border-gray-600 px-6 py-2 placeholder:text-gray-500 placeholder:text-xl placeholder:font-bold rounded-md md:w-[70%]"
          placeholder="Enter Password"
          type="password"
          name="password"
        />
        <button className="bg-green-700 py-2 px-4 rounded-md md:w-[70%]" type="submit">
          {loading ? "Loading..." : "SignUp"}
        </button>
      </form>
      {errorMessage && (
        <div className="text-red-500 mt-4">
          {errorMessage}
        </div>
      )}
      <div className="border border-gray-700 md:mt-6 w-[40%] text-2xl py-4 px-12">
        If you already have an account,{" "}
        <Link href={"/login"}>
          <span className="text-green-600 cursor-pointer text-2xl">Login</span>
        </Link>
      </div>
    </div>
  );
};

export default Page;
