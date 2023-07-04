import ProductModel from "../../Model/product/product.js";

const updateProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { runValidators: true, new: true }
    );
    if (product === null) {
      throw new Error("invalid product id");
    }
    res.status(200).json(product);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default updateProduct;
