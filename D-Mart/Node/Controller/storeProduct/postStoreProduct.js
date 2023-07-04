import storeProductModel from "../../Model/product/storeviceProduct.js";

const postStoreProduct = async (req, res) => {
  try {
    const storeProduct = await new storeProductModel(req.body);
    await storeProduct.save();
    res.status(200).send(storeProduct);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default postStoreProduct;
