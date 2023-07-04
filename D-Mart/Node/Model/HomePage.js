import mongoose from "mongoose";

const schema = mongoose.Schema;

const homePageSchema = new schema({
  order: {
    type: Number,
    required: true,
  },
  images: [
    {
      image_id: {
        type: schema.Types.ObjectId,
        ref: "image",
      },
      path: {
        type: String,
      },
    },
  ],
  isCarousel: Boolean,
});

const homePageModel = new mongoose.model("homepage", homePageSchema);

export default homePageModel;
