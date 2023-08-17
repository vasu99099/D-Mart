
import mongoose from "mongoose";

const schema = mongoose.Schema;

const orderSchema = new schema(
  {
    order_id: {
      type: Number,
      required: true,
      default:0
    },
    user_id: {
      type: schema.Types.ObjectId,
      ref: "user",
      required: [true, "user id must be required"],
    },
    address: {
      type: schema.Types.ObjectId,
      ref: "address",
    },
    timeslot: {
      type: String,
      required: [true, "timeslot id must be required"],
    },
    Pickup: {
      type: schema.Types.ObjectId,
      ref: "pickupPoint",
    },
    store_id: {
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
      type: schema.Types.ObjectId,
      ref: "track",
      default: "64b67392b1b09e755f6f5413",
    },
    OrderType: {
      type: String,
      enum: ["Home Delivery", "Pick Up"],
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["Pending", "Paid", "cancel"],
    },
    paymentMode: {
      type: String,
      required: true,
      enum: ["Online", "COD"],
    },
  },
  { timestamps: true }
);

const orderModel = new mongoose.model("order", orderSchema);

export default orderModel;
