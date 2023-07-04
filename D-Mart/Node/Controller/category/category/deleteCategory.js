import categoryModel from "../../../Model/category/category.js";

const deleteCategory = async (req, res) => {
  try {
    const category = await categoryModel.deleteMany(
      {
        $or: [
          { parent: req.params.categoryId },
          { _id: req.params.categoryId },
        ],
      },
      { new: true }
    );
    if (category === null) {
      throw new Error("invalid category id");
    }
    res.status(200).json(category);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default deleteCategory;
