import cartModel from "../../Model/cart.js";
import orderModel from "../../Model/order.model.js";
import mongoose from "mongoose";
import userModel from "../../Model/user.js";
import orderItemModel from "../../Model/orderItem.model.js";
import storeProductModel from "../../Model/storeviceProduct.js";
import paymentModel from "../../Model/payment.model.js";
import { sendSMS } from "../authentication/sendSMS.js";

export const getAllOrder = async (req, res) => {
  try {
    const start = req.query.start || 0;
    const limit = req.query.limit || 10;
    const query = {
      store_id: req.body.store_id,
    };
    if (req.query.tracking) {
      query.tracking = new mongoose.Types.ObjectId(req.query.tracking);
    }
    if (req.query.text) {
      query.order_id = req.query.text;
    }

    if (req.body.pickup_id) {
      query.Pickup = req.body.pickup_id;
    }
    const no_of_record = await orderModel.count(query);

    const orders = await orderModel
      .find(query)
      .populate("user_id address Pickup tracking")
      .skip(start)
      .limit(limit);

    res.status(200).json({ orders, no_of_record });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
export const postOrder = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.user_id);
    if (user.isLogined) {
      //   const session = await mongoose.startSession();
      //   session.startTransaction();
      //   await session.commitTransaction();

      const cartItem = await cartModel.find({
        user_id: req.body.user_id,
        Instock: true,
      });
      req.body.store_id = user.preferStore;
      let previous_order = await orderModel.findOne().sort({ createdAt: -1 });
      req.body.order_id =
        previous_order !== null ? previous_order.order_id + 1 : 0;
      const order = await new orderModel(req.body);
      await order.save();

      const orderComplete = cartItem.map(async (c) => {
        const price = await storeProductModel.findById(c.storeProduct);
        const orderItem = await new orderItemModel({
          user_id: user._id,
          order_id: order._id,
          product_id: c.product_id,
          quantity: c.quantity,
          Price: price.D_mart_Price,
          storeProduct_Id: c.storeProduct,
        });
        await orderItem.save();

        await storeProductModel.findByIdAndUpdate(c.storeProduct, {
          Quantity_in_stock: price.Quantity_in_stock - c.quantity,
        });

        await cartModel.findByIdAndRemove(c._id);
      });

      Promise.all(orderComplete).then(async () => {
        if (req.body.paymentStatus === "success") {
          const payment = await new paymentModel({
            payment_id: req.body.razorpay_payment_id,
            order_id: order._id,
            Total_amount: req.body.Total_amount,
          });
          await payment.save();
        }
        // sendSMS("")
        res.status(200).send("success");
      });
    } else {
      res.status(401).send("User not logged in");
    }
  } catch (e) {
    //   await session.abortTransaction();

    res.status(404).json({ message: e.message });
  }
};
export const updateOrder = async (req, res) => {
  try {
    const order = await orderModel
      .findByIdAndUpdate(req.params.orderId, req.body, {
        runValidators: true,
        new: true,
      })
      .populate("tracking");

    if (order === null) {
      throw new Error("invalid order id");
    }
    res.status(200).json(order);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const orderItems = await orderItemModel.find({
      order_id: req.params.orderId,
    });

    orderItems.map(async (orderItem) => {
      await storeProductModel.findByIdAndUpdate(orderItem.storeProduct_Id, {
        $inc: { Quantity_in_stock: orderItem.quantity },
      });
    });

    Promise.all(orderItems).then(async () => {
      const ordercancel = await orderModel
        .findByIdAndUpdate(
          req.params.orderId,
          {
            tracking: "64b766edefd8d5d106ee8f21",
          },
          { runValidators: true, new: true }
        )
        .populate("tracking");
      res.status(200).json(ordercancel);
    });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
