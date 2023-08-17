import ProductModel from "../../Model/product.js";
import storeProductModel from "../../Model/storeviceProduct.js";

const postStoreProduct = async (req, res) => {
  try {
    // product is exist 
    const productExist = await ProductModel.findOne({
      _id: req.body.Product_id,
      isDeleted: false,
    });

    if (productExist !== null) {
      // product 
      const existProduct = await storeProductModel.findOne({
        Product_id: req.body.Product_id,
        store_id: req.body.store_id,
      });

      if (existProduct !== null) {
        throw new Error("Product already added in store");
      } else {
        const storeProduct = new storeProductModel(req.body);
        await storeProduct.save();
        res.status(200).send(storeProduct);
      }
    }else{
      res.status(404).send({message:"product is deleted by superAdministrator"})
    }
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default postStoreProduct;
