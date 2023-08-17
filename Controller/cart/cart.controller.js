import cartModel from "../../Model/cart.js";
import userModel from "../../Model/user.js";
import generateToken from "../authentication/jwt.Token.js";
import storeProductModel from "../../Model/storeviceProduct.js";

const productInStock = async (req) => {
  const Instock = await storeProductModel.findOne({
    store_id: req.body.preferStore,
    Product_id: req.body.product_id,
  });
  const cartQty = await cartModel.findOne({
    user_id: req.body.user_id,
    product_id: req.body.product_id,
  });
  if (Instock) {
    let qty = 0;
    if (cartQty !== null) {
      qty = cartQty.quantity;
    }
    return {
      Instock: Instock.Quantity_in_stock,
      cartQty: qty,
    };
  } else {
    return false;
  }
};
const postCart = async (req, res) => {
  try {
    if (req.body.user_id === undefined) {
      const user = await new userModel({ isLogined: false });
      await user.save();
      res.cookie("user_id", generateToken({ user_id: user._id }, "365d"), {
        httpOnly: false,
        maxAge: 31536000000,
      });
      req.body.user_id = user._id;
    }

    const Instock = await productInStock(req);
    if (Instock === false) {
      res
        .status(404)
        .json({ message: "product is not available at this store" });
    } else {

      if (Instock.Instock >= req.body.quantity + Instock.cartQty) {
        const cart = await new cartModel(req.body);
        await cart.save();
        res.status(200).send(cart);
      } else {
        res.status(404).send({ message: "Qunatity in not in stock" });
      }
    }
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await cartModel
      .find({ user_id: req.body.user_id })
      .populate([
        { path: "product_id", populate: "Images" },
        { path: "storeProduct" },
      ]);

    if (cart.length === 0) {
      res.status(204).json({ message: "not found" });
    } else {
      const updatedCart = cart.map(async (cart) => {
        const Instock = await storeProductModel.findOne({
          store_id: req.query.preferStore,
          Product_id: cart.product_id._id,
        });
        if (Instock === null) {
          await cartModel.findByIdAndUpdate(cart._id, { Instock: false });
          cart.Instock = false;
        } else {
          if (Instock.Quantity_in_stock < cart.quantity) {
            cart.Instock = false;
          } else {
            cart.Instock = true;
          }
          await cartModel.findByIdAndUpdate(cart._id, {
            Instock: cart.Instock,
          });
          if (Instock._id !== cart.storeProduct) {
            await cartModel.findByIdAndUpdate(cart._id, {
              storeProduct: Instock._id,
            });
            cart.storeProduct = Instock;
          }
        }
      });
      Promise.all(updatedCart).then(() => {
        res.status(200).json(cart);
      });
    }
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
export const putCart = async (req, res) => {
  try {
    let cart;
    const Instock = await productInStock(req);

    if (Instock === false) {
      res.status(404).send("product is not available at this store");
    } else {

      if (Instock.Instock >= req.body.quantity ) {
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
      } else {
        res.status(404).send({ message: "invalid qunatity" });
      }
    }
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
export default postCart;
