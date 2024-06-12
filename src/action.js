"use server";

import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { dbconnection } from "./db/dbconnection";
import User from "./model/user.model";
import bcryptjs from "bcryptjs";

export const getSession = async () => {
  const session = await getIronSession(cookies(), sessionOptions);
  return session;
};

export const login = async (formData) => {
  const userid = formData.get("userid");
  const password = formData.get("password");

  if (!userid || !password || userid.trim() === "" || password.trim() === "") {
    throw new Error("Please fill in the credentials!");
  }

  dbconnection();
  const user = await User.findOne({ userid });

  if (!user) {
    throw new Error("User not found");
  }

  const passwordMatch = await bcryptjs.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Wrong Password");
  }
  const session = await getSession();
  session.userid = userid;
  await session.save();
  redirect("/profile");
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};

export const signUp = async (formData) => {
  const userid = formData.get("userid");
  const password = formData.get("password");

  if (!userid || !password || userid.trim() === "" || password.trim() === "") {
    throw new Error("Please fill in the credentials!");
  }

  dbconnection();
  const hashedPassword = await bcryptjs.hash(password, 10);
  const newUser = await User.create({ userid, password: hashedPassword });
  console.log(newUser);

  const session = await getSession();
  session.userid = userid;
  await session.save();
  redirect("/profile");
};
