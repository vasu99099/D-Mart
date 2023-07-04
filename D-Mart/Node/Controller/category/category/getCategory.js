import categoryModel from "../../../Model/category/category.js";

const getCategory = async (req, res) => {

  try {
    let category;
    let filteredCategory = [];
    if (req.params.categoryId) {
      category = await categoryModel.find({ parent: req.params.categoryId }).populate('image');
      if (category == null) {
        throw new Error("category not found");
      }
    } else {
      category = await categoryModel.find({parent:null}).populate('image');
    }
    res.status(200).send(category);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default getCategory;
