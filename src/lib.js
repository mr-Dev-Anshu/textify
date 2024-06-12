export const sessionOptions = {
  password: process.env.SECRET_KEY,
  cookieName: "token",
  cookieOptions: {
    httpOnly: true,
    secure: false,
  },
};
