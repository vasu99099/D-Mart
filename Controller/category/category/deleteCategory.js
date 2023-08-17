import categoryModel from "../../../Model/category.js";

const deleteCategory = async (req, res) => {
  try {

    const categoryHasChild = await categoryModel.findOne({
      parent: req.params.categoryId,
    });
    if (!categoryHasChild) {
      const category = await categoryModel.findByIdAndUpdate(
        req.params.categoryId,
        { isDeleted: true }
      );
      res.status(200).json(category);
    } else {
      res.status(409).json({ error: "it has a child" });
    }
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default deleteCategory;
