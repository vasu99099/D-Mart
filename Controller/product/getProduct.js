import ProductModel from "../../Model/product.js";

const getProduct = async (req, res) => {
  try {
    let product;
    let start = req.query.start || 0;
    let limit = req.query.limit || 10;
    let no_of_records = 0;
    if (req.params.productId) {
      product = await ProductModel.findById(req.params.productId)
        .populate("Category_id")
        .populate("Brand_id")
        .populate("Images");
      if (product == null) {
        throw new Error("product not found");
      }
      res.status(200).send(product);
    } else {
      const text = [
        { Name: { $regex: new RegExp(req.query.text, "i") } },
        { Type: { $regex: new RegExp(req.query.text, "i") } },
        { Country_of_Origin: { $regex: new RegExp(req.query.text, "i") } },
      ];
      if (start == 0) {
        no_of_records = await ProductModel.count().or(text);
        if (limit === "all") {
          limit = no_of_records;
        }
      }
      product = await ProductModel.find({ isDeleted: false })
        .or(text)
        .populate("Category_id")
        .populate("Brand_id")
        .populate("Images")
        .skip(start)
        .limit(limit);
      res.status(200).send({ product, no_of_records });
    }
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default getProduct;
