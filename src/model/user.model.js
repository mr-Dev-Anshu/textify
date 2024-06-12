import mongoose from "mongoose";
const schema = mongoose.Schema({
  userid: {
    type: String,
    lowercase: true,
  },
  password: {
    type: String,
  },
});
const User = mongoose.models?.User || new mongoose.model("User", schema);
export default User;
