import mongoose from "mongoose";
import categoryModel from "../../Model/category.js";
import storeProductModel from "../../Model/storeviceProduct.js";

// from parent category get all child category
const getAllChildCategoryIdList = (cat_id, category) => {
  let catergoryList = [];
  const categoryParent = category.filter((c) => String(c.parent) == cat_id);
  categoryParent.length > 0 &&
    categoryParent.map((c) => {
      catergoryList.push(c._id);
      const catList = getAllChildCategoryIdList(c._id, category);
      catList.forEach((c) => catergoryList.push(c));
    });

  return catergoryList;
};

// get store product with category
const getStoreProduct = async (req, res) => {
  try {
    let storeProduct;
    const categoryID = req.params.categoryID;
    const category = await categoryModel.find();
    const categoryIdList = getAllChildCategoryIdList(categoryID, category);
    categoryIdList.push(new mongoose.Types.ObjectId(categoryID));

    const start = req.query.start || 0;
    const limit = req.query.limit || 10;
    if (req.params.storeproductId && categoryID) {
      storeProduct = await storeProductModel
        .find({
          store_id: req.params.storeproductId,
        })
        // .find({
        //   store_id: req.params.storeproductId,
        //   Quantity_in_stock: { $gt: 0 },
        // })
        .populate({
          path: "Product_id",
          match: {
            Category_id: { $in: categoryIdList },
          },
          populate: { path: "Images" },
        });
      storeProduct = storeProduct.filter((d) => {
        return d.Product_id !== null;
      });
      if (storeProduct == null || storeProduct.length == 0) {
        throw new Error("product not found");
      }
      if (storeProduct.length > 0) {
        res
          .status(200)
          .send(storeProduct.slice(start, parseInt(start) + parseInt(limit)));
      } else {
        res.status(200).send(storeProduct);
      }
    } else {
      let no_of_records;
      if (start == 0) {
        no_of_records = await storeProductModel.count({
          store_id: req.params.storeproductId,
        });
      }
      storeProduct = await storeProductModel
        .find({ store_id: req.params.storeproductId })
        .populate({
          path: "Product_id",
          populate: { path: "Images" },
        })
        .skip(start)
        .limit(limit);
      res.status(200).send({ no_of_records, storeProduct });
    }
  } catch (e) {
    res.status(204).json({ message: e.message });
  }
};

// search product by name

export const getSearchedStoreProduct = async (req, res) => {
  if (req.query.search.includes("(")) {
    req.query.search = req.query.search.split("(")[0];
  }
  const regex = new RegExp(req.query.search, "i");

  const storeProduct = await storeProductModel
    .find({
      store_id: req.params.storeproductId,
      // Quantity_in_stock: { $gt: 0 },
    })
    .populate({
      path: "Product_id",
      match: {
        Name: { $regex: regex },
      },
      populate: { path: "Images" },
    });
  const filterData = storeProduct.filter((p) => p.Product_id !== null);

  res.send(filterData);
};
export default getStoreProduct;
