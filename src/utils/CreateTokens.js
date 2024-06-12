import User from "@/model/user.model";
import jwt  from "jsonwebtoken";
export const createToken = async (id) => {
  const user = await User.findOne({ _id: id });
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
