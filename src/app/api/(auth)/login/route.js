import { NextResponse } from "next/server";
import { dbconnection } from "@/db/db.connection";
import bcryptjs from "bcryptjs";
import Admin from "@/model/admin.model";
import jwt from "jsonwebtoken";
const generateTokens = async (id) => {
  const user = await Admin.findOne({ _id: id });
  try {
    const accessToken = jwt.sign(
      {
        id: id,
        userId: user.userId,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
      {
        id: id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    // console.log(accessToken, refreshToken);

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "There is some error in tokens creation",
      error,
    });
  }
};



export const POST = async (req) => {
  dbconnection();
  try {
    const { userid, password } = await req.json();
    console.log("Credential _______________>", userid, password);
    const user = await Admin.findOne({ userId: userid });

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "UserId Not Found",
      });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({
        status: 404,
        message: "Invalid Password",
      });
    }
    const { accessToken, refreshToken } = await generateTokens(user._id);
    console.log(accessToken, refreshToken);

    const response = NextResponse.json({
      status: 200,
      data: user,
    });

    const option = {
      httpOnly: true,
      secure: true,
    };

    response.cookies.set("accessToken", accessToken, option);
    response.cookies.set("refreshToken", refreshToken, option);

    return response;
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while login the user ",
    });
  }
};
