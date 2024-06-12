import mongoose from "mongoose";
const schema = mongoose.Schema({
  userid: {
    type: String,
  },
  imgurl: {
    type: String,
  },
  text: {
    type: String,
  },
});
const Image = mongoose.models?.Image || new mongoose.model("Image", schema);
export default Image;
