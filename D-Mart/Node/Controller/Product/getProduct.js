import ProductModel from "../../Model/product/product.js";

const getProduct = async (req, res) => {
  try {
    let product;
    if (req.params.productId) {
      product = await ProductModel.findById(req.params.productId)
        .populate("Category_id")
        .populate("Brand_id")
        .populate('Images');
      if (product == null) {
        throw new Error("product not found");
      }
    } else {
      product = await ProductModel.find()
        .populate("Category_id")
        .populate("Brand_id").populate('Images');
    }
    res.status(200).send(product);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default getProduct;
