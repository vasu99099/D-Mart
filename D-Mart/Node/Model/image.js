import mongoose from "mongoose";

const schema = mongoose.Schema;

const Image = new schema({
  url: {
    type: String,
    required: true,
  },
  alt: String,
  title: {
    type: String,
    required: true,
  },
});

const ImageModel = new mongoose.model("image", Image);




export default ImageModel;
