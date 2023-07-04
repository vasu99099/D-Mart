import mongoose from "mongoose";

const schema = mongoose.Schema;

const cartSchema = new schema({
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
    ref: "product",
  },
  quantity: {
    type: Number,
    min: [1, "minimum quantity must be greater than 1"],
    required: [true, "quantity must be required"],
  },
});


const cartModel = new mongoose.model("cart", cartSchema);


export default cartModel;
