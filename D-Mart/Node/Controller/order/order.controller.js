import cartModel from "../../Model/cart.js";
import orderModel from "../../Model/order.model.js";
import mongoose from "mongoose";
import userModel from "../../Model/user.js";
import orderItemModel from "../../Model/orderItem.model.js";
import storeProductModel from "../../Model/product/storeviceProduct.js";
import paymentModel from "../../Model/payment.model.js";

// export const getAllOrder = async (req, res) => {
//   try {
//     req.body.user_id = "6496e3a83a3b889337a82ee5";
//     const orders = await orderModel.find({
//       user_id: req.body.user_id,
//     });
//     res.status(200).json(orders);
//   } catch (e) {
//     res.status(404).json({ message: e.message });
//   }
// };
export const postOrder = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.user_id);
    console.log(user.isLogined);
    if (user.isLogined) {
      //   const session = await mongoose.startSession();
      //   session.startTransaction();
      //   await session.commitTransaction();

      const cartItem = await cartModel.find({ user_id: req.body.user_id });
      console.log(cartItem);
      req.body.storeProduct_id = cartItem[0].storeProduct;
      const order = await new orderModel(req.body);
      await order.save();

      const orderComplete = cartItem.map(async (c) => {
        const price = await storeProductModel.findOne({
          store_id: user.preferStore,
          Product_id: c.product_id,
        });
        const orderItem = await new orderItemModel({
          user_id: user._id,
          order_id: order._id,
          product_id: c.product_id,
          quantity: c.quantity,
          Price: price.D_mart_Price,
          storeProduct_Id:c.storeProduct
        });
        await orderItem.save();
        console.log(price._id);
        await storeProductModel.findByIdAndUpdate(price._id, {
          Quantity_in_stock: (price.Quantity_in_stock - c.quantity),
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
        res.status(200).send("success");
      });
    } else {
      res.status(401).send("User not logged in");
    }
  } catch (e) {
    //   await session.abortTransaction();
    console.log(e.message)

    res.status(404).json({ message: e.message });
  }
};
export const updateOrder = async (req, res) => {
  try {
    const order = await orderModel.findByIdAndUpdate(
      req.params.orderId,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    if (order === null) {
      throw new Error("invalid order id");
    }
    res.status(200).json(order);
  } catch (e) {

    res.status(404).json({ message: e.message });
  }
};

// export const deletePickUpPoint = async (req, res) => {
//   try {
//     const pickup = await PickupPointModel.findByIdAndRemove(
//       req.params.pickup_id
//     );
//     if (pickup === null) {
//       throw new Error("invalid brand id");
//     }
//     res.status(200).json(pickup);
//   } catch (e) {
//     res.status(404).json({ message: e.message });
//   }
// };
