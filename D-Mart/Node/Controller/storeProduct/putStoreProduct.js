import storeProductModel from "../../Model/product/storeviceProduct.js";

const updateStoreProduct = async (req, res) => {
  try {
    const storeProduct = await storeProductModel.findByIdAndUpdate(
      req.params.storeproductId,
      req.body,
      { runValidators: true, new: true }
    );
    if (storeProduct === null) {
      throw new Error("invalid store product id");
    }
    res.status(200).json(storeProduct);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default updateStoreProduct;
