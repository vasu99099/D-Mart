import ProductModel from "../../Model/product/product.js";

const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndRemove(req.params.productId);
    if (product === null) {
      throw new Error("invalid product id");
    }
    res.status(200).json(product);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default deleteProduct;
