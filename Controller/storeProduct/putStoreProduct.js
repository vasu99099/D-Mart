import ProductModel from "../../Model/product.js";
import storeProductModel from "../../Model/storeviceProduct.js";

const updateStoreProduct = async (req, res) => {
  try {
    const productExist = await ProductModel.findOne({
      _id: req.body.Product_id,
      isDeleted: false,
    });
    if (productExist !== null) {
      const storeProduct = await storeProductModel.findByIdAndUpdate(
        req.params.storeproductId,
        req.body,
        { runValidators: true, new: true }
      );
      if (storeProduct === null) {
        throw new Error("invalid store product id");
      }
      res.status(200).json(storeProduct);
    } else {
      res
        .status(404)
        .send({ message: "product is deleted by superAdministrator" });
    }
  } catch (e) {

    res.status(404).json({ message: e.message });
  }
};

export default updateStoreProduct;
