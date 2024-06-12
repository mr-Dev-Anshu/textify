import { NextResponse } from "next/server";
import { parse } from "cookie";

export const GET = async (req) => {
  try {
    const cookies = parse(req.headers.cookie || "");
    const accessToken = cookies.accessToken;
    console.log("Parsed Cookies:", cookies);
    console.log("Access Token:", accessToken);
    return NextResponse.json({
      message: "Sab Accha hai ",
    });
  } catch (error) {
    console.log(error);
    return NextResponse("nahi chala ");
  }
};