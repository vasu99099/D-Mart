import mongoose from "mongoose";

const schema = mongoose.Schema;

const orderSchema = new schema(
  {
    user_id: {
      type: schema.Types.ObjectId,
      ref: "user",
      required: [true, "user id must be required"],
    },
    address: {
      type: schema.Types.ObjectId,
      ref: "address",
    },
    timeslot:{
        type:String,
        required: [true, "timeslot id must be required"]
    },
    Pickup: {
      type: schema.Types.ObjectId,
      ref: "pickupPoint",
    },
    storeProduct_id: {
      type: schema.Types.ObjectId,
      ref: "storeproducts",
    },
    Order_date: {
      type: Date,
      default: Date.now,
    },
    Total_amount: {
      type: Number,
      required: true,
    },
    deliver_charges: {
      type: Number,
    },
    Payment_id: {
      type: schema.Types.ObjectId,
      ref: "Payment",
    },
    tracking: {
      type: String,
      enum: ["order placed", "dispatch", "Delivered"],
    },
    OrderType: {
      type: String,
      enum: ["Home Delivery", "Pick Up"],
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["success", "fail", "cancel","COD"],
    },
  },
  { timestamps: true }
);

const orderModel = new mongoose.model("order", orderSchema);

export default orderModel;
