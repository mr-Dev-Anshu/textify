import { getImage } from "@/action";
import { NextResponse } from "next/server";
export const GET = async () => {
  try {
    const allImage = await  getImage();
     
    return NextResponse.json(allImage);
  } catch (error) {
    return NextResponse.json("Error while getting all Images ");
  }
};
