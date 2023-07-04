import storeProductModel from "../../Model/product/storeviceProduct.js";

const deletestoreProduct = async (req, res) => {
  try {
    const storeProduct = await storeProductModel.findByIdAndRemove(req.params.storeproductId);
    if (storeProduct === null) {
      throw new Error("invalid store product id");
    }
    res.status(200).json(storeProduct);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default deletestoreProduct;
