import mongoose from "mongoose";

const schema = mongoose.Schema;

const cartSchema = new schema(
  {
    user_id: {
      type: schema.Types.ObjectId,
      ref: "user",
      required: [true, "user id must be required"],
    },
    date: {
      type: Date,
      default: Date.now,
    },

    product_id: {
      type: schema.Types.ObjectId,
      required: [true, "product id must be required"],
      ref: "Product",
    },
    storeProduct: {
      type: schema.Types.ObjectId,
      required: [true, "storeProduct id must be required"],
      ref: "storeProduct",
    },
    quantity: {
      type: Number,
      min: [1, "minimum quantity must be greater than 1"],
      required: [true, "quantity must be required"],
    },
    Instock: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true }
);

const cartModel = new mongoose.model("cart", cartSchema);

export default cartModel;
