import storeProductModel from "../../Model/product/storeviceProduct.js";

const getStoreProduct = async (req, res) => {
  try {
    console.log("store product requested")
    let storeProduct;
    const categoryID = req.params.categoryID;
    if (req.params.storeproductId) {
      storeProduct = await storeProductModel
        .find({
          store_id: req.params.storeproductId,
          Quantity_in_stock: { $gt: 0 },
        })
        .populate({
          path: "Product_id",
          match: {
            Category_id: { $eq: categoryID },
          },
          populate: { path: "Images" },
        });
      storeProduct = storeProduct.filter((d) => {
        return d.Product_id !== null;
      });
      if (storeProduct == null || storeProduct.length == 0) {
        throw new Error("product not found");
      }
    } else {
      storeProduct = await storeProductModel
        .find()
        .populate({ path: "Product_id", populate: { path: "Images" } });
    }
    res.status(200).send(storeProduct);
  } catch (e) {
    res.status(204).json({ message: e.message });
  }
};

export default getStoreProduct;
