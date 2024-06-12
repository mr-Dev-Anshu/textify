import { dbconnection } from "@/db/dbconnection";
import { NextResponse } from "next/server";
import User from "@/model/user.model";
import bcryptjs from "bcryptjs";
import { createToken } from "@/utils/CreateTokens";
import { cookies } from "next/headers";

export const POST = async (req) => {
  try {
    dbconnection();
    const { userid, password } = await req.json();

    if (!userid || !password) {
      return NextResponse.json({
        status: 400,
        message: "Please Provide Valid info ",
      });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({ userid, password: hashedPassword });

    const { accessToken, refreshToken } = await createToken(newUser._id);
    console.log("accesstoken ----->", accessToken);
    console.log("RefreshToken ----->", refreshToken);

    const option = {
      httpOnly: true,
      secure: true,
    };
    const response = NextResponse.json({
      status: 200,
      data: newUser,
    });
       const expires = new Date (Date.now()+(60*1000)*60) ; 

      cookies().set("accessToken" ,accessToken , { expires ,  httpOnly:true} ) ; 
    console.log("Cookiess set ");
    return response;
  } catch (error) {
    return NextResponse.json({
      staus: 500,
      data: error,
      message: "there is some error  while creating user ",
    });
  }
};
