import cartModel from "../../Model/cart.js";
import storeProductModel from "../../Model/storeviceProduct.js";

export const verifyStock = async (req, res) => {
  try {
    const cartItems = await cartModel.find({
      user_id: req.body.user_id,
      Instock: true,
    });
    if (cartItems.length > 0) {
      const verify = cartItems.map(async (item) => {
        const storeItem = await storeProductModel.findById(item.storeProduct);
        if (storeItem.Quantity_in_stock < item.quantity) {
          res.status(404).send({ message: "currently item is out of stock " });
        }
      });
      await Promise.all(verify);
      res.status(200).send({ message: "Instocked" });
    } else {
      res.status(404).send({ message: "No cart items found" });
    }
  } catch (e) {}
};
