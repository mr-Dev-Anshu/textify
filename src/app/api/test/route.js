import { dbconnection } from "@/db/dbconnection";
import { NextResponse } from "next/server";

export const GET = async () => {
  dbconnection();
  return NextResponse.json("heyyyy");
};
