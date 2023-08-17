import categoryModel from "../../../Model/category.js";

const getCategory = async (req, res) => {
  try {
    let category;
    if (req.params.categoryId) {
      category = await categoryModel
        .findById(req.params.categoryId)
        .populate("image parent");
      if (category == null) {
        throw new Error("category not found");
      }
    } else {
      category = await categoryModel
        .find({ isDeleted: { $ne: true } })
        .populate("image parent");
    }
    res.status(200).send(category);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const getBreadcampCategory = async (req, res) => {
  try {
    const category = await categoryModel.find();
    const parentCategoryList = getAllParentCategory(
      req.params.categoryId,
      category
    );
    res.send(parentCategoryList.reverse());
  } catch (e) {
    console.log(e.message);
  }
};
const getAllParentCategory = (cat_id, category) => {
  let catergoryList = [];
  const categoryParent = category.find((c) => String(c._id) == cat_id);

  if (categoryParent !== null) {
    catergoryList.push({
      _id: categoryParent._id,
      category_name: categoryParent.category_name,
    });
    if (categoryParent.parent !== null) {
      const cat = getAllParentCategory(categoryParent.parent, category);
      catergoryList = [...catergoryList, ...cat];
    }
  }

  return catergoryList;
};
export default getCategory;
