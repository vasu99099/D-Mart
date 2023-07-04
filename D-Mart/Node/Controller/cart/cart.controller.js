import cartModel from "../../Model/cart/cart.js";
import mongoose from "mongoose";
const postCart = async (req, res) => {
  try {
    console.log(req.body);

    const cart = await new cartModel(req.body);
    await cart.save();
    res.status(200).send(cart);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const getCart = async (req, res) => {
  try {
    // const cart = await cartModel.find({ user_id: req.body.user_id });
    const cart = await cartModel.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "ProductDetails",
        },
      },
      {
        $lookup: {
          from: "storeproducts",
          localField: "product_id",
          foreignField: "Product_id",
          as: "storeproducts",
        },
      },

      {
        $unwind: "$storeproducts",
      },
      {
        $match: {
          $expr: {
            $eq: [
              "$storeproducts.store_id",
              new mongoose.Types.ObjectId("6475b8fcd582ce52d53b2c51"),
            ],
          },
        },
      },
    ]);

    
    if (cart === null) {
      res.status(204).json({ message: "not found" });
    } else {
      res.status(200).json(cart);
    }

  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
export const putCart = async (req, res) => {
  try {
    let cart;
    if (req.body.quantity == 0) {
      cart = await cartModel.findOneAndDelete({
        user_id: req.body.user_id,
        product_id: req.body.product_id,
      });
    } else {
      cart = await cartModel.findOneAndUpdate(
        { user_id: req.body.user_id, product_id: req.body.product_id },
        req.body
      );
    }
    if (cart === null) {
      res.status(204).json({ message: "not found" });
    } else {
      res.status(200).json(cart);
    }
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
export default postCart;
