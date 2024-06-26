"use client";
import { useState } from "react";
import { login } from "@/action";
import Link from "next/link";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const formData = new FormData(e.target);
    const userid = formData.get("userid");
    const password = formData.get("password");

    if (
      !userid ||
      !password ||
      userid.trim() === "" ||
      password.trim() === ""
    ) {
      setErrorMessage("Please fill in the credentials!");
      setLoading(false);
      return;
    }

    try {
      await login(formData);
    } catch (error) {
      setErrorMessage(error?.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20  md:mt-24 text-white ">
      <form
        onSubmit={handleLogin}
        className="md:w-[40%] border border-gray-800 shadow-2xl flex justify-center flex-col items-center md:py-12 py-6 px-4 space-y-6 rounded-md"
      >
        <p className="text-2xl md:text-3xl   font-medium">Login Here</p>
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
        <button
          className="bg-green-700 py-2 px-4 rounded-md md:w-[70%] w-[90%]"
          type="submit"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
      <div className="border border-gray-700 md:mt-6 mt-3 md:w-[40%] w-[80%] text-xl md:text-2xl  py-4 px-12">
        If you don't have an account,{" "}
        <Link href={"/signup"}>
          <span className="text-green-600 cursor-pointer text-2xl">Signup</span>
        </Link>
      </div>
    </div>
  );
};

export default Page;
